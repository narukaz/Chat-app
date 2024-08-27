import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' , unique:true}] 
})

export const  Contacts = mongoose.model('Contacts', ContactSchema);  