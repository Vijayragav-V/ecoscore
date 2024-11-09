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
    { label: "Donate", path: "https://donate.edf.org/campaign/630859/donate?addl_info=/splash/takeover-homepage-eoy-2024&ut_sid=4358bda2-9c69-40ef-b28d-743dac590562&ut_pid=71f81ffb-9081-4079-9f3d-5c524e0f36a2&conversion_pg=www.edf.org%2F&landing_pg=www.edf.org%2F&landing_pg_1st_visit=www.edf.org%2F&source_1st_visit=www.google.com&subsource_1st_visit=%2F&custom_source=www.google.com&custom_sub_source=%2F&custom_transfer=1731186179581"}
  ];

  return (
    <div className="shadow-lg fixed w-full top-0 backdrop-filter backdrop-blur-xl bg-gray-500/30 z-50 font-nunito">
      <div className="flex justify-between items-center h-[8vh] w-[80%] mx-auto text-white">
        <Link to="/" className="flex items-center text-4xl font-bold px-4">
          <img
            src={logo}
            alt="Logo"
            width="90"
            height="90"
          />
          EcoScore
        </Link>
        <ul className="hidden lg:flex justify-center lg:text-xl space-x-16">
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
