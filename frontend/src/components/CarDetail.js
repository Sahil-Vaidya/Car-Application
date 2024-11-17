import React from "react";

const CarDetail = ({ car }) => {
  if (!car) return <div>No car selected</div>;

  return (
    <div>
      <h1>{car.title}</h1>
      <p>{car.description}</p>
      <p>Tags: {car.tags.join(", ")}</p>
      <div>
        {car.images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/uploads/${image}`}
            alt={`Car ${index + 1}`}
            style={{ width: "200px", margin: "10px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default CarDetail;
