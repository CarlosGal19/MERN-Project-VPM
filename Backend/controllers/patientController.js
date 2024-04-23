import Patient from '../models/Patient.js';

const addPatient = (req, res) => {
    try {
        const patient =  new Patient(req.body);
        console.log(patient);
        return res.status(200).json({ message: 'POST /patients' });
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
