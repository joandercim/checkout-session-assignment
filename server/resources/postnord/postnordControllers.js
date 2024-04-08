const getServicePoints = async (req, res) => {
  const response = await fetch(
    `http://atapi2.postnord.com/rest/businesslocation/v5/servicepoints/nearest/byaddress?apikey=${process.env.POSTNORD_API_KEY}&returnType=json&countryCode=SE&postalCode=${req.params.postal_code}&numberOfServicePoints=5`
  );
    const { servicePointInformationResponse: { servicePoints } } = await response.json();
  res.status(200).json({ success: true, servicePoints });
};

module.exports = getServicePoints;
