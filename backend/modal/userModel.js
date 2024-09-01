// userModal.js
import mongoose from 'mongoose';
import uniqueId from '../utils/uniqueId.js';
import { Socket } from 'socket.io';

const userSchema = new mongoose.Schema({
    userName: {
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
    },
    socketID:{type:String, default:""}
});

const User = mongoose.model('User', userSchema);

export default User;
