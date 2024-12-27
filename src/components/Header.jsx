import React from 'react';
import "../styles/Header.css";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ user, handleLogout }) => (
  <header className="header">
    <div className="header-container">
      <h1 className="header-title">Los Pokemones</h1>
      <nav className="header-nav">
        <ul>
          {user ? (
            <>
              <li className="welcome-message">
                ¡Bienvenido, <span>{user.email.split("@")[0]}</span>!
              </li>
              <li>
                <button onClick={handleLogout} className="logout-link">
                  Cerrar Sesión <FaSignOutAlt />
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="login-link">
                Iniciar Sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
