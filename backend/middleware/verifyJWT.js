const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function verifyJWT(req, res, next) {
  try {
    let verifiedToken = jwt.verify(req.cookies.token, SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

module.exports = verifyJWT;
