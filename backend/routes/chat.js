const express = require("express");
const router = express.Router();

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  console.log({ id, message });

  res.status(200);
});

module.exports = router;
