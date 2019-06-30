exports.createAccess = (req, res, next) => {
    const permissions = req.user.permissions;

    if (!permissions.includes("create")) {
        return res.status(403).send('Access denied');
    }
    
    next();
    
}