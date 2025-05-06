export const isAuthenticated = (req, res, next) => {
    if (!req.session?.user) return res.status(401).json({ message: 'Not logged in 🪵' });
    next();
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.session?.user?.role)) {
            return res.status(403).json({ message: 'No access 🔐' });
        }
        next();
    };
};
  