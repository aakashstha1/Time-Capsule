import React from "react";

function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white/80 backdrop-blur-sm py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-2">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold tracking-tight text-purple-600">
            Time Capsule
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center">
          Designed By Aakash Shrestha
          <br />
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
