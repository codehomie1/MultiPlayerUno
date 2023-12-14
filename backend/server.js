require("dotenv").config();
const path = require("path");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { Client } = require("pg");
const bodyParser = require("body-parser");
const session = require("express-session");
const PORT = process.env.PORT || 3000;

const { viewSessionData } = require("./middleware/view-session.js");
const { sessionLocals } = require("./middleware/session-locals.js");
const { isAuthenticated } = require("./middleware/is-authenticated.js");

const express = require("express");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

console.log("--------process NODE_ENV---------");
console.log(process.env.NODE_ENV);
console.log("--------process NODE_ENV---------");

console.log("--------session secret---------");
console.log(process.env.SESSION_SECRET);
console.log("--------session secret---------");

console.log("------process === development");
console.log(process.env.NODE_ENV === "development");

if (process.env.NODE_ENV === "development") {
  require("dotenv").config();

  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "static"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV !== "development" },
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(viewSessionData);
}

app.use(sessionLocals);

const landingRoutes = require("./routes/landing");
const authRoutes = require("./routes/authentication");
const lobbyRoutes = require("./routes/lobby");
const gameRoutes = require("./routes/game");
const testRoutes = require("./routes/test/index.js");
const { log } = require("console");

app.use(["/landing", "/"], landingRoutes);
app.use("/auth", authRoutes);

// must be authenticated to get to lobby and games route
app.use("/lobby", isAuthenticated, lobbyRoutes);
app.use("/games", isAuthenticated, gameRoutes);

app.use("/db", testRoutes);

app.use((_req, _res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
