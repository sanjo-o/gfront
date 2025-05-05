import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import backgroundImage from "../Picture/background.png";
import Header from "../Components/Header";

const Nevtreh = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  // Input өөрчлөгдөх үед хадгалах
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Форм submit хийх функц
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Нэвтрэх өгөгдөл:", formData);
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
        }}
      >
        <div className="form-box">
          <h1 className="title">Нэвтрэх</h1>
          <form onSubmit={handleSubmit}> {/* Form submit event нэмсэн */}
            <div className="input-group pink-bg">
              <input
                type="text"
                name="emailOrUsername"
                className="input"
                value={formData.emailOrUsername}
                onChange={handleChange}
                placeholder="Email эсвэл хэрэглэгчийн нэр"
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
            <button type="submit" className="submit-btn">Нэвтрэх</button>
          </form>

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
