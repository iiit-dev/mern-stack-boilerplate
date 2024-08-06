// userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin:  { type: Boolean, default: false }

});

const User = mongoose.model('User', userSchema);
export default User;
