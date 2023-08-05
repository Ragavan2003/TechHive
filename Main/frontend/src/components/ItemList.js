
import React from 'react';

const View = ({ people, deletePerson, setEditingPerson }) => {
  return (
    <div>
      {people.map((person) => (
        <div key={person._id} className="my-4 p-4 border">
          <p>
            <strong>Name: </strong>
            {person.firstName} {person.lastName}
          </p>
          <p>
            <strong>Email: </strong>
            {person.email}
          </p>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => setEditingPerson(person)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => deletePerson(person._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default View;
