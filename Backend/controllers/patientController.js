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

const getPatients = (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export {
    getPatients,
    addPatient
};
