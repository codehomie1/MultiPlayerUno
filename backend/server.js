require("dotenv").config();
const path = require("path");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { Client } = require("pg");
const initSockets = require("./sockets/initialize.js");

const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const addSessionLocals = require("./middleware/add-session-locals.js");
const db = require("./db/connection.js");
const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const sessionMiddleWare = session({
  store: new pgSession({ pgPromise: db, createTableIfMissing: true }),
  secret: "sessionsecret123",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
});

app.use(sessionMiddleWare);
app.use(addSessionLocals);
const server = initSockets(app, sessionMiddleWare);

if (process.env.NODE_ENV === "development") {
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");

  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "backend", "static"));
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}

app.use(express.static(path.join(__dirname, "static")));

const landingPage = require("./routes/landing.js");
const gamesRoutes = require("./routes/static/games.js");
const lobbyRoutes = require("./routes/static/lobby.js");
const waitingroomRoutes = require("./routes/static/waitingroom.js");
const authenticationRoutes = require("./routes/static/authentication.js");
const users = require("./routes/users.js");
const games = require("./routes/game.js");
const waitingroom = require("./routes/waitingroom.js");

// const landingRoutes = require("./routes/landing");
// const authRoutes = require("./routes/authentication");
// const globalLobbyRoutes = require("./routes/global_lobby");
// const gameRoutes = require("./routes/game");
// const testRoutes = require("./routes/test/index.js");

// app.use("/", landingRoutes);
// app.use("/auth", authRoutes);
// app.use("/lobby", globalLobbyRoutes);
// app.use("/games", gameRoutes);
// app.use("/db", testRoutes);

app.use("/", landingPage);
app.use("/waitingroom", waitingroomRoutes);
app.use("/games", gamesRoutes);
app.use("/lobby", lobbyRoutes);
app.use("/authentication", authenticationRoutes);
app.use("/api/users", users);
app.use("/api/games", games);
app.use("/api/waitingroom", waitingroom);

app.use((_req, _res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
