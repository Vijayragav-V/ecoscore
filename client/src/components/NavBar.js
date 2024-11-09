import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/logo.png"
const Navbar = () => {
  const [isOpen, setNavOpen] = useState(false);

  const handleNav = () => {
    setNavOpen(!isOpen);
  };

  const closeNav = () => {
    setNavOpen(false);
  };

  const navigationItems = [
    { label: "Articles", path: "/articles" },
    { label: "About", path: "/about" },
  ];

  return (
    <div className="shadow-lg fixed w-full top-0 backdrop-filter backdrop-blur-xl bg-gray-500/30 z-50 font-nunito">
      <div className="flex justify-between items-center h-[8vh] max-w-7xl mx-auto px-4 text-white">
        <Link to="/" className="flex items-center text-4xl font-bold px-4">
          <img
            src={logo}
            alt="Logo"
            width="90"
            height="90"
          />
          EcoScore
        </Link>
        <ul className="hidden lg:flex justify-center lg:text-xl space-x-8">
          {navigationItems.map((item) => (
            <li
              key={item.label}
              className="hover:scale-110 font-bold transition-transform duration-300"
            >
              <Link to={item.path} onClick={closeNav}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="block lg:hidden" onClick={handleNav}>
          {isOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
        <ul
          className={`absolute left-0 top-[8vh] w-full  backdrop-filter backdrop-blur-2xl bg-opacity-50 shadow-xl ease-in-out z-50 duration-500 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {navigationItems.map((item) => (
            <li key={item.label} className="text-center text-lg font-bold py-4">
              <Link to={item.path} onClick={closeNav}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
