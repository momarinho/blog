import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const About = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          We are a company dedicated to creating amazing products and services.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
