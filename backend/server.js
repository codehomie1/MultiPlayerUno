const requestTime = require("./middleware/request-time.js");
const createError = require("http-errors");
const path = require('path');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

const rootRoutes = require('./routes/root.js');
app.use("/", rootRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


app.use((request, response, next) => {
    next(createError(404));
});