export const deactivateJWT = (req, res, next) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        path: '/',
        expires: new Date(0)
    });
    next()
    
};