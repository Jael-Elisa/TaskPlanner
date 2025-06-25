import React, { useState } from "react";
import "./Login.css";

const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:8000/login.php", { // Cambia el puerto si usas otro
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { status: "error", message: "No se pudo conectar con el servidor." };
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  console.log("Enviando:", { email, password });

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(email, password);
    setMessage(response.message);

    if (response.status === "success") {
      localStorage.setItem("user", JSON.stringify(response.user));
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Sección izquierda: Formulario */}
        <div className="login-left">
          <h2 className="login-title">Inicio de Sesión</h2>
          <form onSubmit={handleLogin}>
            <label className="login-label">Correo</label>
            <input
              type="email"
              className="login-input"
              placeholder="Escribe tu correo"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="login-label">Clave</label>
            <input
              type="password"
              className="login-input"
              placeholder="Ingresa tu clave"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="login-button">
              Ingresar
            </button>
          </form>
          <p className="login-message">{message}</p>
        </div>

        {/* Sección derecha: Bienvenida + Frase motivacional */}
        <div className="login-right">
          <h2 className="welcome-title">Hola, bienvenido de nuevo</h2>
          <p className="welcome-message">
            "Cada día es una nueva oportunidad para aprender y crecer. ¡Hoy es tu día!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
