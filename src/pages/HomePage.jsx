import { useEffect, useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import profileImage from '../assets/Profile_Photo.jpg';

/**
 * HomePage Component
 * - Retrieves `username` and `role` from localStorage
 * - Displays a frosted-glass card with a profile image and welcome text
 */
export default function HomePage() {
  // Retrieve stored username and define user role
  const username = localStorage.getItem('user');
  const role = 'Admin';

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-300
        p-4 sm:p-6 lg:p-12
      "
    >
      {/* Card container with frosted-glass effect */}
      <div
        className="
          w-full max-w-sm sm:max-w-md md:max-w-lg
          bg-white bg-opacity-20 backdrop-blur-md rounded-3xl shadow-2xl
          p-6 sm:p-8 lg:p-12 text-center
        "
      >
        {/* Halo around profile image */}
        <div
          className="
            inline-block p-1.5 sm:p-2 rounded-full
            bg-gradient-to-tr from-white/50 to-white/10 mb-6
          "
        >
          {/* Profile image */}
          <img
            src={profileImage}
            alt="Profile"
            className="
              w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
              rounded-full ring-4 ring-white shadow-lg object-cover
            "
          />
        </div>

        {/* Greeting message */}
        <h1
          className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-bold text-black mb-3
          "
        >
          Welcome,{' '}
          <span className="underline decoration-white/70">
            {username}
          </span>
          !
        </h1>

        {/* User role display */}
        <p className="text-black text-base sm:text-lg md:text-xl">
          Role: <span className="font-semibold">{role}</span>
        </p>
      </div>
    </div>
  );
}
