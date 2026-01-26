import mongoose from 'mongoose'

const historySchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
    required: true,
  },

   content: {
    type: String,
    required: true,
  },
  
  response: {
    type: String,
    required: true,
  },

  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const History= mongoose.model('History', historySchema);
