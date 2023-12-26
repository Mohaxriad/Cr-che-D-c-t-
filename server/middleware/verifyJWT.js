const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Not authorized1' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Not authorized2',error });

    }
}

module.exports = verifyJWT;


