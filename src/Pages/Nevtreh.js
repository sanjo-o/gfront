import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../Picture/background.png";
import Header from "../Components/Header";
import "../CSS/Auth.css";
import { loginUser } from "../api/user";

const Nevtreh = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Түр хүлээнэ үү...");

    const loginBody = {
      email: formData.emailOrUsername,
      password: formData.password,
    };

    const result = await loginUser(loginBody);

    if (result.error) {
      setMessage(`❌ Нэвтрэхэд амжилтгүй: ${result.error}`);
    } else {
      setMessage("✅ Амжилттай нэвтэрлээ!");
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user)); // 👈 Save user
      setTimeout(() => navigate("/"), 1000);
    }
  };

  return (
    <>
      <Header />
      <div className="auth-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="form-box">
          <h1 className="title">Нэвтрэх</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="emailOrUsername"
                className="input"
                value={formData.emailOrUsername}
                onChange={handleChange}
                placeholder="Email эсвэл хэрэглэгчийн нэр"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                className="input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Нууц үг"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Нэвтрэх</button>
          </form>

          {message && <p className="status-text">{message}</p>}

          <p className="login-text">Хэрэв та бүртгүүлээгүй бол</p>
          <p className="login-link-wrapper">
            <Link to="/bvrtguleh" className="login-link">Бүртгүүлэх</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Nevtreh;
