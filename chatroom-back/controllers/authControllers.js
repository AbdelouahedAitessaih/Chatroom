const User = require('../models/User');
const jwt = require('jsonwebtoken');
const maxAge = 5 * 24 * 60 * 60;
const createJWT = id => {
  return jwt.sign({id},'chatroom', {
      expiresIn: maxAge
  })
};
const alertError = (error) => {
  let errors = {name:"", email:"", password:""};
  console.log(error)
  if(error.message == 'incorrect email'){
      errors.email = 'This email is not found';
  }
    if(error.message == 'incorrect password'){
        errors.password = 'This password is incorrect';
    }
    if(error.code === 11000){
      errors.email = "This email already registered";
      return errors;
  }
  if(error.message.includes('user validation failed')) {
      Object.values(error.errors).forEach(({properties}) => {
          errors[properties.path] = properties.message
      })
  }
  return errors;
}

const verifyuser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'chatroom secret', async (err, decodedToken) => {
            console.log("decodedToken",decodedToken);
            if(err) {
                console.log(err);
            }else {
                let user = await User.findById(decodedToken.id);
                res.json(user);
                next();
            }
        })
    }else {
        next();
    }
}
const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({name, email, password});
        const token = createJWT(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user});
    } catch (err) {
        const errors = alertError(err);
        res.status(400).json({errors});
    }
}
const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createJWT(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user});
    } catch (err) {
        const errors = alertError(err);
        res.status(400).json({errors});
    }
}
const logout = (req, res) => {
    res.cookie('jwt', "", {maxAge:1});
    res.status(200).json({logout: true});
}
module.exports = {signup, login, logout, verifyuser}