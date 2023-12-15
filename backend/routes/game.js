const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const uId = req.session.user ? req.session.user.id: "";

  res.render("game", { 
    id,
    user_id: uId,
    title: "",
   });
});

module.exports = router;
