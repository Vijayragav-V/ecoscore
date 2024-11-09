import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, checkAuth } from "../services/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(formData.email, formData.password).then((data) => {
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      }
    });
  };

  const handleClosePopup = () => {
    setErrorMessage("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      checkAuth(token).then((data) => {
        if (!data.error) {
          navigate("/profile");
        }
      });
    }
  }, [navigate]);
  
  return (
    <>
      <form
        className="w-full max-w-md p-8 backdrop-filter backdrop-blur-xl bg-gray-400/30 rounded-lg shadow-lg text-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
            minLength={6} // Basic password length validation
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white font-semibold bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>

      {errorMessage && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
            <p className="text-red-500 font-semibold mb-4 text-center">
              {errorMessage}
            </p>
            <button
              onClick={handleClosePopup}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
