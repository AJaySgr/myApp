const noteModel=require('../models/note');

const createNote= async(req,res)=>{
    console.log(req.userId);

    const {title,description}=req.body;

     newNote=noteModel({
        title:title,
        description:description,
        userId:req.userId    
    });
    try {
        await newNote.save();
        res.status(201).send(newNote);
        


    } catch (error) {
        console.log(error);
        res.status(200).send({message:'something went wrong!!'});
    }

}

const updateNote= async(req,res)=>{

    const id=req.params.id;
    const {title,description}=req.body;
    const newNote={
        title:title,
        description:description,
        userId:req.userId
    }
    try {
        await noteModel.findByIdAndUpdate(id,newNote,{new:true});
        return res.status(200).json(newNote);
        
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Something went wrong!!!"});
    }
    
}

const deleteNote=async(req,res)=>{

    const id=req.params.id;
    try {
        const note = await noteModel.findByIdAndRemove(id);
        return res.status(202).json(newNote);
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"Something went wrong!!!"});
        
    }
}

const getNote=async (req,res)=>{

    try {
        
        const notes=await noteModel.find({userId:req.userId}); 
        res.status(200).send(notes);
    } catch (error) {
        console.log(error);
        res.status(200).send({message:'something went wrong!!'});
    }

}


module.exports={getNote,updateNote,deleteNote,createNote};
