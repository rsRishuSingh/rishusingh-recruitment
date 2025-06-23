import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import AuthProvider from './context/auth/AuthProvider';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ShareLinkPage from './pages/ShareLinkPage';
import StudentDetailPage from './pages/StudentDetailPage';

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
