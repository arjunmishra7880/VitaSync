import { useState } from "react";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(login);

    alert("Login Successful");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="form-control mt-3"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            className="form-control mt-3"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <button className="btn btn-success mt-3">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
