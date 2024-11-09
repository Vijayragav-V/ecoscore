import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import heroBG from "../assets/heroBG.png";

const SignUp = () => {
    const backgroundImageStyle = {
        backgroundImage: `url(${heroBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    transportationMiles: 0,
    vehicleType: "electric",
    energyConsumption: 0,
    dietType: "plant-based",
    flyingFrequency: 0,
    recycling: false,
  });

  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmitBasic = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitLifestyle = async (e) => {
    e.preventDefault();

    const { username, email, password, ...lifestyleData } = formData;

    const data = await registerUser(username, email, password, lifestyleData);
    
    if (data.error) {
      setErrorMessage(data.error);
    } else {
      localStorage.setItem("token", data.token);
      navigate("/profile");
    }
  };

  const handleClosePopup = () => {
    setErrorMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={backgroundImageStyle}>
      <form
        className="w-full max-w-md p-8 m-24  backdrop-filter backdrop-blur-xl bg-gray-400/30  rounded-lg shadow-lg text-white"
        onSubmit={step === 1 ? handleSubmitBasic : handleSubmitLifestyle}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">{step === 1 ? "Register" : "Complete Your Profile"}</h2>

        {step === 1 && (
          <>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">Username</label>
              <input
                type="text"
                name="username"
                maxLength={20}
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">Email</label>
              <input
                type="email"
                name="email"
                maxLength={50}
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-white">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white font-semibold bg-blue-500 rounded-lg hover:bg- transition duration-300"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">Transportation Miles</label>
              <input
                type="number"
                name="transportationMiles"
                value={formData.transportationMiles}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="gasoline">Gasoline</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
                <option value="public_transport">Public Transport</option>
                <option value="none">None</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">Energy Consumption (kWh)</label>
              <input
                type="number"
                name="energyConsumption"
                value={formData.energyConsumption}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">Diet Type</label>
              <select
                name="dietType"
                value={formData.dietType}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="meat-based">Meat-based</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-white">Flying Frequency (flights per year)</label>
              <input
                type="number"
                name="flyingFrequency"
                value={formData.flyingFrequency}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div className="mb-4 flex items-center">
              <label className="mr-2 text-sm font-bold text-white">Do you recycle?</label>
              <input
                type="checkbox"
                name="recycling"
                checked={formData.recycling}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white font-semibold bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Sign Up
            </button>
          </>
        )}
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
    </div>
  );
};

export default SignUp;
