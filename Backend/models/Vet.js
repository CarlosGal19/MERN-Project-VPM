import mongoose from "mongoose";
import generateID from '../helpers/generateID.js'

// MongoDB set ID automatically
const vetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        default: null,
        trim: true
    },
    website: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generateID()
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

const Vet = mongoose.model('Vet', vetSchema);

export default Vet;
