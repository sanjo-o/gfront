import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Header.css';
import logo from "../Picture/logo.png";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/nevtreh");
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Момоками</h1>
      </div>
      <nav className="navigation">
        <Link to="/">Нүүр</Link>
        <Link to="/animalselector">Тохиргоо</Link>
        <Link to="/about">Бидний тухай</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/nevtreh">Нэвтрэх</Link>
            <Link to="/bvrtguleh">Бүртгүүлэх</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-btn" title="Гарах">
            🚪
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
