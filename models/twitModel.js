const mongoose = require("mongoose");

const twitSchema = new mongoose.Schema(
  {
    title : String,
    body: { type: String, max: 500},
    user_id: { type: String, required: true},
    comments: [{ user_id: String, text: String, date: {type:String, default: new Date()} }],
    likes: [{ user_id: String, text: String, date: {type:String, default: new Date()} }]
  },
  { timestamps: true }
  );

module.exports = mongoose.model("twits", twitSchema);