const express = require('express');
const router = express.Router();
const User = require('../entities/users');
const bcrypt = require('bcrypt')

// Create a user
router.post('/create', async (req, res) => {
  const { username, encode, role, email } = req.body;
  const password=await bcrypt.hash(encode,10)
  try {
    const newUser = new User({ username, password, role, email });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update user profile
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a user
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

// read all users
router.get('/read',async(req,res)=>{
    try{
        const data = await User.find()
        res.status(200).json(data)
    }
    catch(err){
        res.status(404).json(err)
    }
})

module.exports=router
