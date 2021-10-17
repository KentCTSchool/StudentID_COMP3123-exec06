const noteModel = require('../models/NotesModel.js');
const express = require('express');
const app = express();
//TODO - Create a new Note\/
/** 
{
    "noteTitle": "Lab exercise 6",
    "noteDescription": "Due this Sunday!",
    "priority": "MEDIUM",
    "dateAdded": "Date.now()",
    "dateUpdated": "Date.now()"
}

*/
//http://mongoosejs.com/docs/api.html#document_Document-save

app.post('/notes', async (req, res) => {
    // res.send("Hello")
    // Validate request
    if(!(req.body)) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note
    const newNote = new noteModel(req.body);    
    try {
        await newNote.save();
        res.send(newNote);
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    // Validate request
    // res.send("Hello")
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    // //TODO - Write your code here to returns all note
    const notes = await noteModel.find({});
    try {
        res.send(notes);
      } catch (err) {
        res.status(500).send(err);
      }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    // Validate request
    if(!(req.body)) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to return onlt one note using noteid
    const notes = await noteModel.findById(req.params.noteId);
    try {
        res.send(notes);
      } catch (err) {
        res.status(500).send(err);
      }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid
    try {
        let note = await noteModel.findByIdAndUpdate(req.params.noteId, req.body);
        res.status(200).send("Successfully Updated")
        if (!note) res.status(404).send("No item found")
      } catch (err) {
        res.status(500).send(err);
      }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    // Validate request
    if(req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to delete the note using noteid
    try {
        let note = await noteModel.findByIdAndDelete(req.params.noteId)
        res.status(200).send("Successfully Deleted")
    
        if (!note) res.status(404).send("No item found")
      } catch (err) {
        res.status(500).send(err)
      }
});

module.exports = app