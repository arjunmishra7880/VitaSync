import { useState } from "react";

function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    const h = height / 100;

    const result = weight / (h * h);

    setBMI(result.toFixed(2));
    localStorage.setItem("bmi", result.toFixed(2));

    let bmiStatus = "";

    if (result < 18.5) {
      bmiStatus = "Underweight";
    } else if (result < 25) {
      bmiStatus = "Normal Weight";
    } else if (result < 30) {
      bmiStatus = "Overweight";
    } else {
      bmiStatus = "Obese";
    }

    setStatus(bmiStatus);

    localStorage.setItem("bmi", result.toFixed(2));
    localStorage.setItem("bmiStatus", bmiStatus);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2>⚖️ BMI Calculator</h2>

          <input
            type="number"
            className="form-control mt-3"
            placeholder="Enter Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <input
            type="number"
            className="form-control mt-3"
            placeholder="Enter Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <button className="btn btn-success mt-3" onClick={calculateBMI}>
            Calculate BMI
          </button>

          <h3 className="mt-4">BMI : {bmi}</h3>

          <h4>Status : {status}</h4>
        </div>
      </div>
    </div>
  );
}

export default BMI;
