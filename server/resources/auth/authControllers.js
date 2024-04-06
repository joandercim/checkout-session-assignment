const bcrypt = require('bcrypt');
const CustomerService = require('../../utils/CustomerService');

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

  req.session.customer = currentCustomer.email;

  res
    .status(200)
    .json({ success: true, customer: currentCustomer });
};

const logout = (req, res) => {
  req.session = null;
  res.status(200).json({ success: true, msg: 'Customer logged out.' });
};

const authorize = async (req, res) => {
  if (!req.session.customer)
    return res
      .status(200)
      .json({ success: true, customer: null });

  res
    .status(200)
    .json({
      success: true,
      customer: req.session.customer,
    });
};

module.exports = { login, logout, authorize };
