import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { getWithExpiry } from '../utils/tokenStorage';

export default function Navbar() {
  const { check_session_validity, logout, showAlert } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const data = getWithExpiry('shareToken');
  const link = data?.token;

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Generate Link', to: '/sharelink' },
  ];

  const isLoggedIn = Boolean(check_session_validity());
  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
      showAlert({
        type: 'success',
        message: 'Logged out successfully',
        description: 'Local storage cleared',
      });
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold text-white">
            TNP Dev
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map(({ name, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={name}
                  to={to}
                  className={`px-4 py-2 rounded-full text-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-white text-indigo-600'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {name}
                </Link>
              );
            })}
  <Link
              to={link || '#'}
              className={`px-4 py-2 rounded-full text-lg font-medium transition-colors ${
                link
                  ? 'text-white hover:bg-white/20'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              aria-disabled={!link}
            >
              Student Details
            </Link>
            <button
              onClick={handleAuthAction}
              className="px-4 py-2 rounded-full text-lg font-medium text-white hover:bg-white/20 transition-colors"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>

          
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(o => !o)}
              className="p-2 rounded-md text-white hover:bg-white/20 transition-colors"
            >
              {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (absolute overlay) */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white rounded-b-2xl shadow-lg z-10">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map(({ name, to }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={name}
                  to={to}
                  className={`block px-4 py-2 rounded-full text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'text-gray-800 hover:bg-indigo-50'
                  }`}
                >
                  {name}
                </Link>
              );
            })}
<Link
              to={link || '#'}
              className={`block px-4 py-2 rounded-full text-base font-medium transition-colors ${
                link
                  ? 'text-gray-800 hover:bg-indigo-50'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              aria-disabled={!link}
            >
              Student Details
            </Link>
            <button
              onClick={handleAuthAction}
              className="block w-full text-left px-4 py-2 rounded-full text-base font-medium text-gray-800 hover:bg-indigo-50 transition-colors"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>

            
          </div>
        </div>
      )}
    </nav>
  );
}
