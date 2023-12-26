const requirePropreateRole = (role) => {
    return (req, res, next) => {
        // the role could be an array or a single string
        if (typeof role === 'string') {
            role = [role];
        }
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        next();
    }
}

module.exports = requirePropreateRole;
