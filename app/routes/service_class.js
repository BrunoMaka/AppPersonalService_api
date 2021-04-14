var express = require('express');
var router = express.Router();
const ServiceClass = require('../models/service_class.js');
const user_withAuth = require('../middlewares/main_user_auth');

router.post('/:id', user_withAuth, async (req, res) => {
  const { class_type, isRemote, class_date, class_time } = req.body;
  const { id } = req.params;  
  var service_class = new ServiceClass({
    class_type: class_type, 
    isRemote: isRemote, 
    class_date:class_date, 
    class_time:class_time,
    author: req.main_user._id, 
    professional: id});

  try {
    await service_class.save();
    res.json(service_class);    
  } catch (error) {
    res.status(401).json({error:"cannot find the professional or it does not exists"})
  }
  });


router.get('/:id', user_withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let service_class = await ServiceClass.findById(id);
    if(is_owner(req.main_user, service_class)) {
      res.json(service_class);    
    } else {
        res.status(403).json({error: 'Problem to get a service'})   
    }
  } catch (error) {
      res.status(500).json({error: 'Problem to get a service'}) 
  }  
});

router.get('/', user_withAuth, async (req, res) => {
  try {
    let services = await ServiceClass.find({author: req.main_user._id })
    res.send(services)
  } catch (error) {
      res.status(500).json({error: 'Problem to show all services'})
  }
});

router.get('/search', user_withAuth, async (req, res) => {
  const { query } = req.query;
  try {
    let services = await ServiceClass.find({author: req.main_user._id }).find({$text: {$search: query}})
    res.json(services);
  } catch (error) {
      res.json({error: 'query not found'}).status(500);
  }
});

router.put('/:id', user_withAuth, async (req, res) => {
  const { isRemote, class_date, class_time } = req.body;
  const { id } = req.params;
  try {
    var service = await ServiceClass.findOneAndUpdate(
      {_id: id}, 
      { $set: { isRemote: isRemote, class_date: class_date, class_time:class_time }}, 
      { upsert: true, 'new': true }
    )
    res.json(service);

  } catch (error) {
      res.status(500).json({error: 'Problem to update the service'})
  }
});

router.delete('/:id', user_withAuth, async (req, res) => {
  const { id } = req.params;
  let service = await ServiceClass.findById(id)
  try {
    if(service && is_owner(req.main_user, service)) {
      await service.delete();
      res.json({message: 'OK'}).status(204);

    } else {
      res.json({error: 'Forbidden'}).status(403)
    }
  } catch (error) {
      res.status(500).json({error: 'Problem to delete the service'})
  }
});



const is_owner = (user, service) => {
  if(JSON.stringify(user._id) == JSON.stringify(service.author._id))
    return true;
  else
    return false;
}


module.exports = router;
