import React from 'react';
import './WelcomePage.css';

const WelcomePage = ({ onEnter, shopData }) => {
  return (
    <div className="welcome-page">
      <div className="welcome-overlay">
        <div className="welcome-logo">
          <div className="coffee-icon">☕</div>
          <h1>{shopData.name}</h1>
        </div>
        
        <p className="welcome-tagline">{shopData.description}</p>
        
        <div className="welcome-features">
          <div className="feature">
            <span className="feature-icon">🌱</span>
            <span>Organic</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔥</span>
            <span>Fresh Roasted</span>
          </div>
          <div className="feature">
            <span className="feature-icon">👨‍🍳</span>
            <span>Artisanal</span>
          </div>
        </div>
        
        <button className="enter-btn" onClick={onEnter}>
          Enter Coffee Shop
        </button>
        
        <div className="welcome-hours">
          <h3>Opening Hours</h3>
          <p>Weekdays: {shopData.hours.weekday}</p>
          <p>Weekends: {shopData.hours.weekend}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;