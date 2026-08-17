import { useState, useEffect } from "react";

function Food() {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");

  const [foods, setFoods] = useState(() => {
    const savedFoods = localStorage.getItem("foods");

    if (savedFoods) {
      return JSON.parse(savedFoods);
    }

    return [
      { id: 1, name: "Apple", calories: 95 },
      { id: 2, name: "Banana", calories: 105 },
    ];
  });

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  const [isEditing, setIsEditing] = useState(false);

  const [editId, setEditId] = useState(null);

  const addFood = () => {
    if (foodName === "" || calories === "") {
      alert("Please fill all fields");
      return;
    }

    if (isEditing) {
      const updatedFoods = foods.map((food) => {
        if (food.id === editId) {
          return {
            ...food,
            name: foodName,
            calories: Number(calories),
          };
        }

        return food;
      });

      setFoods(updatedFoods);

      setIsEditing(false);

      setEditId(null);
    } else {
      const newFood = {
        id: Date.now(),
        name: foodName,
        calories: Number(calories),
      };

      setFoods([...foods, newFood]);
    }

    setFoodName("");

    setCalories("");
  };

  const editFood = (food) => {
    setFoodName(food.name);
    setCalories(food.calories);

    setEditId(food.id);

    setIsEditing(true);
  };

  const deleteFood = (id) => {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
  };

  const totalCalories = foods.reduce((total, food) => total + food.calories, 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🍎 Food Tracker</h2>

      <div className="card shadow p-4">
        <input
          className="form-control mb-3"
          placeholder="Food Name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />

        <button className="btn btn-success" onClick={addFood}>
          {isEditing ? "Update Food" : "Add Food"}
        </button>
      </div>

      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food.id}>
              <td>{food.name}</td>

              <td>{food.calories}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editFood(food)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteFood(food.id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card shadow p-3">
        <h3>🔥 Total Calories : {totalCalories}</h3>
      </div>
    </div>
  );
}

export default Food;
