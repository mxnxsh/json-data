import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  Name: {
    type:String
  },
  Age: {
    type:String
  },
  Marks: {
    type:String
  },

})
const User = new mongoose.model('User', userSchema);

export default User;