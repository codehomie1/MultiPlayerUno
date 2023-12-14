const viewSessionData = (req, res, next) => {
  console.log("-------SESSION DATA middle-----------");
  console.log(req.session);
  console.log("-------SESSION DATA middle------------");
  next();
};

module.exports = { viewSessionData };
