// verify function from the jsonwebtoken module
const { verify } = require("jsonwebtoken");

// middleware function
const validateToken = (req, res, next) => {
  
  // Extracting the access token from the request header
  const accessToken = req.header("accessToken");
  
  // Checking if the access token is missing
  if (!accessToken) {
    return res.json({ Error: "User not logged in!" });
  }

  try {
    // Verifying the access token using the secret key
    const validatedToken = verify(accessToken, "Importantsecret");
    
    // If the token is valid, call the next middleware function
    if (validatedToken) {
      return next();
    }
  } catch (error) {
    // If there is an error verifying the token, return an error response
    return res.json({ error: Error });
  }
};

// Exporting the middleware function for use in other parts of the application
module.exports = { validateToken };
