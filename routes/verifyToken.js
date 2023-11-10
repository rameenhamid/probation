const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
  
    // Check if the token is present in the headers
    if (!token) {
      // Check if the token is present in the request body
      token = req.body.token;
    }
  
    // Check if the token is present in the query parameters
    if (!token) {
      token = req.query.token;
    }
  
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
      }
      req.decoded = decoded;
      next();
    });
  };
  
  module.exports = verifyToken;
  