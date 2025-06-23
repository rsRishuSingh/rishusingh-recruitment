import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/auth/AuthContext';

// Styles for different alert types
const TYPE_STYLES = {
  success: 'bg-green-100 border-green-500 text-green-700',
  error: 'bg-red-100 border-red-500 text-red-700',
  info: 'bg-blue-100 border-blue-500 text-blue-700',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
};

/**
 * Modal Component
 * - Displays dismissable, animated notifications
 * - Slides down when appearing and slides up on dismissal
 */
export default function Modal() {
  const { alert, setAlert } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  // Show modal when `alert` becomes non-null
  useEffect(() => {
    if (alert) {
      setVisible(true);
    }
  }, [alert]);

  // If there's no alert data, render nothing
  if (!alert) return null;

  const { type, message, description } = alert;
  const style = TYPE_STYLES[type] || TYPE_STYLES.info;

  // Close handler with animation delay
  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setAlert(null), 300); // wait for slide-up
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 pointer-events-none">
      {/* Semi-transparent backdrop */}
      <div
        className="absolute inset-0 bg-black opacity-30"
        onClick={handleClose}
      />

      {/* Notification panel */}
      <div
        className={`pointer-events-auto mt-20 max-w-sm w-full p-4 border-l-4 rounded-lg shadow-lg transform transition-all duration-300 ease-out \
          ${style} \
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-lg">{message}</p>
            {description && <p className="mt-1 text-sm">{description}</p>}
          </div>
          <button
            onClick={handleClose}
            className= "cursor-pointer text-gray-500 hover:text-gray-700 ml-4 focus:outline-none"
          >
            <span role="img" aria-label="close">✖</span>
          </button>
        </div>
      </div>
    </div>
  );
}
