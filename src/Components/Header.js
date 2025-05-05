// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Header.css';
import logo from "../Picture/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Момоками</h1>
      </div>
      <nav className="navigation">
        <Link to="/">Нүүр</Link>
        <Link to="/nevtreh">Нэвтрэх</Link>
        <Link to="/bvrtguleh">Бүртгүүлэх</Link>
        <Link to="/animalselector">Тохиргоо</Link>
        <Link to="/about">Бидний тухай</Link>
      </nav>
    </header>
  );
}

export default Header;
