const express=require('express');
const auth=require('../middleware/auth')
const { getNote, createNote, deleteNote, updateNote } = require('../controllers/noteController');
const notesRoutes=express.Router();

notesRoutes.get('/',auth,getNote);
notesRoutes.post('/',auth,createNote);
notesRoutes.delete('/:id',auth,deleteNote);
notesRoutes.put('/:id',auth,updateNote);



module.exports=notesRoutes;