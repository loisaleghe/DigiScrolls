const express = require("express");

const { authorize } = require("../middleware");

const router = express.Router();

// import controller methods
const {
  create,
  update,
  deleteNote,
  findOneNote,
  findAllNotes,
  findNotesForUser,
  findNotesForCurrentUser,
} = require("../controllers/notes");

router.get("/", authorize, findAllNotes);
router.get("/:id", authorize, findOneNote);
router.get("/author/:author", authorize, findNotesForUser);
router.get("/current/author", authorize, findNotesForCurrentUser);

router.post("/", authorize, create);

router.put("/:id", authorize, update);

router.delete("/:id", authorize, deleteNote);

module.exports = router;
