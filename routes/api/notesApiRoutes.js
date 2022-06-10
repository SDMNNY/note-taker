const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// post to /api/notes
router.post("/notes", (req, res) => {
  //take new note info
  const { title, text } = req.body;
  
    //   Build new note using id value 
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // Obtain read file prior to writing new note
    fs.readFile(path.join(__dirname, "../../db/db.json"), (err, note) => {
      if (err) throw err;
      const noteArr = JSON.parse(note);
      noteArr.push(newNote);
      console.log(noteArr);

      //WRITE NEW NOTES IN DATABASE 

      fs.writeFile(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(noteArr, null, 2),
        "utf8",
        (err) => {
          if (err) return console.err;
          res.json(newNote);
        }
      );
    });
  }
});

//Create

// ROUTE FOR DATABASE
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../../db/db.json"))
);

router.get("/notes/:id", (req, res) => {
  const index = req.params.id;

  res.json(allNotes[index]);
});

module.exports = router;