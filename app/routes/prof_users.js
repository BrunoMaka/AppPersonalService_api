const express = require('express');
const router = express.Router();
const ProfUser = require('../models/prof_user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const prof_withAuth = require('../middlewares/prof_user_auth');
const ServiceClass = require('../models/service_class.js');

router.post('/register/:id', async (req, res) => {
  const { id } = req.params
  const { firstname, lastname, email, password } = req.body;
  const prof_user = new ProfUser({ firstname, lastname, email, password, local_affiliate:id});
  

  try {
    await prof_user.save();
    res.status(200).json(prof_user);
  } catch (error) {
    res.status(500).json({error: "Error registering new professional user please try again."});
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let prof_user = await ProfUser.findOne({ email })
    if (!prof_user) {
      res.status(401).json({error: 'Incorrect email or password'});
    } else {
      prof_user.isCorrectPassword(password, function(err, same) {
        if (!same) {
          res.status(401).json({error: 'Incorrect email or password'});
        } else {
          const token = jwt.sign({email}, secret, { expiresIn: '10d' });
          res.json({prof_user: prof_user, token: token});
        } 
      });     
    }
  
  } catch (error) {
    res.status(500).json({error: 'Internal error please try again'});
  }
});



router.get('/:id', prof_withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let service_class = await ServiceClass.findById(id);
    if(belongsTo(req.prof_user, service_class)) {
      res.json(service_class);    
    } else {
        res.status(403).json({error: 'Problem to get a service'})   
    }
  } catch (error) {
    res.status(500).json({error: 'Problem to get a service'}) 
  }  
});

const belongsTo = (user, service) => {
  if(JSON.stringify(user._id) == JSON.stringify(service.professional._id))
    return true;
  else
    return false;
}

// ROTA PARA INCLUIR LOCAL NO USUARIO PROF
// router.put('/:id', prof_withAuth, async(req, res) => {
//   const { id } = req.params;
//   const prof = req.headers['x-access-token'];
//   try {
//     let prof_user = await ProfUser.findOneAndUpdate({ prof }, { $push: { locals_affiliate: id } })      
//       .then(x => {
//         res.status(200).json(prof_user).send({
//           message: 'Local added'
//         });
//       })
//   } catch (error) {
//     res.status(500).json({error: 'Cant add the local'})    
//   }
// })

module.exports = router;
