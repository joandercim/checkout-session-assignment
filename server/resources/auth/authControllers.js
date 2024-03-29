const bcrypt = require('bcrypt');
const userLoginSchema = require('../../models/userLoginSchema');
const UserService = require('../../utils/UserService');

const login = async (req, res) => {
    // ÄR DENNA JOI NÖDVÄNDIG?
  const { error } = userLoginSchema.validate(req.body);

  if (error)
    return res.status(400).json({
      success: false,
      error: error.message,
    });

  const currentUser = await UserService.getCurrentUserByEmail(req.body.email);

  if (!currentUser)
    return res
      .status(401)
      .json({ success: false, msg: 'Incorrect email or password.' });

  const passCheck = await bcrypt.compare(
    req.body.password,
    currentUser.password
  );

  if (!passCheck)
    return res
      .status(401)
      .json({ success: false, msg: 'Incorrect email or password.' });

  req.session.user = currentUser._id;

  res.status(200).json({ success: true, msg: `User logged in.` });
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).json({ success: true, msg: 'User logged out.' });
};

const authorize = (req, res) => {
  if (!req.session.user)
    return res.status(401).json({ success: true, msg: 'No user logged in.' });

  res
    .status(200)
    .json({ success: true, msg: `User ${req.session.user} is logged in.` });
};

module.exports = { login, logout, authorize };
