var notes = require("../db/db.json");
var fs = require("fs");
var { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    // add an id to the req.body before it gets pushed in
    req.body.id = uuidv4();
    // then push it into notes
    notes.push(req.body);

    fs.writeFile("./db/db.json", JSON.stringify(notes), "utf8", function (err) {
      if (err) throw err;
      res.json(req.body);
    })

  });
  
  app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    console.log(id);
    console.log(notes);
    const newNotes = notes.filter(note => note.id !== req.params.id);
    
    
    console.log(notes);
    fs.writeFile("./db/db.json", JSON.stringify(newNotes), "utf8", function (err) {
      if (err) throw err;
      res.json(true);
    })

  });


};