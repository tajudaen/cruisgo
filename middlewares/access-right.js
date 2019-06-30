exports.createAccess = (req, res, next) => {
    const permissions = req.user.permissions;

    if (!permissions.includes("create")) {
        return res.status(403).send('Access denied');
    }
    
    next();
    
}
exports.readAccess = (req, res, next) => {
    const permissions = req.user.permissions;

    if (!permissions.includes("read")) {
        return res.status(403).send('Access denied');
    }
    
    next();
    
}
exports.updateAccess = (req, res, next) => {
    const permissions = req.user.permissions;

    if (!permissions.includes("update")) {
        return res.status(403).send('Access denied');
    }
    
    next();
    
}
exports.deleteAccess = (req, res, next) => {
    const permissions = req.user.permissions;

    if (!permissions.includes("delete")) {
        return res.status(403).send('Access denied');
    }
    
    next();
    
}