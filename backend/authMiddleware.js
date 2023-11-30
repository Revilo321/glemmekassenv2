const admin = require('firebase-admin');

admin.initializeApp();

async function authMiddleware(req, res, next) {
    console.log(req)
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).send('Authentication token is required');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).send('Invalid authentication token');
  }
}

module.exports = authMiddleware;