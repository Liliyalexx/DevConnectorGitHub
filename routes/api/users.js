const express = require('express');
const User = require('../../models/User');
const gravatar = require ('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();


//@route POST api/users/register
//@desc Register user
//@access Public

router.post ('/register', (req, res) => {

  User.findOne({email: req.body.email})
    .then(user => {
      if (user){
        return res.status(400).json({email: 'Email already exists!'})
      } else {
        const avatar= gravatar.url(req.body.email, {
          s:'200',
          r:'pg',
          d:'mm'
        });

      const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password: req.body.password,
        avatar,
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      });
      
    }
  })
      .catch(err => console.log(err))
  });
 

module.exports = router;