// userModal.js
import mongoose from 'mongoose';
import uniqueId from '../utils/uniqueId.js';

const userSchema = new mongoose.Schema({
    user: {
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
    chatId:{
        type:String,
        default:uniqueId,
        unique:true

    },
    visible:{
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('User', userSchema);

export default User;
