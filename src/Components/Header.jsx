// components/Header.jsx
import React from "react";
import { Logo } from '../assets/index'

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-start">
        {/* Replace with your logo */}
        <img
          src={Logo}
          alt="Logo"
          className="h-12 w-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
