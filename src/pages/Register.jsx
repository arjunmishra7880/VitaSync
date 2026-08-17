import { useState } from "react";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);

    alert("Registration Successful!");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mt-3"
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
          />

          <input
            className="form-control mt-3"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            className="form-control mt-3"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <button className="btn btn-success mt-3">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
