// Fixed coffeeshop.jsx
import React, { useState } from 'react';
import './CoffeeShop.css';
import WelcomePage from './WelcomePage';

const CoffeeShop = () => { // Make sure this matches the export
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showWelcome, setShowWelcome] = useState(true);

  const shopData = {
    name: "Brew Code Coffee",
    description: "Artisanal coffee crafted with passion since 2010",
    hours: {
      weekday: "6:00 AM - 9:00 PM",
      weekend: "7:00 AM - 10:00 PM"
    },
    location: {
      address: "Osmeña ave, estancia, kalibo, Aklan",
      phone: "(555) 123-4567",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    socialMedia: {
      instagram: "https://instagram.com/brewcode",
      facebook: "https://facebook.com/brewncode",
      twitter: "https://twitter.com/brewcode"
    },
    menu: [
      { name: "Espresso", price: "P.100", description: "Rich and bold" },
      { name: "Cappuccino", price: "P.100", description: "Perfect foam" },
      { name: "Cold Brew", price: "P.80", description: "Smooth and refreshing" },
      { name: "Latte", price: "P.100", description: "Creamy and delicious" }
    ]
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      console.log('Saving to database:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error('Database error:', error);
    }
  };

  const handleEnterShop = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomePage onEnter={handleEnterShop} shopData={shopData} />;
  }

  return (
    <div className="coffee-shop">
      <Header 
        shopName={shopData.name} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <main className="main-content">
        {activeTab === 'home' && <HomeTab shopData={shopData} />}
        {activeTab === 'menu' && <MenuTab menu={shopData.menu} />}
        {activeTab === 'location' && <LocationTab location={shopData.location} />}
        {activeTab === 'contact' && <ContactTab socialMedia={shopData.socialMedia} />}
      </main>

      <Newsletter 
        email={email}
        setEmail={setEmail}
        isSubscribed={isSubscribed}
        handleSubscribe={handleSubscribe}
      />
      
      <Footer shopData={shopData} />
    </div>
  );
};

// Add all the missing component definitions
const Header = ({ shopName, activeTab, setActiveTab }) => (
  <header className="header">
    <div className="container">
      <div className="logo">{shopName}</div>
      <nav className="nav">
        <button 
          className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          Home
        </button>
        <button 
          className={`nav-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button 
          className={`nav-btn ${activeTab === 'location' ? 'active' : ''}`}
          onClick={() => setActiveTab('location')}
        >
          Location
        </button>
        <button 
          className={`nav-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact
        </button>
      </nav>
    </div>
  </header>
);

const HomeTab = ({ shopData }) => (
  <section className="hero">
    <div className="hero-content">
      <h2>Welcome to {shopData.name}</h2>
      <p>{shopData.description}</p>
      <div className="hours">
        <h3>Opening Hours</h3>
        <p>Weekdays: {shopData.hours.weekday}</p>
        <p>Weekends: {shopData.hours.weekend}</p>
      </div>
    </div>
  </section>
);

const MenuTab = ({ menu }) => (
  <section className="menu-section">
    <div className="container">
      <h2>Our Menu</h2>
      <div className="menu-grid">
        {menu.map((item, index) => (
          <div key={index} className="menu-item">
            <h3>{item.name}</h3>
            <div className="price">{item.price}</div>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const LocationTab = ({ location }) => (
  <section className="location-section">
    <div className="container">
      <h2>Our Location</h2>
      <div className="location-content">
        <div className="location-info">
          <p><strong>Address:</strong> {location.address}</p>
          <p><strong>Phone:</strong> {location.phone}</p>
          <p><strong>Hours:</strong> Mon-Fri 6AM-9PM, Sat-Sun 7AM-10PM</p>
        </div>
        <div className="map-placeholder">
          <h3>Map Location</h3>
          <p>📍 {location.address}</p>
          <p>Interactive map would be embedded here</p>
        </div>
      </div>
    </div>
  </section>
);

const ContactTab = ({ socialMedia }) => (
  <section className="contact-section">
    <div className="container">
      <h2>Connect With Us</h2>
      <div className="social-links">
        <a href={socialMedia.instagram} className="social-link" target="_blank" rel="noopener noreferrer">
          <span>📷</span> Instagram
        </a>
        <a href={socialMedia.facebook} className="social-link" target="_blank" rel="noopener noreferrer">
          <span>👥</span> Facebook
        </a>
        <a href={socialMedia.twitter} className="social-link" target="_blank" rel="noopener noreferrer">
          <span>🐦</span> Twitter
        </a>
      </div>
    </div>
  </section>
);

const Newsletter = ({ email, setEmail, isSubscribed, handleSubscribe }) => (
  <section className="newsletter">
    <div className="container">
      <h3>Subscribe to Our Newsletter</h3>
      <form className="newsletter-form" onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {isSubscribed && (
        <div className="success-message">
          Thank you for subscribing!
        </div>
      )}
    </div>
  </section>
);

const Footer = ({ shopData }) => (
  <footer className="footer">
    <div className="container">
      <p>&copy; 2024 {shopData.name}. All rights reserved.</p>
      <p>{shopData.location.address} | {shopData.location.phone}</p>
    </div>
  </footer>
);

// Make sure this line is at the very end
export default CoffeeShop;