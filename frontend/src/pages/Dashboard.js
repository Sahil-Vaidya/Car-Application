import React, { useEffect, useState } from "react";
import axios from "axios";
import CarList from "../components/CarList";
import CarForm from "../components/CarForm";
import CarDetail from "../components/CarDetail";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchCars = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/cars/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCars(res.data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleAddCar = () => {
    setSelectedCar(null);
    setShowForm(true);
  };

  const handleEditCar = (car) => {
    setSelectedCar(car);
    setShowForm(true);
  };

  const handleDeleteCar = async (carId) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/cars/${carId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCars();
  };

  return (
    <div>
      <h1>My Cars</h1>
      {showForm ? (
        <CarForm
          car={selectedCar}
          onSuccess={() => {
            fetchCars();
            setShowForm(false);
          }}
        />
      ) : (
        <div>
          <button onClick={handleAddCar}>Add New Car</button>
          <CarList
            cars={cars}
            onEdit={handleEditCar}
            onDelete={handleDeleteCar}
            onView={(car) => setSelectedCar(car)}
          />
        </div>
      )}
      {selectedCar && <CarDetail car={selectedCar} />}
    </div>
  );
};

export default Dashboard;
