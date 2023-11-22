const express = require("express");
const router = express.Router();

console.log("inside router");

router.get("/", (_request, response) => {
  response.render("root", { name: "defaultName" });
});

router.get("/:name", (request, response) => {
  const { name } = request.params;

  response.render("root", { name });
});

module.exports = router;
