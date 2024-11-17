import React, { useState } from "react";
import axios from "axios";

const CarForm = ({ car, onSuccess }) => {
  const [title, setTitle] = useState(car ? car.title : "");
  const [description, setDescription] = useState(car ? car.description : "");
  const [tags, setTags] = useState(car ? car.tags.join(", ") : "");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      images.forEach((image) => formData.append("images", image));

      if (car) {
        // Update existing car
        await axios.put(
          `http://localhost:5000/api/cars/${car._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create new car
        await axios.post("http://localhost:5000/api/cars", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess();
    } catch (err) {
      console.error("Error saving car:", err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{car ? "Edit Car" : "Add Car"}</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="file"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files))}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default CarForm;
