import mongoose from 'mongoose'
// import { Content } from 'openai/resources/containers/files/content.mjs';

// import { prompt } from 'openai/resources/containers/files/prompt.mjs';
const historySchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // if you're using auth
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
