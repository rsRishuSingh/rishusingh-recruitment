import React, { useContext, useState } from 'react';
import AuthContext from '../context/auth/AuthContext';

/**
 * ShareLinkPage Component
 * - Renders a button to generate a shareable link
 * - Shows generated link with copy-to-clipboard functionality
 * - Disables generation if a link already exists
 */
export default function ShareLinkPage() {
  // Context provides loading state, click handler, and existing link
  const { loading, onClickGenerate, link } = useContext(AuthContext);

  // Local state for copy button text and error display
  const [copyText, setCopyText] = useState('Copy');
  const [error, setError] = useState('');

  /**
   * Copies link to clipboard and updates button text briefly
   */
  function handleCopy() {
    setCopyText('Copied');
    navigator.clipboard.writeText(link);
    setTimeout(() => setCopyText('Copy'), 3000);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Generate link button */}
      <button
        onClick={onClickGenerate}
        disabled={loading || !!link}
        className="
          px-6 py-3 bg-indigo-600 text-white rounded-lg
          hover:bg-indigo-700 disabled:opacity-50
        "
      >
        {loading
          ? 'Generating...'
          : link
          ? 'Link Generated'
          : 'Generate Shareable Link'}
      </button>

      {/* Display generated link and copy button */}
      {link && (
        <div className="
            mt-6 w-full max-w-lg bg-gray-100 p-4 rounded-lg
            flex items-center justify-between
          ">
          {/* Link text */}
          <span className="w-3/4 break-all text-sm text-gray-800">
            {link}
          </span>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={`
              w-20 px-3 py-1 bg-green-500 text-white rounded
              hover:bg-green-600 transition-colors
              ${copyText === 'Copied' ? 'font-bold' : 'font-normal'}
            `}
          >
            {copyText}
          </button>
        </div>
      )}

      {/* Optional error message */}
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
