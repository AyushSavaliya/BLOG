const Author = require("../model/authorModel");
const jwt = require("jsonwebtoken");

const authorVerifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        console.log(token);
        const verifyUser = jwt.verify(token, 'authorGenretToken');
        
        const rootAuthor = await Author.findOne({_id:verifyUser._id, "tokens.token":token});

        if(!rootAuthor){
            throw new Error('user not found')
        }

        req.token = token;
        req.rootAuthor = rootAuthor; 
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}

module.exports = authorVerifyToken; 