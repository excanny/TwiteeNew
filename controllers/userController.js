const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

const User = require('../models/userModel');

const register = (req, res) => {

    const { name, email, password, password2 } = req.body;

    if (!String(name).trim()) return res.status(400).json({status: false, message: "Name is required"});
    if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(email))) return res.status(400).json({status: false, message: "Email is not valid"});
    if (!String(password).trim()) return res.status(400).json({status: false, message: "Password is required"});
    if (!String(password2).trim()) return res.status(400).json({status: false, message: "Confirm password is required"});
    if(password != password2) return res.status(400).json({message: "password not match"});

    User.findOne({ email }, async (err, data) => {

        //if user not in db, create new record
        if (!data) {

            //Salt and Encrypt password 
            const salt = await bcrypt.genSalt(10);
        
            encryptedPassword = await bcrypt.hash(password, salt);
           
            const newUser = new User({
                name,
                email: email.toLowerCase(), 
                password: encryptedPassword,
            })

            newUser.save((err)=>{
                if(err) return res.json({Error: err});
                return res.json({status: true, message: "User created successfully"}); 
            }); 

            //Send onboarding mail

            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'godson.ihemere@gmail.com',
                  pass: 'vyscosysrheqbqba'
                }
             
              });
              
              var mailOptions = {
                from: 'TwiteeApp',
                to: email,
                subject: 'Registration successful on Twitee',
                html: '<h1>Welcome To Twitee!</h1>'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });  

        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({status: false, message:"User already exists. Login"});
        }
    })    
    
};

const login = async (req, res) => {
    try {

            const { email, password } = req.body;

            if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(email))) return res.status(400).json({status: false, message: "Email is not valid"});
            if (!String(password).trim()) return res.status(400).json({status: false, message: "Password is required"});

            const user = await User.findOne({ email });
        
            if (user && (await bcrypt.compare(password, user.password))) {
                // Token generated
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                    expiresIn: "1h",
                    }
                );
            
                // return token
                res.status(200).json({token: token});

            }else{
                res.status(400).json({"status": false, "message": "Invalid Credentials"});
            }

        } catch (err) 
        {
            console.log(err);
        }
  
};

module.exports = {
    register,
    login
  };