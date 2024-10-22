import React from 'react';

function About() {
  return (
    <div className="container mt-5">
      <h1 className="text-center">About Us</h1>
      <p className="lead text-center">
        We are committed to providing the best logistics solutions for transporting goods efficiently and reliably.
      </p>

      <div className="mt-5">
        <h2 className="text-center">Our Mission</h2>
        <p className="lead text-center">
          Our mission is to connect users with trusted drivers, making logistics easy and accessible for everyone. We aim to 
          revolutionize the transportation industry through innovative technology and exceptional customer service.
        </p>
      </div>

      <div className="mt-5">
        <h2 className="text-center">Our Vision</h2>
        <p className="lead text-center">
          We envision a world where goods can be transported seamlessly and efficiently, empowering businesses and individuals 
          with reliable logistics solutions.
        </p>
      </div>

      <div className="mt-5">
        <h2 className="text-center">Our Values</h2>
        <ul className="list-unstyled lead text-center">
          <li><strong>Integrity:</strong> We operate with honesty and transparency in everything we do.</li>
          <li><strong>Innovation:</strong> We embrace technology and constantly seek better solutions.</li>
          <li><strong>Customer Focus:</strong> Our customers are at the heart of our business and app.</li>
          <li><strong>Collaboration:</strong> We believe in working together to achieve common goals.</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
