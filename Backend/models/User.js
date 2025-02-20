import mongoose from "mongoose";

const userSchema = new mongoose.Schema({  
  username: { type: String, required: true },
  age: { type: Number, required: true },
  hobbies: { type: [String], required: true },
});

const User = mongoose.model("User", userSchema);  

export default User;
