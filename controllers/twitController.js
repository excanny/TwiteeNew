const Twit = require('../models/twitModel');
const Joi = require('joi');
const jwt_decode = require('jwt-decode');


//POST twit
const createTwit = (req, res) => {
    
    const { title, body} = req.body
    const usertoken = req.headers.authorization;
    const decoded = jwt_decode(usertoken);
    const user_id = decoded.user_id;

    if (!String(title).trim()) return res.status(400).json({status: false, message: "title field is required"});
    if (!String(body).trim()) return res.status(400).json({status: false, message: "body field is required"});

    const newTwit = new Twit({
        title,
        body,
        user_id: user_id
    })

    newTwit.save((err, data)=>{
        if(err) return res.json({Error: err});
        return res.status(201).json({status: true, message: "Twit created successfully"});
       
    }) 
   
};

//Add twit comment
const addTwitComment = (req, res) => {
    const usertoken = req.headers.authorization;
    const decoded = jwt_decode(usertoken);

    const user_id = decoded.user_id; 
    const twit_id = req.body.twit_id; 
    const comment = req.body.comment;

    if (!String(twit_id).trim()) return res.status(400).json({status: false, message: "twit_id field is required"});
    if (!String(comment).trim()) return res.status(400).json({status: false, message: "comment field is required"});
   
    const newTwitComment = {
        user_id: user_id,
        text: comment,
        date: new Date()
    }
    
    Twit.findOne({_id : twit_id}, (err, data) => {
        if(err || !data || !comment) {
            return res.json({status: false, message: "Twit ID doesn't exist."});
        }
        else {
           
            data.comments.push(newTwitComment);
           
            data.save(err => {
                if (err) { 
                return res.json({status: false, message: "Comment failed to add.", error:err});
                }
                return res.json(data);
            })  

        } 
    })
  };

  //Like twit
const addTwitLike = (req, res) => {
    const usertoken = req.headers.authorization;
    const decoded = jwt_decode(usertoken);

    const user_id = decoded.user_id; 
    const twit_id = req.body.twit_id; 

    if (!String(twit_id).trim()) return res.status(400).json({status: false, message: "twit_id field is required"});
   
    const newTwitLike = {
        user_id: user_id,
        date: new Date()
    }
    
    Twit.findOne({_id : twit_id}, async (err, data) => {
        if(err || !data || !twit_id) {
            return res.json({status: false, message: "Twit ID doesn't exist."});
        }else {
            const like_exists = data.likes.some((user_id) => user_id.equals(user_id));
           if(!like_exists)
           {
                data.likes.push(newTwitLike);
            
                data.save(err => {
                    if (err) { 
                    return res.json({status: false, message: "Like failed to add.", error:err});
                    }
                    return res.json(data);
                }) 
           }

           return res.json(data);
    
        } 
    })
  };

//get all twits
const getAllTwits = (req, res) => {
    Twit.find({}, (err, data) => {
      if (err) {
        return res.json({status: false, message: "Error occured. Try again"});
      }
      return res.json(data);
    });
  };

//get single twit
const getTwit = (req, res) => {
    let {id} = req.body;
    Twit.findOne({ _id: id }, (err, data) => {
      if (err || !data) {
        return res.json({status: false, message: `No twit with this id: ${id}`});
      } else return res.json(data);
    });
  };

//delete a twit by ID
const deleteTwit = (req, res) => {
    let {id} = req.body;
    const usertoken = req.headers.authorization;
    const decoded = jwt_decode(usertoken);

    if (!String(id).trim()) return res.status(400).json({status: false, message: "twit_id field is required"});

    const user_id = decoded.user_id; 

    // Twit.findOne({ _id: id }, (err, data) => {
    // if(data.user_id == user_id){
        Twit.deleteOne({ _id: id }, (err, data) => {
        if (data.deletedCount == 0) return res.json({status: false, message: `No twit with such id: ${id}`});
        else if (err) return res.json({status: false, message: `Error occured. Try again. ${err}`});
        else return res.json({status: true, message: `Twit with id:${id} deleted successfully`});
        });
    //   }
    //   return res.json({status: false, message: `This twit ${id} can only be deleted by the author`});
    //});
  };
  

module.exports = {
    createTwit,
    getAllTwits,
    getTwit,
    deleteTwit,
    addTwitComment,
    addTwitLike
  };