const express = require("express")
const router = express.Router();
const Student= require("../models/student");
const validateMW = require('../middelware/validateMW');
const studentSchema=require("../validators/studentsSchema");
const { io } = require('../app');

router.get("/",async (req,res,next)=>{
    const students=await Student.find()
    res.json(students)
});
router.post('/add',validateMW(studentSchema), async(req,res,next)=>{
        const student=new Student({
            name:req.body.studentname,
            note:req.body.note,
            classeEtudiant:req.body.nom
        })
        await student.save();
        res.json({message:"student added"})
})

router.delete('/delete/:_id',async(req,res,next)=>{
    await Student.findByIdAndDelete(req.params._id);
    res.json({message:"student deleted"})
}
)
router.put('/update/:_id',validateMW(studentSchema),async(req,res,next)=>{
    await Student.findByIdAndUpdate(req.params._id,{
        name:req.body.studentname,
            note:req.body.note,
            classeEtudiant:req.body.nom

    })
    
    res.json({message:"student updated"})
})

router.get('/name/:name',async(req,res,next)=>{
    const students=await Student.find({nom:req.params.nom})
    res.json(students)
})
router.get('/id/:id', async (req, res, next) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        res.status(404).json({ message: 'Student not found' });
      } else {
        res.json(student);
      }
    } catch (error) {
      next(error);
    }
  });


  router.put('/Etudiant/:_id', async (req, res, next) => {
    try {
        const student = await Student.findById(req.params._id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const currentNote = student.note;
        const updatedNote = currentNote + (0.2 * currentNote);
        await Student.findByIdAndUpdate(req.params._id, { note: updatedNote });

        res.json({ message: "Student updated", updatedNote });
    } catch (error) {
        next(error);
    }
});

router.get('/alerte', async (req, res, next) => {
    try {
        const studentsWithLowNote = await Student.countDocuments({ note: { $lt: 8 } });
        io.emit('studentCountAlert', { message: `Number of students with note less than 8: ${studentsWithLowNote}`, count: studentsWithLowNote });
        res.json({ message: 'Student count alert triggered successfully' });
    } catch (error) {
        next(error);
    }
});





module.exports=router;