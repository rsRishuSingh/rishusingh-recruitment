import { useEffect, useContext } from 'react';
import AuthContext from '../context/auth/AuthContext'
import profileImage from '../assets/Profile_Photo.jpg';
/**
 * HomePage Component
 * - Retrieves `username` and `role` from localStorage
 * - Displays them centered with a circular demo profile image
 */
export default function HomePage() {
  const username = localStorage.getItem('user')
  const role = 'Admin';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <img
          src={profileImage}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-indigo-600 mb-4"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Welcome, {username}!
        </h1>
        <p className="text-gray-600">Role: <span className="font-medium">{role}</span></p>
      </div>
    </div>
  );
}
