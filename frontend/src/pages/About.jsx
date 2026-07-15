import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '50px',
    background: '#18181b',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    textAlign: 'center'
  };

  const featureStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    background: '#27272a',
    borderRadius: '12px',
    flex: '1 1 250px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: '2.8rem', marginBottom: '15px', color: '#fff' }}>About <span style={{ color: '#f97316' }}>Blync</span></h2>
      <h3 style={{ fontSize: '1.2rem', color: '#a1a1aa', marginBottom: '30px', fontWeight: 'normal' }}>
        Your Premier Destination for Modern E-Commerce
      </h3>

      <p style={{ color: '#d4d4d8', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 40px auto' }}>
        Welcome to Blync, a state-of-the-art online shopping platform designed to deliver a seamless, secure, and lightning-fast retail experience. Whether you're hunting for the latest electronics, stylish apparel, or everyday essentials, Blync connects you to premium products at unbeatable prices.
      </p>

      <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '20px' }}>What Drives Us</h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        
        <div style={featureStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🚀</div>
          <h4 style={{ color: '#f97316', marginBottom: '10px' }}>Blazing Fast</h4>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>Built on cutting-edge web technologies to ensure your shopping experience is instant and fluid.</p>
        </div>

        <div style={featureStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔒</div>
          <h4 style={{ color: '#f97316', marginBottom: '10px' }}>Secure Checkout</h4>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>Integrated with enterprise-grade payment gateways to keep your financial data strictly confidential.</p>
        </div>

        <div style={featureStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✨</div>
          <h4 style={{ color: '#f97316', marginBottom: '10px' }}>Curated Quality</h4>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6' }}>Every item in our catalog is carefully selected to ensure you only receive top-tier merchandise.</p>
        </div>

      </div>

      <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <p style={{ color: '#71717a', fontSize: '0.9rem' }}>
          Blync is built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Stripe.
        </p>
      </div>
    </div>
  );
};

export default About;
