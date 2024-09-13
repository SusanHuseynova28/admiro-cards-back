const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Issues:{
    type:String,
  
  },
  
    resolved:{
    type:String,
    },
    comment:{
      type:String,
    }
  
});

module.exports = mongoose.model("Todo", todoSchema);