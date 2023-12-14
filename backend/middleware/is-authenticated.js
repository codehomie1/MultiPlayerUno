const isAuthenticated = (req, res, next) => {
  console.log("----------auth middleware-------------");
  if (req.session.user) {
    console.log(req.session.user);
  } else {
    console.log(" no session user session");
  }
  console.log("----------auth middleware-------------");

  if (req.session.user !== undefined) {
    next();
  } else {
    res.redirect("/auth/sign_in");
  }
};

module.exports = { isAuthenticated };
