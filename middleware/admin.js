module.exports = function (req, res, next) {
    if(!req.user.isAdmin){
        res.status(403).send("Access denied...")
    }
    next();
}
