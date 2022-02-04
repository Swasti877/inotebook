const express = require('express');
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "S$W@S^.I"

//ROUTE: 1 create USER using POST: "/api/auth/createuser" No login Required.
router.post("/createuser", [
  body('name', 'Name length must be minimum 3').isLength({ min: 3 }),
  body('password', "Password lenght must be minimum 5").isLength({ min: 5 }),
  body('email', "Enter a valid Email").isEmail(),
], async (req, res) => {

  //if there are error return bad request and error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  //check wheather User Email already existed
  try {
    let user = await User.findOne({ email: req.body.email })

    if (user) {
      return res.status(400).json({
        error: "This Email is already Registered."
      })
    }

    //Create Salt and hash -> Password & salt.
    const secPass = await bcrypt.hash(req.body.password, 10);

    //Create a New User
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    });

    //Sign Token
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken}); //ES5 authToken: authToken -> authToken
  } catch (error) {  //catch block
    console.error(error.message)
    res.status(500).send("Internal Server Error")
  }
})

//ROUTE: 2 Login a USER using POST: "/api/auth/login" No login Required.
router.post('/login',[
  body('password', "Password cannot be blank").exists(),
  body('email', "Enter a valid Email").isEmail(),
], async(req, res)=>{

  //if there are error return bad request and error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  const {email, password} = req.body;
  try{
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({error: "Invalid Credential"});
    }
    
    const passCompare = await bcrypt.compare(password, user.password);
    if(!passCompare){
      return res.status(400).json({error: "invalid Credential"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken})
  }catch(error) {
    console.error(error.message);
    res.status(500).json({error: "Internal Server Error"});
  }
})

//ROUTE: 3 Get Login user Detail using POST: "/api/auth/getuser" login Required.
router.post('/getuser', fetchuser, async(req, res)=>{
  try{
    const userid = req.user.id;
    const user = await User.findById(userid).select('-password');
    res.send(user);
  }catch(error) {
    console.error(error.message);
    res.status(500).json({error: "Internal Server Error"});
  }
})

module.exports = router;