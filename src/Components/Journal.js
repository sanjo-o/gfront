import React from 'react';
import '../CSS/Journal.css';

function Journal() {
    return (
      <div className="journal">
        <div className="header">
          <PandaHead />
          <Heart />
        </div>
        <div className="content">
          <TextSection />
          <BowList />
          <DayInfo />
        </div>
      </div>
    );
  }
  
  function PandaHead() {
    return <div className="panda-head"> {/* Panda толгойн дүрслэл */} </div>;
  }
  
  function Heart() {
    return <div className="heart"> {/* Зүрхний дүрслэл */} </div>;
  }
  
  function TextSection() {
    return <div className="text-section"> {/* Текст хэсгийн дүрслэл */} </div>;
  }
  
  function BowList() {
    return (
      <div className="bow-list">
        <Bow />
        <Bow />
        {/* ... бусад нумууд */}
      </div>
    );
  }
  
  function Bow() {
    return <div className="bow"> {/* Нумын дүрслэл */} </div>;
  }
  
  function DayInfo() {
    return (
      <div className="day-info">
        <DayItem day="30 Ня" />
        <DayItem day="31 Да" />
        <DayItem day="01 Мя" />
      </div>
    );
  }
  
  function DayItem({ day }) {
    return (
      <div className="day-item">
        {day}
        <Star />
        {/* ... бусад мэдээлэл */}
      </div>
    );
  }
  
  function Star() {
    return <div className="star"> {/* Одонгийн дүрслэл */} </div>;
  }

export default Journal;