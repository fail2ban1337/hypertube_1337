const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = middleware = {
    auth: function (req, res, next) {
        // Get Token from header
        const token = req.header('x-auth-token');

        // check if no token
        if (!token) {
            return res.status(401).json({
                msg: 'No token , authorization denied'
            });
        }
        // verify
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            req.user = decoded.user;
            next();
        } catch (error) {
            res.status(401).json({
                msg: 'Token is not Valide'
            })
        }
    }
}