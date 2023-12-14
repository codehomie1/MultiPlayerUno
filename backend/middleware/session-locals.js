const sessionLocals = (request, response, next) => {
  // response.locals.user = request.session.user;
  console.log("-------------session Locals middle------------");
  if (request.session.user) {
    response.locals = request.session.user;
    console.log(response.locals);
  }
  console.log("-------------session Locals middle------------");
  next();
};

module.exports = { sessionLocals };
