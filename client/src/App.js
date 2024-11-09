import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css"
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Articles from "./pages/Articles";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Actions from "./pages/Actions";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/actions" element={<Actions />} />
      </Routes>
    </Router>
  );
}

export default App;
