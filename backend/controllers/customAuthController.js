import jwt from 'jsonwebtoken'; // Ensure you import jwt


export default  authenticateToken = (req, res, next) => {
    const token = req?.cookies.token;
    
    

    if (!token) {
        return res.status(401).json({ error: true, message: "re-Login no token found", redirect: '/' });
    }

    // Verify the token
    jwt.verify(token, `${process.env.SECRET_KEY}`, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: true, message: "invalid token", redirect: '/' });
        }

        
        return decoded
    })
};
