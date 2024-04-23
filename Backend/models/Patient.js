import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    vet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vet',
        required: true
    }
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
