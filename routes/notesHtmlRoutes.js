const router = require("express").Router();
const path = require("path");



//ROUTE for homepage

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);

// ROUTE for notepage
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

module.exports = router;