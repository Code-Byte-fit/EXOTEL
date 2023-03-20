const { verify } = require ("jsonwebToken");

const validateToken = (req, res, next) => {
    const accessToken = req.header("accessToken");
    if(!accessToken) return res.json({Error: "User not logged in!"});

    try {
        const validateToken = verify(accessToken,"Importantsecret");
        if(validateToken){
            return next();
        }
    } catch (error) {
        return res.json({ error:Error});
    }
};
module.exports={validateToken};