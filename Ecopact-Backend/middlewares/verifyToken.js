const jwt = require('jsonwebtoken');

//verify token for logging

function verifyToken(req,res,next){
    const authToken=req.headers.authorization;
    if(authToken){
        const token=authToken.split(" ")[1];
        try{
            const decodedPeyload=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decodedPeyload;  //req.user is an object wich contain the decoded payload
            next();
        }catch(err){
            res.status(401).send("invalid token, Access denied");
        }
    }else{
        res.status(401).send("Token not provided, Access denied");
    }
}

//verify token for admin
function verifyTokenForAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(400).send("access denied, only Admin has access");
        }
        
    })
}

//verify token for only user himself

function verifyTokenForOnlyUser(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id){
            next();
        }else{
            return res.status(400).send("access denied, only user himself");
        }
        
    })
}

//verify token for only user himself and Admin

function verifyTokenForOnlyUserOrAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            return res.status(400).send("access denied, only Admin or user himself ");
        }
        
    })
}

module.exports={verifyToken,verifyTokenForAdmin,verifyTokenForOnlyUser,verifyTokenForOnlyUserOrAdmin}