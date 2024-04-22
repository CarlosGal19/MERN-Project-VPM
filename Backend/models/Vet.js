import mongoose from "mongoose";
import generateID from '../helpers/generateID.js'
import bcrypt from 'bcrypt';

// MongoDB set ID automatically
const vetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
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

// Function that hashes the password before saving it to the database
vetSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});

// Function that compares the password with the hashed password in the database
vetSchema.methods.authenticate = function (password) {
    return bcrypt.compare(password, this.password);
}

const Vet = mongoose.model('Vet', vetSchema);

export default Vet;
