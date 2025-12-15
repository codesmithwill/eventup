import { useState } from "react";
import { mockAuth } from "../services/authService";
import logo from "../imgs/logo_nbg.png";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/layout/HeroSection";
import { Link } from "react-router-dom";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      await mockAuth.signIn(email, password);
      window.location.href = "/";
    } catch (error) {
      setError(error.message || "Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <HeroSection />

      <div className="login-form-wrapper">
        <img src={logo} alt="Logo EventUp" className="login-logo" />

        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-input-group">
              <label htmlFor="email"></label>
              <input
                className="form-input"
                type="text"
                id="email"
                value={email}
                placeholder="Nome de Usuário ou E-mail"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-password-wrapper">
              <label htmlFor="password"></label>
              <input
                className={`form-password ${
                  password.length > 0 && password.length < 6 ? "invalid" : ""
                }`}
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoIosEyeOff className="cursor-pointer" />
                ) : (
                  <IoMdEye className="cursor-pointer" />
                )}
              </button>
            </div>

            <div className="form-links">
              <a className="form-link" href="">
                <p>Esqueceu sua Senha?</p>
              </a>

              <Link className="form-link" to="/register">
                Cadastrar-se
              </Link>
            </div>

            <div className="form-submit-group">
              <button
                type="submit"
                className="form-submit-btn"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
              {error && <span className="form-error">{error}</span>}
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
}
