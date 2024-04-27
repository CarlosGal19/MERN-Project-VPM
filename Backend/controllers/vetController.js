import Vet from '../models/Vet.js';
import generateJWT from '../helpers/generateJWT.js';
import generateID from '../helpers/generateID.js';
import registerEmail from '../helpers/registerEmail.js';

const addVet = async (req, res) => {
    try {
        // Avoid duplicate email
        const { email, name } = req.body;
        const vetExist = await Vet.findOne({ email });
        if (vetExist) {
            return res.status(400).json({ error: `Email already exists` });
        }
        const vet = new Vet(req.body);
        const vetSaved = await vet.save();
        // Send email with confirmation link
        registerEmail({
            email,
            name,
            token: vetSaved.token
        })
        return res.status(200).json({ message: `Vet added`, vet: vetSaved });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

const confirmVet = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) return res.status(400).json({ error: `Token not provided` });
        const vetConfirm = await Vet.findOne({ token });
        if (!vetConfirm) return res.status(404).json({ error: `Vet not found` });
        vetConfirm.token = null;
        vetConfirm.confirmed = true;
        await vetConfirm.save();
        return res.status(200).json({ message: `Vet confirmed` });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

const authentificateVet = async (req, res) => {
    try {
        const { email, password } = req.body;
        const vet = await Vet.findOne({ email });
        if (!vet) return res.status(404).json({ error: `Vet not found` });
        if (!vet.confirmed) return res.status(403).json({ error: `Vet not confirmed` });
        if (!await vet.authenticate(password)) {
            return res.status(401).json({ error: `Invalid password` });
        }
        return res.status(200).json({ message: `Vet logged`, token: generateJWT(vet._id, vet.name) });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

const vetProfile = async (req, res) => {
    try {
        const { vet } = req;
        if (!vet) return res.status(404).json({ error: `Vet not found` });
        return res.status(200).json({ message: `Vet profile`, vet: vet });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: `Email not provided` });
        const vet = await Vet.findOne({ email });
        if (!vet) return res.status(404).json({ error: `Vet not found` });
        vet.token = generateID();
        await vet.save();
        return res.status(200).json({ message: `Token with instructions sent`, token: vet.token });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

const validateToken = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) return res.status(400).json({ error: `Token not provided` });
        const vetToken = await Vet.findOne({ token });
        if (!vetToken) return res.status(404).json({ error: `Vet not found` });
        return res.status(200).json({ message: `Token validated` });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

const newPassword = async (req, res) => {
    try {
        const { token } = req.params;
        if (!token) return res.status(400).json({ error: `Token not provided` });
        const vetToken = await Vet.findOne({ token });
        if (!vetToken) return res.status(404).json({ error: `Vet not found` });
        const { password } = req.body;
        if (!password) return res.status(400).json({ error: `Password not provided` });
        vetToken.password = password;
        vetToken.token = null;
        await vetToken.save();
        return res.status(200).json({ message: `Password updated` });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

export {
    addVet,
    confirmVet,
    authentificateVet,
    vetProfile,
    resetPassword,
    validateToken,
    newPassword
}
