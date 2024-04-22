import Vet from '../models/Vet.js';

const addVet = async (req, res) => {
    try {

        const vet = new Vet(req.body);
        const vetSaved = await vet.save();

        return res.json({message: `Vet added`, vet: vetSaved});
    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`});
    }
}

export {
    addVet
}
