import jwt from 'jsonwebtoken';

export const jwtSign =(data)=>{

    if(process.env.SECRET_KEY == false) return res.status(500).json({error: true , message: "missing secret key"});
    return jwt.sign(data, process.env.SECRET_KEY, {expiresIn:"1d"});
};


export const jwtVerify =(req,res,next)=>{
    if(!token) return null;

    try {
        
    } catch (error) {
        
    }
};


