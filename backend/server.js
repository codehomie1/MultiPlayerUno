require("dotenv").config();
const { createServer } = require("http");

const path = require("path");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { Client } = require("pg");
const bodyParser = require("body-parser");
const session = require("express-session");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

const {
  viewSessionData,
  sessionLocals,
  isAuthenticated,
} = require("./middleware/");

const express = require("express");
const app = express();
const httpServer = createServer(app);

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

// console.log("--------process NODE_ENV---------");
// console.log(process.env.NODE_ENV);
// console.log("--------process NODE_ENV---------");

// console.log("--------session secret---------");
// console.log(process.env.SESSION_SECRET);
// console.log("--------session secret---------");

// console.log("------process === development");
// console.log(process.env.NODE_ENV === "development");

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

const sessionMiddleware = session({
  store: new (require("connect-pg-simple")(session))({
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV !== "development" },
});

app.use(sessionMiddleware);

if (process.env.NODE_ENV === "development") {
  app.use(viewSessionData);
}

app.use(sessionLocals);
const io = new Server(httpServer);
io.engine.use(sessionMiddleware);
app.set("io", io);

io.on("connection", (socket) => {
  socket.join(socket.request.session.id);
});

const Routes = require("./routes");
const { Socket } = require("socket.io-client");

app.use(["/landing", "/"], Routes.landing);
app.use("/auth", Routes.authentication);
app.use("/lobby", isAuthenticated, Routes.lobby);
app.use("/games", isAuthenticated, Routes.game);
app.use("/chat", isAuthenticated, Routes.chat);

app.use((_req, _res, next) => {
  next(createError(404));
});

httpServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
