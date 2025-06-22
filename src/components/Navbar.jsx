import { useState } from 'react';
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
    const {loggedIn} = props;
    const [open, setOpen] = useState(false);
    const links = [
        { name: 'Home', to: '/' },
        { name: 'Share', to: '/share' },
        { name: 'Table', to:'/table'},
        { name: 'Login', to: '/login' }
    ];

    return (
        <nav className="bg-white shadow-lg">
            {/* laptop menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            TNP Dev
                        </Link>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-lg font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
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

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.to}
                                className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
