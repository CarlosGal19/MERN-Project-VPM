import mongoose from "mongoose";

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
        type: String
    },
    confirmed: {
        type: Boolean,
        default: false
    }
});

const Vet = mongoose.model('Vet', vetSchema);

export default Vet;
