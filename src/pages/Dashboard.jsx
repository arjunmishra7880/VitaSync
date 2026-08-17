import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {
  const location = useLocation();

  const [water, setWater] = useState(() => {
    const savedWater = localStorage.getItem("water");
    return savedWater ? Number(savedWater) : 5;
  });

  const [bmi, setBmi] = useState(() => {
    return localStorage.getItem("bmi") || "--";
  });

  const [bmiStatus, setBmiStatus] = useState(() => {
    return localStorage.getItem("bmiStatus") || "Not calculated";
  });

  const [foods, setFoods] = useState(() => {
    const savedFoods = localStorage.getItem("foods");

    return savedFoods ? JSON.parse(savedFoods) : [];
  });

  const [exercises, setExercises] = useState(() => {
    const savedExercises = localStorage.getItem("exercises");

    return savedExercises ? JSON.parse(savedExercises) : [];
  });

  const totalExerciseMinutes = exercises.reduce(
    (total, exercise) => total + Number(exercise.duration || 0),
    0,
  );

  const totalCalories = foods.reduce(
    (total, food) => total + Number(food.calories),
    0,
  );

  const totalCaloriesBurned = exercises.reduce(
    (total, exercise) => total + Number(exercise.calories || 0),
    0,
  );

  const netCalories = totalCalories - totalCaloriesBurned;

  const recentFoods = [...foods].reverse().slice(0, 5);
  const recentExercises = [...exercises].reverse().slice(0, 5);

  const refreshDashboard = () => {
    const savedWater = localStorage.getItem("water");
    const savedFoods = localStorage.getItem("foods");
    const savedExercises = localStorage.getItem("exercises");
    const savedBmi = localStorage.getItem("bmi");
    const savedBmiStatus = localStorage.getItem("bmiStatus");

    if (savedWater) {
      setWater(Number(savedWater));
    }

    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    }

    if (savedExercises) {
      setExercises(JSON.parse(savedExercises));
    }

    if (savedBmi) {
      setBmi(savedBmi);
    }

    if (savedBmiStatus) {
      setBmiStatus(savedBmiStatus);
    }
  };

  useEffect(() => {
    refreshDashboard();
  }, [location]);

  useEffect(() => {
    localStorage.setItem("water", water);
  }, [water]);

  useEffect(() => {
    window.addEventListener("storage", refreshDashboard);

    return () => {
      window.removeEventListener("storage", refreshDashboard);
    };
  }, []);

  return (
    <div className="dashboard-page">
      <div className="container pt-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="dashboard-label">VITASYNC</p>

            <h1 className="dashboard-title">Welcome Back 👋</h1>

            <p className="dashboard-subtitle">
              Here's your health overview for today.
            </p>
          </div>

          <Link to="/food" className="primary-btn text-decoration-none">
            + Add Food
          </Link>
        </div>

        {/* Statistics */}
        <div className="row g-4">
          {/* Calories */}
          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-icon green-icon">🔥</div>

              <p className="stat-label">Calories</p>

              <h2 className="stat-value">{totalCalories.toLocaleString()}</h2>

              <p className="stat-description">kcal consumed today</p>
              <p className="stat-description">
                {totalCaloriesBurned} kcal burned through exercise
              </p>
            </div>
          </div>

          {/* Water */}
          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-icon blue-icon">💧</div>

              <p className="stat-label">Water</p>

              <h2 className="stat-value">{water} / 8</h2>

              <p className="stat-description">glasses today</p>

              <div className="water-controls">
                <button
                  className="water-btn"
                  onClick={() => setWater(Math.min(water + 1, 8))}
                >
                  + Add Glass
                </button>

                <button className="water-reset" onClick={() => setWater(0)}>
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Exercise */}
          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-icon orange-icon">🏃</div>

              <p className="stat-label">Exercise</p>

              <h2 className="stat-value">{totalExerciseMinutes}</h2>

              <p className="stat-description">minutes recorded</p>
            </div>
          </div>

          {/* BMI */}
          <div className="col-md-6 col-lg-3">
            <div className="stat-card">
              <div className="stat-icon purple-icon">⚖️</div>

              <p className="stat-label">BMI</p>

              <h2 className="stat-value">{bmi}</h2>

              <p className="stat-description">{bmiStatus}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="stat-card">
            <div className="stat-icon green-icon">⚡</div>

            <p className="stat-label">Net Calories</p>

            <h2 className="stat-value">{netCalories.toLocaleString()}</h2>

            <p className="stat-description">kcal after exercise</p>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="row g-4 mt-2">
          {/* Daily Progress */}
          <div className="col-lg-8">
            <div className="dashboard-card">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3>Daily Progress</h3>

                  <p className="text-muted mb-0">
                    Keep going! You're doing great.
                  </p>
                </div>

                <span className="progress-percentage">72%</span>
                <div className="net-calorie-box mt-4">
                  <div>
                    <small>NET CALORIES</small>

                    <h3>{netCalories.toLocaleString()} kcal</h3>
                  </div>

                  <div className="net-calorie-details">
                    <span>🍽️ {totalCalories.toLocaleString()} eaten</span>

                    <span>
                      🔥 {totalCaloriesBurned.toLocaleString()} burned
                    </span>
                  </div>
                </div>
              </div>

              {/* Calories Progress */}
              <div className="progress-item">
                <div className="d-flex justify-content-between">
                  <span>🔥 Calories</span>

                  <span>{totalCalories} / 1800 kcal</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min((totalCalories / 1800) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Water Progress */}
              <div className="progress-item">
                <div className="d-flex justify-content-between">
                  <span>💧 Water</span>

                  <span>{water} / 8 glasses</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(water / 8) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Exercise Progress */}
              <div className="progress-item">
                <div className="d-flex justify-content-between">
                  <span>🏃 Exercise</span>

                  <span>{totalExerciseMinutes} / 60 minutes</span>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${Math.min(
                        (totalExerciseMinutes / 60) * 100,
                        100,
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-4">
            <div className="dashboard-card">
              <h3 className="mb-4">Quick Actions</h3>

              <Link to="/food" className="quick-action">
                <span>🥗</span>

                <div>
                  <strong>Track Food</strong>
                  <small>Add today's meal</small>
                </div>
              </Link>

              <Link to="/exercise" className="quick-action">
                <span>🏃</span>

                <div>
                  <strong>Log Exercise</strong>
                  <small>Record your workout</small>
                </div>
              </Link>

              <Link to="/bmi" className="quick-action">
                <span>⚖️</span>

                <div>
                  <strong>Calculate BMI</strong>
                  <small>Check your body mass index</small>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* =========================
    RECENT ACTIVITY
========================= */}

        <div className="row mt-4">
          <div className="col-12">
            <div className="dashboard-card activity-list">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h3 className="mb-1">Recent Activity</h3>

                  <p className="text-muted mb-0">
                    Your latest health activities
                  </p>
                </div>
              </div>

              {/* Food Activities */}

              {recentFoods.map((food, index) => (
                <div className="activity-item" key={`food-${food.id || index}`}>
                  <div className="activity-icon">🍎</div>

                  <div className="activity-content">
                    <strong>Added {food.name}</strong>

                    <small>{food.calories} kcal</small>
                  </div>
                </div>
              ))}

              {/* Exercise Activities */}

              {recentExercises.map((exercise, index) => (
                <div
                  className="activity-item"
                  key={`exercise-${exercise.id || index}`}
                >
                  <div className="activity-icon">🏃</div>

                  <div className="activity-content">
                    <strong>{exercise.name}</strong>

                    <small>
                      {exercise.duration} minutes • {exercise.calories} kcal
                      burned
                    </small>
                  </div>
                </div>
              ))}

              {/* Water */}

              {water > 0 && (
                <div className="activity-item">
                  <div className="activity-icon">💧</div>

                  <div className="activity-content">
                    <strong>Water intake</strong>

                    <small>{water} / 8 glasses today</small>
                  </div>
                </div>
              )}

              {/* BMI */}

              {bmi !== "--" && (
                <div className="activity-item">
                  <div className="activity-icon">⚖️</div>

                  <div className="activity-content">
                    <strong>BMI calculated</strong>

                    <small>
                      BMI {bmi} • {bmiStatus}
                    </small>
                  </div>
                </div>
              )}

              {/* Empty State */}

              {recentFoods.length === 0 &&
                recentExercises.length === 0 &&
                water === 0 &&
                bmi === "--" && (
                  <div className="empty-activity">No recent activity yet.</div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
