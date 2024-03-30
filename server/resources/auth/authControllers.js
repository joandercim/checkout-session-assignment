const bcrypt = require('bcrypt');
const CustomerService = require('../../utils/CustomerService');

// Log in route
const login = async (req, res) => {
  const currentCustomer = await CustomerService.getCurrentCustomerByEmail(
    req.body.email
  );

  if (!currentCustomer)
    return res
      .status(401)
      .json({ success: false, msg: 'Incorrect email or password.' });

  const passCheck = await bcrypt.compare(
    req.body.password,
    currentCustomer.password
  );

  if (!passCheck)
    return res
      .status(401)
      .json({ success: false, msg: 'Incorrect email or password.' });

  req.session.customer = currentCustomer._id;

  res
    .status(200)
    .json({ success: true, msg: `Customer ${currentCustomer._id} logged in.` });
};

// Log out route
const logout = (req, res) => {
  req.session = null;
  res.status(200).json({ success: true, msg: 'Customer logged out.' });
};

// Route to check if customer is logged in
const authorize = (req, res) => {
  if (!req.session.customer)
    return res
      .status(401)
      .json({ success: true, msg: 'No customer logged in.' });

  res
    .status(200)
    .json({
      success: true,
      msg: `Customer ${req.session.customer} is logged in.`,
    });
};

module.exports = { login, logout, authorize };
