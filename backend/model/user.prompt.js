import mongoose from "mongoose";

const prompTschema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true

    },
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true
    },
    content: {
        type: String,
        required: true,
    },


    createdAt: {
        type: Date,
        default: Date.now
    }

})
export const prompt = mongoose.model("prompt", prompTschema)