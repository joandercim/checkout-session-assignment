const getServicePoints = async (req, res) => {
  const response = await fetch(
    `http://atapi2.postnord.com/rest/businesslocation/v5/servicepoints/nearest/byaddress?apikey=${process.env.POSTNORD_API_KEY}&returnType=json&countryCode=SE&postalCode=${req.params.postal_code}&numberOfServicePoints=5`
  );
  const {
    servicePointInformationResponse: { servicePoints },
  } = await response.json();
  res.status(200).json({ success: true, servicePoints });
};

const validatePostalCode = async (req, res) => {
  try {
    const response = await fetch(
      `https://atapi2.postnord.com/rest/shipment/v1/validate/postalcode?apikey=${process.env.POSTNORD_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([
          { postalCode: req.params.postal_code, countryCode: 'SE', basicServiceCode: '19' },
        ]),
      }
    );

    const data = await response.json();
    let isValid = false;

    if (data[0].postalCodeType !== 'INVALID') {
      isValid = true;
    }

    res.status(200).json({ success: true, isValid });
  } catch (e) {
    res.status(500).json({success: false, error: e.message})
  }
};

module.exports = { getServicePoints, validatePostalCode };
