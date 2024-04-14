const express = require('express');
const {getServicePoints, validatePostalCode} = require('./postnordControllers');

const postnordRouter = express.Router();

postnordRouter.get('/servicepoints/:postal_code', getServicePoints)
postnordRouter.get('/validate_postal_code/:postal_code', validatePostalCode)

module.exports= postnordRouter;