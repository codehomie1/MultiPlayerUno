const sessionLocals = (req, res, next) => {
  console.log(res.locals);
  next();
};

module.exports = { sessionLocals };
