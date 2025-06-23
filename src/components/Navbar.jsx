import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import AuthContext from '../context/auth/AuthContext';

export default function Navbar() {
  const { check_session_validity, logout, link } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isLoggedIn = check_session_validity();

  const links = [
    { name: 'Home', to: '/' },
    { name: 'Generate Link', to: '/sharelink' },
  ];

  const handleAuthAction = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              TNP Dev
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {links.map(link => (
              <Link
                key={link.name}
                to={link.to}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
        <Link to={link === "" ? "#" : link} className={` text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-lg font-medium ${link === "" ? "pointer-events-none opacity-50" : ""} `} aria-disabled={link === ""}> Student Details </Link>


            <button
              onClick={handleAuthAction}
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-lg font-medium"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
            >
              {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map(link => (
              <Link
                key={link.name}
                to={link.to}
                className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </Link>
            ))}

            <button
              onClick={handleAuthAction}
              className="block w-full text-left text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
