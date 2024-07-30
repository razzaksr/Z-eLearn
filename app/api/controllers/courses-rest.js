const express = require('express');
const router = express.Router();
const Course = require('../entities/courses');

// Create a course
router.post('/create', async (req, res) => {
  const { title, description, teacher } = req.body;
  try {
    const newCourse = new Course({ title, description, teacher });
    await newCourse.save();
    res.status(201).send(newCourse);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a course
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).send(updatedCourse);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a course
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Course.findByIdAndDelete(id);
    res.status(200).send({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// read course's of particular user
router.get('/teacher/:id',async(req,res)=>{
    try{
        const data = await Course.find({"teacher":{'$eq':req.params.id}})
        res.status(200).json(data)
    }
    catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;
