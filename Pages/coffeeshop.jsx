import React, { useState } from 'react';
import './CoffeeShop.css';

const CoffeeShop = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState('CoffeeShop');

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
    // Simulate database call
    try {
      console.log('Saving to database:', email);
      // In a real app: await saveToDatabase({ email, timestamp: new Date() });
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error('Database error:', error);
    }
  };

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

const Header = ({ shopName, activeTab, setActiveTab }) => (
  <header className="header">
    <div className="container">
      <h1 className="logo">{shopName}</h1>
      <nav className="nav">
        {['home', 'menu', 'location', 'contact'].map(tab => (
          <button
            key={tab}
            className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
    </div>
  </header>
);

const HomeTab = ({ shopData }) => (
  <section className="hero">
    <div className="container">
      <div className="hero-content">
        <h2>Welcome to {shopData.name}</h2>
        <p>{shopData.description}</p>
        <div className="hours">
          <h3>Hours</h3>
          <p>Weekdays: {shopData.hours.weekday}</p>
          <p>Weekends: {shopData.hours.weekend}</p>
        </div>
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
            <p className="price">{item.price}</p>
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
      <h2>Visit Us</h2>
      <div className="location-content">
        <div className="location-info">
          <p><strong>Address:</strong> {location.address}</p>
          <p><strong>Phone:</strong> {location.phone}</p>
        </div>
        <div className="map-placeholder">
          <p>📍 Map would be integrated here</p>
          <p>Coordinates: {location.coordinates.lat}, {location.coordinates.lng}</p>
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
        <a href={socialMedia.instagram} className="social-link">
          <i className="fab fa-instagram"></i> Instagram
        </a>
        <a href={socialMedia.facebook} className="social-link">
          <i className="fab fa-facebook"></i> Facebook
        </a>
        <a href={socialMedia.twitter} className="social-link">
          <i className="fab fa-twitter"></i> Twitter
        </a>
      </div>
    </div>
  </section>
);

const Newsletter = ({ email, setEmail, isSubscribed, handleSubscribe }) => (
  <section className="newsletter">
    <div className="container">
      <h3>Join Our Coffee Club</h3>
      <form onSubmit={handleSubscribe} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email for updates"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {isSubscribed && <p className="success-message">Thanks for subscribing!</p>}
    </div>
  </section>
);

const Footer = ({ shopData }) => (
  <footer className="footer">
    <div className="container">
      <p>&copy; 2024 {shopData.name}. All rights reserved.</p>
    </div>
  </footer>
);

export default CoffeeShop;