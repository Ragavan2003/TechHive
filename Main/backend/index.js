const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb+srv://Sedhuragavan:TechHive@cluster0.8avkv1r.mongodb.net/?retryWrites=true&w=majority/mern_crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });

const personSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Person = mongoose.model('Person', personSchema);

app.get('/api/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/people', async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.json(savedPerson);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/people/:id', async (req, res) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPerson);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/people/:id', async (req, res) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
