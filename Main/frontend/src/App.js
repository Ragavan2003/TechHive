import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/AddItemForm';
import View from './components/ItemList';
import Edit from './components/EditItemForm';

const API_URL = 'http://localhost:5000/api/people';

const App = () => {
  const [people, setPeople] = useState([]);
  const [editingPerson, setEditingPerson] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setPeople(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPerson = async (person) => {
    try {
      const response = await axios.post(API_URL, person);
      setPeople((prevPeople) => [...prevPeople, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePerson = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPeople((prevPeople) => prevPeople.filter((person) => person._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updatePerson = async (person) => {
    try {
      const response = await axios.put(`${API_URL}/${person._id}`, person);
      setPeople((prevPeople) =>
        prevPeople.map((p) => (p._id === person._id ? response.data : p))
      );
      setEditingPerson(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">MERN CRUD with Tailwind CSS</h1>
      <Form addPerson={addPerson} />
      <View key={JSON.stringify(people)} people={people} deletePerson={deletePerson} setEditingPerson={setEditingPerson} />
      {editingPerson && <Edit editingPerson={editingPerson} updatePerson={updatePerson} />}
    </div>
  );
};

export default App;
