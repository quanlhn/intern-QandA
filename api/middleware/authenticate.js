const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'Quanlhn22012002');
        
        req.user = decode;
        next();
    }
    catch (err) {
        if (err.name == "TokenExpiredError") {
            res.status(401).json({
                message: "Token Expired!"
            })
        } else{
            res.json({
                message: 'Authentication Failed'
            })
        }

    }

}

module.exports = authenticate;