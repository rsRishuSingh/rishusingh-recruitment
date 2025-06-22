import { useState, useEffect } from 'react';

const TYPE_STYLES = {
  success: 'bg-green-100 border-green-500 text-green-700',
  error: 'bg-red-100 border-red-500 text-red-700',
  info: 'bg-blue-100 border-blue-500 text-blue-700',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
};

/**
 * NotificationModal Component
 * Props:
 *  - type: 'success' | 'error' | 'info' | 'warning'
 *  - message: string (headline)
 *  - description: string (additional text)
 */
export default function Modal({ type = 'info', message = '', description = '' }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const style = TYPE_STYLES[type] || TYPE_STYLES.info;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div
        className={`relative max-w-sm w-full p-4 border-l-4 rounded shadow-lg ${style} animate-fade-in-down`}
      >
        <p className="font-semibold text-lg">{message}</p>
        {description && <p className="mt-1 text-sm">{description}</p>}
      </div>
    </div>
  );
}
