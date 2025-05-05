import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; 
import backgroundImage from "../Picture/background.png"; 
import Header from "../Components/Header";

const Bvrtgeh = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  // Input өөрчлөгдөхөд хадгалах
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Форм илгээх үед ажиллах функц
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Бүртгүүлэх өгөгдөл:", formData);
    // Энд backend API руу илгээх код бичиж болно
  };

  return (
    <>
      <Header /> {/* Header нэмсэн */}
      <div
        className="container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <div className="form-box">
          <h1 className="title">Бүртгүүлэх</h1>
          <form onSubmit={handleSubmit}> {/* Form submit event нэмсэн */}
            <div className="input-group pink-bg">
              <input
                type="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="input-group pink-bg">
              <input
                type="text"
                name="username"
                className="input"
                value={formData.username}
                onChange={handleChange}
                placeholder="Хэрэглэгчийн нэр"
              />
            </div>
            <div className="input-group pink-bg">
              <input
                type="password"
                name="password"
                className="input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Нууц үг"
              />
            </div>
            <button type="submit" className="submit-btn">Бүртгүүлэх</button>
          </form>

          <p className="login-text">Хэрэв та бүртгүүлсэн хэрэглэгч бол</p>
          <p className="login-link-wrapper">
            <Link to="/nevtreh" className="login-link">Нэвтэрч орно уу</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Bvrtgeh;

