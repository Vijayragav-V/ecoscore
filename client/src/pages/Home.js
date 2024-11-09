import React, { useState, useEffect } from "react";
import heroBG from "../assets/heroBG.png";
import { FaArrowDown } from "react-icons/fa";
import LoginForm from "../components/LoginForm";

const Home = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${heroBG})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };


  return (
    <div className="relative h-screen font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 h-full" style={backgroundImageStyle}>
        {/* Content */}
        <div className="flex flex-col h-full justify-center items-center text-white px-4 md:px-16 lg:px-32">
          {/* Logo and Heading */}
          <div className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-16">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4">
                EcoScore
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-extralight">
                The environment-based website that educates users about carbon
                emissions and sustainability, offering an EcoScore feature to
                track and improve their environmental impact through
                eco-friendly activities.
              </p>
            </div>
            <div className="lg:w-1/2 mt-8 lg:mt-0 flex flex-col justify-center items-center">
              <LoginForm />
              {/* Sign Up Link */}
              <div className="mt-4 text-start lg:text-left">
                <p className="text-white text-sm">
                  No account?{" "}
                  <a href="/signup" className="text-blue-500 hover:underline">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
