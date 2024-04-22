import Vet from '../models/Vet.js';

const addVet = async (req, res) => {
    try {
        // Avoid duplicate email
        const { email } = req.body;
        const vetExist = await Vet.findOne({ email });
        if (vetExist) {
            return res.status(400).json({error: `Email already exists`});
        }
        const vet = new Vet(req.body);
        const vetSaved = await vet.save();

        return res.status(200).json({message: `Vet added`, vet: vetSaved});
    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`});
    }
}

const confirmVet = async (req, res) => {
    try {
        const { token } = req.params;
        if(!token) return res.status(400).json({error: `Token not provided`});
        const vetConfirm = await Vet.findOne({ token });
        if(!vetConfirm) return res.status(404).json({error: `Vet not found`});
        vetConfirm.token = null;
        vetConfirm.confirmed = true;
        await vetConfirm.save();
        return res.status(200).json({message: `Vet confirmed`});
    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`});
    }
}

export {
    addVet,
    confirmVet
}
