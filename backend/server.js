require("dotenv").config();
const path = require("path");
const createError = require("http-errors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { Client } = require("pg");
const session = require("express-session");
const PORT = process.env.PORT || 3000;

const { viewSessionData } = require("./middleware/view-session.js");
// app.use(viewSessionData);

const express = require("express");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "static")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { secure: process.env.NODE_ENV !== "development" },
  }),
);

if (process.env.NODE_ENV === "development") {
  app.use(viewSessionData);
}

const landingRoutes = require("./routes/landing");
const authRoutes = require("./routes/authentication");
const globalLobbyRoutes = require("./routes/global_lobby");
const gameRoutes = require("./routes/game");
const testRoutes = require("./routes/test/index.js");

app.use(["/landing", "/"], landingRoutes);
app.use("/auth", authRoutes);
app.use("/lobby", globalLobbyRoutes);
app.use("/games", gameRoutes);
app.use("/db", testRoutes);

app.use((_req, _res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
