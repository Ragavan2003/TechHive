import React, { useState, useEffect } from 'react';

const Edit = ({ editingPerson, updatePerson }) => {
  const [formData, setFormData] = useState(editingPerson);

  useEffect(() => {
    setFormData(editingPerson);
  }, [editingPerson]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePerson(formData);
  };

  return (
    <form className="my-4 p-4 border" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        className="block mb-2"
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        className="block mb-2"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="block mb-2"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="block mb-2"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >
        Update Person
      </button>
    </form>
  );
};

export default Edit;
