import { useState, useEffect } from "react";

const exerciseRates = {
  Walking: 4,
  Running: 10,
  Cycling: 8,
  Yoga: 3,
  Gym: 7,
};

function Exercise() {
  const [exerciseName, setExerciseName] = useState("");
  const [duration, setDuration] = useState("");

  const [exercises, setExercises] = useState(() => {
    const savedExercises = localStorage.getItem("exercises");

    if (savedExercises) {
      return JSON.parse(savedExercises);
    }

    return [];
  });

  // Save exercises to localStorage
  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  // Add exercise
  const addExercise = () => {
    if (exerciseName === "" || duration === "") {
      alert("Please fill all fields");
      return;
    }

    if (Number(duration) <= 0) {
      alert("Duration must be greater than 0");
      return;
    }

    const caloriesBurned = Number(duration) * exerciseRates[exerciseName];

    const newExercise = {
      id: Date.now(),
      name: exerciseName,
      duration: Number(duration),
      calories: caloriesBurned,
    };

    setExercises([...exercises, newExercise]);

    setExerciseName("");
    setDuration("");
  };

  // Delete exercise
  const deleteExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  // Total calories burned
  const totalCaloriesBurned = exercises.reduce(
    (total, exercise) => total + Number(exercise.calories || 0),
    0,
  );

  // Total exercise time
  const totalMinutes = exercises.reduce(
    (total, exercise) => total + Number(exercise.duration || 0),
    0,
  );

  return (
    <div className="container pt-5">
      {/* Header */}
      <div className="mb-4">
        <p className="dashboard-label">VITASYNC</p>

        <h1 className="dashboard-title">🏃 Exercise Tracker</h1>

        <p className="dashboard-subtitle">
          Track your workouts and calories burned.
        </p>
      </div>

      {/* Add Exercise */}
      <div className="dashboard-card">
        <h3 className="mb-4">Add Exercise</h3>

        <select
          className="form-select mb-3"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
        >
          <option value="">Select Exercise</option>

          <option value="Walking">🚶 Walking</option>

          <option value="Running">🏃 Running</option>

          <option value="Cycling">🚴 Cycling</option>

          <option value="Yoga">🧘 Yoga</option>

          <option value="Gym">🏋️ Gym</option>
        </select>

        <input
          className="form-control mb-3"
          type="number"
          min="1"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button className="primary-btn mt-2" onClick={addExercise}>
          + Add Exercise
        </button>
      </div>

      {/* Summary */}
      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div className="stat-card">
            <div className="stat-icon orange-icon">🏃</div>

            <p className="stat-label">Total Exercise</p>

            <h2 className="stat-value">{totalMinutes}</h2>

            <p className="stat-description">minutes recorded</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="stat-card">
            <div className="stat-icon green-icon">🔥</div>

            <p className="stat-label">Calories Burned</p>

            <h2 className="stat-value">{totalCaloriesBurned}</h2>

            <p className="stat-description">kcal burned</p>
          </div>
        </div>
      </div>

      {/* Exercise History */}
      <div className="dashboard-card mt-4">
        <h3 className="mb-4">Exercise History</h3>

        {exercises.length === 0 ? (
          <div className="empty-activity">No exercises recorded yet.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Exercise</th>
                  <th>Minutes</th>
                  <th>Calories Burned</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {exercises.map((exercise) => (
                  <tr key={exercise.id}>
                    <td>{exercise.name}</td>

                    <td>{exercise.duration}</td>

                    <td>🔥 {exercise.calories}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteExercise(exercise.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Exercise;
