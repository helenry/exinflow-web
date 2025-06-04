// pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
