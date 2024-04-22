import jwt from 'jsonwebtoken';
import Vet from '../models/Vet.js';

// Validate the token sent by the user in the request headers
const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) return res.status(401).json({ error: `Token not provided` });
        if (!token.startsWith('Bearer')) return res.status(401).json({ error: `Invalid token` });
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.vet = await Vet.findById({ _id: decoded.uid }).select('-password -token -confirmed');
        return next();
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
}

export default authMiddleware;
