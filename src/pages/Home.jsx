import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container text-center">
          <div className="mb-4">
            <div className="logo-circle">VS</div>
          </div>

          <h1 className="display-3 fw-bold">VitaSync</h1>

          <p className="lead mt-3">Your Personal Health Companion</p>

          <p className="text-light opacity-75">
            Track Calories • Exercise • BMI • Water Intake
          </p>

          <div className="mt-5">
            <Link
              to="/register"
              className="primary-btn text-decoration-none me-3"
            >
              Get Started →
            </Link>

            <Link to="/dashboard" className="outline-btn text-decoration-none">
              Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}

      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold">Everything You Need</h2>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="app-card p-4 h-100 text-center">
              <div className="feature-icon">🍎</div>

              <h4 className="mt-3">Food Tracker</h4>

              <p>Log meals and monitor your daily calorie intake.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="app-card p-4 h-100 text-center">
              <div className="feature-icon">🏃</div>

              <h4 className="mt-3">Exercise</h4>

              <p>Record workouts and calories burned.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="app-card p-4 h-100 text-center">
              <div className="feature-icon">⚖</div>

              <h4 className="mt-3">BMI Calculator</h4>

              <p>Calculate your Body Mass Index instantly.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="app-card p-4 h-100 text-center">
              <div className="feature-icon">💧</div>

              <h4 className="mt-3">Water Tracker</h4>

              <p>Stay hydrated with your daily water goal.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
