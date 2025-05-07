import React, { useState, useEffect, useRef } from 'react';
import '../CSS/TieWheel.css';

const TieWheel = ({ onNext, onPrev }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [lastTriggerTime, setLastTriggerTime] = useState(0);
  const [lastTriggeredRotation, setLastTriggeredRotation] = useState(0);
  const wheelRef = useRef(null);

  const getAngle = (e) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
  };

  const handleMouseDown = (e) => {
    if (!wheelRef.current) return;
    const angle = getAngle(e);
    setIsDragging(true);
    setStartAngle(angle);
    setCurrentAngle(rotation);
    setLastTriggeredRotation(rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !wheelRef.current) return;

    const angle = getAngle(e);
    const delta = angle - startAngle;
    const newRotation = currentAngle + delta;

    // Add debounce to prevent rapid triggers
    const now = Date.now();
    if (now - lastTriggerTime < 1000) {
      setRotation(newRotation);
      return;
    }

    // Calculate the total rotation since last trigger
    const totalRotationSinceLastTrigger = Math.abs(newRotation - lastTriggeredRotation);

    // Determine if we've made a significant rotation (22.5 degrees = 360/16)
    if (totalRotationSinceLastTrigger >= 22.5) {
      // Determine direction based on the shortest rotation path
      const rotationDiff = newRotation - lastTriggeredRotation;
      if (rotationDiff > 0) {
        onNext();
      } else {
        onPrev();
      }

      setLastTriggerTime(now);
      setLastTriggeredRotation(newRotation);
    }

    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    // Snap to nearest marker position (22.5 degrees = 360/16)
    const snapAngle = 22.5;
    const targetRotation = Math.round(rotation / snapAngle) * snapAngle;
    setRotation(targetRotation);
    setCurrentAngle(targetRotation);
    setLastTriggeredRotation(targetRotation);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      handleMouseMove(e);
    };

    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, currentAngle, startAngle, lastTriggerTime, lastTriggeredRotation]);

  return (
    <div
      ref={wheelRef}
      className="tie-wheel"
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div
        className="tie-dial"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className={`tie-icon ${i === 0 ? 'active' : ''}`}
            style={{
              transform: `rotate(${i * (360 / 16)}deg) translate(90px)`
            }}
          />
        ))}
      </div>
      <div className="dial-center" />
    </div>
  );
};

export default TieWheel;