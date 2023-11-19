const express = require("express");
const router = express.Router();

router.get("/:name", (_request, response) => {
    const name = _request.params.name;

    response.render('root', { name });
})

module.exports = router;