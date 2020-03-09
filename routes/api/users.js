const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const gravatar = require ('gravatar');
const bcrypt = require('bcryptjs');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');




//@route POST api/users/register
//@desc Register user
//@access Public

router.post ('/register', (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body)

  if(!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if (user){
        return res.status(400).json({email: 'Email already exists!'})
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
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
  //@route POST api/users/login
  //@desc Login user
 //@access Public

 router.post('/login', (req,res) => {

  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
   User.findOne({email: req.body.email})
   .then(user =>{
     if (!user){
       return res.status(404).json({ email:'User not found!'});
     }else{
       bcrypt.compare(req.body.password, user.password)
       .then(isMatch => { 
         if (isMatch){
           return res.json ({msg: 'Success'})
         }else{
           return res.status(400).json({password: 'Password incorrect'});
         }
       })
     }
   })
   .catch(err => console.log(err));
 })

module.exports = router;