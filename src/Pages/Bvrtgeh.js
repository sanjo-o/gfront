import React, { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../Picture/background.png";
import Header from "../Components/Header";
import "../CSS/Auth.css";
import { registerUser } from "../api/user";

const Bvrtgeh = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Түр хүлээнэ үү...");

    const result = await registerUser(formData);

    if (result.error) {
      setMessage(`❌ Бүртгэл амжилтгүй: ${result.error}`);
    } else {
      setMessage("✅ Бүртгэл амжилттай! Та нэвтэрч болно.");
      setFormData({ email: "", username: "", password: "" });
    }
  };

  return (
    <>
      <Header />
      <div
        className="auth-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="form-box">
          <h1 className="title">Бүртгүүлэх</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="username"
                className="input"
                value={formData.username}
                onChange={handleChange}
                placeholder="Хэрэглэгчийн нэр"
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
            <button type="submit" className="submit-btn">Бүртгүүлэх</button>
          </form>

          {message && <p className="status-text">{message}</p>}

          <p className="login-text">Хэрэв та бүртгүүлсэн хэрэглэгч бол</p>
          <p className="login-link-wrapper">
            <Link to="/nevtreh" className="login-link">Нэвтрэх</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Bvrtgeh;
