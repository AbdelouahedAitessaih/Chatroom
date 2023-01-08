import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import React, { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  const verifyUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/verifyuser", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyUser();
  }, [])
  

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:room_id/:room_name" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
