const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "user not logged in" });

  try {
    const validateToken = verify(accessToken, "secret");
    if (validateToken) {
      return next();
    }
  } catch (error) {
    return res.json({ error: Error });
  }
};
module.exports = { validateToken };
