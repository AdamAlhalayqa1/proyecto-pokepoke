import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { auth } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Manejo de estado de carga
  const navigate = useNavigate(); // Para redirigir al usuario después del login

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validación de formato de correo
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingresa un correo válido.");
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Inicio de sesión exitoso. Redirigiendo...");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/"), 2000); // Redirige después de 2 segundos
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado. Verifica tu correo.");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta. Inténtalo de nuevo.");
      } else {
        setError("Ocurrió un error: Usuario o Contraseña incorrectos");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Correo</label>
        <input
          type="email"
          id="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Mensajes de error y éxito */}
        {error && (
          <p className="error-message" aria-live="polite">
            {error}
          </p>
        )}
        {success && (
          <p className="success-message" aria-live="polite">
            {success}
          </p>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
