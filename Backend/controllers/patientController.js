import Patient from '../models/Patient.js';

const addPatient = async (req, res) => {
    try {
        const patient =  new Patient(req.body);
        patient.vet_id = req.vet._id;
        await patient.save();
        return res.status(200).json({ message: 'Patient added', patient: patient});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({ vet_id: req.vet._id });
        if (!patients) {
            return res.status(404).json({ message: 'No patients found' });
        }
        return res.status(200).json({message: 'Patients found', patients: patients});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getPatient = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            return res.status(400).json({ error: 'Patient ID not provided' });
        }
        const patient = await Patient.findOne({ _id: id, vet_id: req.vet._id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        return res.status(200).json({ message: 'Patient found', patient: patient });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const removePatient = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            return res.status(400).json({ error: 'Patient ID not provided' });
        }
        const patient = await Patient.findOneAndDelete({ _id: id, vet_id: req.vet._id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        return res.status(200).json({ message: 'Patient deleted', patient: patient });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updatePatient = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            return res.status(400).json({ error: 'Patient ID not provided' });
        }
        const patient = await Patient.findById({ _id: id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        patient.set(req.body);
        await patient.save();
        return res.status(200).json({ message: 'Patient updated', patient: patient });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export {
    getPatients,
    addPatient,
    getPatient,
    removePatient,
    updatePatient
};
