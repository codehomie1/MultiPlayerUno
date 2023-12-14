const isAuthenticated = (req, res, next) => {
  console.log("----------auth middleware-------------");
  console.log(req.session);
  console.log("----------auth middleware-------------");
  next();
};

module.exports = { isAuthenticated };
