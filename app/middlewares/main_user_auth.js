require('dotenv').config();
const secret = process.env.JWT_TOKEN;
const jwt = require('jsonwebtoken')
const MainUser = require('../models/main_user.js');
const ProfUser = require('../models/prof_user.js');
const LocalUser = require('../models/local_user.js');

const withAuth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.status(401).json({error: 'Unauthorized: No token provided'});
      } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
              req.email = decoded.email;
              MainUser
              .findOne({email: decoded.email })
              .then(main_user => {
                  req.main_user = main_user
                  next();
              }).catch(err => {
                  res.status(401).send(err);
              })
            
            }
      });      
    }
};

module.exports = withAuth;