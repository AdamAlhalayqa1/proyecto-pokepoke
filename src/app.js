import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BuscaPokemon from "./components/BuscaPokemon";
import Login from "src/components/login.jsx";
import Register from "./components/Register";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<BuscaPokemon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
