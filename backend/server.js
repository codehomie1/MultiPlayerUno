require("dotenv").config();
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { Client } = require("pg");
const bodyParser = require("body-parser");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const db = require("./db/db.js");
const PORT = process.env.PORT || 3000;
const initSockets = require("./middleware/io.js");

const {
  viewSessionData,
  sessionLocals,
  isAuthenticated,
} = require("./middleware/");

const express = require("express");
const app = express();

const sessionMiddleware = session({
  store: new pgSession({ pgPromise: db, createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000*60*60*24*7 },
});

const server = initSockets(app, sessionMiddleware);
const io = socketIO(server);

io.on("connection", (socket) => {
  socket.on("chatMessage", (message) => {
    io.emit("chatMessage", message);
  });
});

app.get("/socket.io/socket.io.js", (req, res) => {
  const socketIOPath = require.resolve("socket.io-client/dist/socket.io.js");
  res.sendFile(socketIOPath);
});
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
    store: new (require("connect-pg-simple")(session))({
      createTableIfMissing: true,
    }),
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

const Routes = require("./routes");

app.use(["/landing", "/"], Routes.landing);
app.use("/auth", Routes.authentication);
app.use("/waitingroom", isAuthenticated, Routes.waitingroom);
app.use("/lobby", isAuthenticated, Routes.lobby);
app.use("/games", isAuthenticated, Routes.game);

app.use((_req, _res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
