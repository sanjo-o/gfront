import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import TieWheel from '../Components/TieWheel';
import DiarySlider from '../Components/DiarySlider';
import '../CSS/Home.css';
import Panda from '../assets/PANDA.png';
import Heart from '../assets/HEART.png';
import PandaHappy from '../assets/PANDA.png';
import PandaSad from '../assets/PANDA.png';

const mongolianImages = [
  require('../assets/mongolbichig/script1.png'),
];

const menuItems = [
  {
    text: "7 хоног тутмын төлөвлөгөө",
    link: "/weekly-plan"
  },
  {
    text: "Сар тутмын төлөвлөгөө",
    link: "/monthly-plan"
  },
  {
    text: "Календар",
    link: "/calendar"
  },
  {
    text: "Хувийн тэмдэглэл",
    link: "/personal-notes"
  }
];

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/nevtreh");
    }
  }, [navigate]);

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  const [currentDay, setCurrentDay] = useState(today.getDate() - 1);
  const [health, setHealth] = useState(60);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(Date.now());
  const [showHearts, setShowHearts] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const shuffleImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mongolianImages.length);
  };

  const handleNext = () => {
    setCurrentDay((prev) => (prev >= daysInMonth - 1 ? prev : prev + 1));
  };

  const handlePrev = () => {
    setCurrentDay((prev) => (prev <= 0 ? prev : prev - 1));
  };

  const handlePandaClick = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;

    if (timeSinceLastClick > 5000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }

    setLastClickTime(now);

    const healthIncrease = Math.max(5 - Math.floor(clickCount / 3), 1);
    setHealth(prev => Math.min(prev + healthIncrease, 100));

    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 1000);

    if (health > 20) {
      const decreaseInterval = setInterval(() => {
        setHealth(prev => Math.max(prev - 1, 0));
      }, 30000);
      return () => clearInterval(decreaseInterval);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
    shuffleImage();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsBottomVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsBottomVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="home-wrapper">
      <Header />
      <div className="main-section">
        <button
          className={`sidebar-toggle ${!isSidebarVisible ? 'sidebar-hidden' : ''}`}
          onClick={toggleSidebar}
        >
          <img
            src={isSidebarVisible ? PandaHappy : PandaSad}
            alt="Toggle Panda"
            className="toggle-panda-icon"
          />
        </button>

        <div className={`left-panel ${!isSidebarVisible ? 'hidden' : ''}`}>
          <div className="panda-fur-patch"></div>
          <div className="panda-fur-patch"></div>

          <div className={`panda-container ${showHearts ? 'show-hearts' : ''}`}>
            <img
              src={Panda}
              alt="Panda"
              className="panda-img"
              onClick={handlePandaClick}
            />
            {showHearts && (
              <div className="floating-hearts">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="heart" style={{ animationDelay: `${i * 0.2}s` }}>❤️</div>
                ))}
              </div>
            )}
          </div>

          <div className="heart-progress">
            <img src={Heart} alt="Heart" className="heart-icon" />
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${health}%` }} />
              <div className="progress-text">{health}%</div>
            </div>
          </div>

          <div className="side-text-container" onClick={shuffleImage}>
            <img
              src={mongolianImages[currentImageIndex]}
              alt="Mongolian Script"
              className="mongolian-text-image"
            />
          </div>

          <h2 className="journal-title">journal</h2>
          <div className="bamboo-decoration"></div>
        </div>

        <div className={`diary-slider-container ${!isSidebarVisible ? 'expanded' : ''}`}>
          <div className="page-indicator">
            {String(currentDay + 1).padStart(2, '0')}
          </div>
          <DiarySlider index={currentDay} />
          <TieWheel onNext={handleNext} onPrev={handlePrev} />
        </div>

        <div className={`bottom-section ${isBottomVisible ? 'visible' : ''}`}>
          <div className="menu-container">
            {menuItems.map((item, index) => (
              <Link to={item.link} key={index} className="menu-item">
                <div className="menu-icon"><div className="pink-square" /></div>
                <span className="menu-text">{item.text}</span>
              </Link>
            ))}
          </div>

          <div className="student-info">
            <h3 className="info-title">Бидний тухай</h3>
            <div className="info-grid">
              <div className="student-card">
                <h4 className="student-name">Сарантуяа</h4>
                <div className="info-row"><span className="info-label">Код</span><span className="info-value">B231890012</span></div>
                <div className="info-row"><span className="info-label">Хөтөлбөр</span><span className="info-value">Өгөгдлийн ухаан</span></div>
                <div className="info-row"><span className="info-label">Курс</span><span className="info-value">2-р курс</span></div>
              </div>
              <div className="student-card">
                <h4 className="student-name">Энхгэрэл</h4>
                <div className="info-row"><span className="info-label">Код</span><span className="info-value">B231890039</span></div>
                <div className="info-row"><span className="info-label">Хөтөлбөр</span><span className="info-value">Өгөгдлийн ухаан</span></div>
                <div className="info-row"><span className="info-label">Курс</span><span className="info-value">2-р курс</span></div>
              </div>
              <div className="student-card">
                <h4 className="student-name">Амина</h4>
                <div className="info-row"><span className="info-label">Код</span><span className="info-value">B231890008</span></div>
                <div className="info-row"><span className="info-label">Хөтөлбөр</span><span className="info-value">Өгөгдлийн ухаан</span></div>
                <div className="info-row"><span className="info-label">Курс</span><span className="info-value">2-р курс</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
