const router = require("express").Router();

router.get("/", (request, response) => {
  response.status(201).send({ dummy: "test successful!" });
});

module.exports = router;
