import crypto from 'crypto';

export default function generateID() {
    return crypto.randomBytes(16).toString('hex');
}
