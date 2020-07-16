const Note = require("../models/Note");

exports.create = async (req, res) => {
  try {
    const { title, content } = req.body;
    const _author = req.user;
    const noteFields = {};
    if (title) noteFields.title = title.trim();
    if (content) noteFields.content = title.trim();
    noteFields._author = _author;
    const newNote = new Note(noteFields);
    await newNote.save();
    return res.json(newNote);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const noteFields = {};
    if (title) noteFields.title = title.trim();
    if (content) noteFields.content = content.trim();

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, _author: req.user },
      { $set: noteFields },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "updated note not found" });
    }
    return res.json(updatedNote);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const noteToDelete = await Note.findOneAndRemove({ _id: id });
    if (!noteToDelete) {
      return res.status(404).json({ message: "Could not find note delete" });
    }
    return res.json({ message: "The note was deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
};

exports.findOneNote = async (req, res) => {
  try {
    const { id } = req.params;
    const findNote = await Note.findOne({ _id: id });
    if (!findNote) {
      return res.status(404).json({ message: "Could not find note" });
    }
    return res.json(findNote);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
};

exports.findAllNotes = async (req, res) => {
  try {
    const findNotes = await Note.find();
    return res.json(findNotes);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
};

exports.findNotesForUser = async (req, res) => {
  try {
    const { author } = req.params;
    const findNotes = await Note.find({ _author: author });
    return res.json(findNotes);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
};

exports.findNotesForCurrentUser = async (req, res) => {
  try {
    const findNotes = await Note.find({ _author: req.user });
    return res.json(findNotes);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
};
