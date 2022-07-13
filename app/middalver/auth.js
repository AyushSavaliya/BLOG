const async = require("hbs/lib/async");
const jwt = require("jsonwebtoken")
const User = require("../model/userModel");
const verifytoken = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyUser = jwt.verify(token, 'userGenretToken');
        
        const rootUser = await User.findOne({_id:verifyUser._id, "tokens.token":token});

        if(!rootUser){
            throw new Error('user not found')
        }
        req.token = token;
        req.rootUser = rootUser; 
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}



module.exports = verifytoken; 