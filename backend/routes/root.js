const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("root", { name: "default" });
});

router.get("/:name", (request, response) => {
  const { name } = request.params;

  response.render("root", { name });
});

module.exports = router;
