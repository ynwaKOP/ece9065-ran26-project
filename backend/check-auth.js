const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
    
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
       
        const decodedToken = jwt.verify(token, 'abcdefghijklmn');
        req.userData = { email: decodedToken.email, username: decodedToken.username };
        next();
        
    } catch (error) {
        //console.log("something wrong");
        res.status(401).json({ message: "login failed" });
    }

}
