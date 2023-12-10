const isAuthenticated = (req, res, next) => {
  if (req.session.user !== undefined) {
    next();
  } else {
    console.log("NOT AUTHENTICATED.. going to landing");
    res.redirect("/landing");
  }
};

module.exports = { isAuthenticated };
