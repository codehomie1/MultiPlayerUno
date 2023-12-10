const viewSessionData = (req, res, next) => {
  console.log("-------SESSION DATA-----------");
  console.log(req.session);
  console.log("-------SESSION DATA------------");
  next();
};

module.exports = { viewSessionData };
