// src/App.jsx
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import ShareLinkPage from './components/ShareLinkPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './context/auth/AuthProvider';
import HomePage from './components/HomePage';
import StudentDetailPage from './components/StudentDetailPage';

export default function App() {
  return (


  <BrowserRouter>

    <AuthProvider>

      <Navbar />
      
      <Routes>

        {/* Public login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin-only: Generate/Manage links */}
        <Route
          path="/sharelink"
          element={
            <ProtectedRoute>
              <ShareLinkPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
  />

        {/* Public share page: token in URL */}
        <Route path="/:shareToken" element={<StudentDetailPage/>} />
        {/* Fallback: if someone hits “/” redirect to login or home */}
       
      </Routes>

    </AuthProvider>
  </BrowserRouter>


  );
}
