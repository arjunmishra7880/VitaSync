import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BMI from "./pages/BMI";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Food from "./pages/Food";
import Exercise from "./pages/Exercise";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/food" element={<Food />} />
        <Route path="/exercise" element={<Exercise />} />
      </Routes>
    </>
  );
}

export default App;
