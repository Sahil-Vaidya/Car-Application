import React from "react";

const CarList = ({ cars, onEdit, onDelete, onView }) => {
  return (
    <div>
      {cars.map((car) => (
        <div key={car._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
          <h3>{car.title}</h3>
          <p>{car.description}</p>
          <button onClick={() => onView(car)}>View</button>
          <button onClick={() => onEdit(car)}>Edit</button>
          <button onClick={() => onDelete(car._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CarList;
