
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'user' // Default value 'user' for role
    },
    isAnonymous: {
      type: Boolean,
      default: false // Default value false for isAnonymous
    }
  });
  
const User = mongoose.model('User', userSchema);

// Export the User model
export default User;
