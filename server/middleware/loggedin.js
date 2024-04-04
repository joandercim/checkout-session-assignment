const loggedIn = (req, res, next) => {
  if (!req.session.customer) {
    return res.status(401).json('loggedIn: No user logged in');
  }
  next();
};

module.exports = loggedIn;
