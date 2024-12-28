import React, { useState } from "react";
import "../styles/Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaBook, FaLink, FaEnvelope, FaPhone, FaChevronUp, FaChevronDown } from "react-icons/fa";

const Footer = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleFooter = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <footer className={`footer ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="footer-toggle-button" onClick={toggleFooter}>
        {isCollapsed ? <><FaChevronDown /> Mostrar más</> : <><FaChevronUp /> Mostrar menos</>}
      </button>
      <div className="footer-container">
        <div className={`footer-section ${!isCollapsed ? 'expanded' : 'collapsed'}`}>
          <h3 onClick={toggleFooter}>Recursos</h3>
          <ul className="resources-links">
            <li>
              <a
                href="https://www.wikidex.net/wiki/WikiDex"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaBook /> Aprende más sobre Pokémon
              </a>
            </li>
            <li>
              <a
                href="https://pokeapi.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaLink /> PokéAPI
              </a>
            </li>
            <li>
              <a
                href="https://www.pokemon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaLink /> El Pokémon oficial
              </a>
            </li>
          </ul>
        </div>
        <div className={`footer-section ${!isCollapsed ? 'expanded' : 'collapsed'}`}>
          <h3 onClick={toggleFooter}>Síguenos</h3>
          <ul className="social-links">
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaFacebook /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaTwitter /> Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaInstagram /> Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className={`footer-section ${!isCollapsed ? 'expanded' : 'collapsed'}`}>
          <h3 onClick={toggleFooter}>Contacto</h3>
          <p><FaEnvelope /> contacto@lospokemones.com</p>
          <p><FaPhone /> +598 1234 5678</p>
          <p><FaPhone /> +598 8765 4321</p>
        </div>
      </div>
      <div className="copyright">
        &copy; {new Date().getFullYear()} Los Pokemones. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
