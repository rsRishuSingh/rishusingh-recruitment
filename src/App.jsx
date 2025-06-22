// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import SharePage from './components/SharePage';
import TablePage from './components/TablePage';
// import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';

export default function App() {
  return (
 <>
 
 <Navbar />

<HomePage/>

</>

  );
}
