const sessionLocals = (request, response, next) => {
  console.log("-------------session Locals middle------------");
  if (request.session.user) {
    response.locals.user = request.session.user;
    console.log(response.locals.user);
  } else {
    console.log("no response locals user");
  }
  console.log("-------------session Locals middle------------");
  next();
};

module.exports = { sessionLocals };
