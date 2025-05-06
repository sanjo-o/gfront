import React, { useRef } from "react";
import DiarySlider from "./DiarySlider";
import '../CSS/HomePage.css'; // or HomePage.css if you named it that
import TieWheel from './TieWheel';


const HomePage = () => {
  const sliderRef = useRef(null);

  const handleWheel = (e) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += e.deltaY > 0 ? 100 : -100;
    }
  };

  return (
    <div className="home-page">
      <h1 className="home-title">Момоками Journal</h1>
      <TieWheel onScroll={handleWheel} />
      <DiarySlider ref={sliderRef} />
    </div>
  );
};

export default HomePage;
