import jwt from 'jsonwebtoken';

const generateJWT = (uid, name) => {
    return jwt.sign({ uid, name }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

export default generateJWT;
