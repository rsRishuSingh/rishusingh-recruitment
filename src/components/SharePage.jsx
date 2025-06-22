import { useState, useEffect } from 'react';

const STORAGE_KEY = 'shareLink';
const EXPIRY_KEY = 'shareLinkExpiry';

/**
 * SharePage Component
 * - Renders a centered button to generate a shareable link
 * - Displays the generated link below with a copy button
 * - Persists link in localStorage for 30 days and disables generation if present
 */
export default function SharePage() {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // On mount, check if a valid link is stored
  useEffect(() => {
    const storedLink = localStorage.getItem(STORAGE_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (storedLink && expiry) {
      const now = Date.now();
      if (now < parseInt(expiry, 10)) {
        setLink(storedLink);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(EXPIRY_KEY);
      }
    }
  }, []);

  async function handleGenerate() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found'); // to do redirect to login

      const res = await fetch(
        'https://tnp-recruitment-challenge.manitvig.live/share',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to generate share token');
      }

      const { shareToken } = await res.json();
      const url = `${window.location.origin}/${shareToken}`;
      setLink(url);

      // Persist for 30 days
      const expiryTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, url);
      localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(link);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <button
        onClick={handleGenerate}
        disabled={loading || !!link}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : link ? 'Link Generated' : 'Generate Shareable Link'}
      </button>

      {link && (
        <div className="mt-6 w-full max-w-md bg-gray-100 p-4 rounded-lg flex items-center justify-between">
          <span className="break-all text-sm text-gray-800">{link}</span>
          <button
            onClick={handleCopy}
            className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Copy
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
