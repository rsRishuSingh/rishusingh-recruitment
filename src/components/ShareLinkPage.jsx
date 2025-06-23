
import React, { useContext, useState} from 'react'
import AuthContext from '../context/auth/AuthContext'


/**
 * SharePage Component
 * - Renders a centered button to generate a shareable link
 * - Displays the generated link below with a copy button
 * - Persists link in localStorage for 30 days and disables generation if present
 */
export default function ShareLinkPage() {
  
  const context = useContext(AuthContext)
  const { loading, onClickGenerate, link} = context;
  const [error, setError] = useState('');
  const [copyText, setCopyText] = useState('Copy');
  

 

  function handleCopy() {
    setCopyText('Copied')
    navigator.clipboard.writeText(link);
    setTimeout(()=>{
      setCopyText('Copy')
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <button
        onClick={onClickGenerate}
        disabled={loading || !!link}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Generating...' : link ? 'Link Generated' : 'Generate Shareable Link'}
      </button>

      {link && (
        <div className="mt-6 w-full max-w-lg bg-gray-100 p-4 rounded-lg flex items-center justify-between">
          <span className='break-all text-sm text-gray-800 '>{link}</span>
          <button id='copyBotton'
            onClick={handleCopy}
            className={`ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 ${copyText === 'Copied' ? 'font-bold' : 'font-normal'}`}
          >
    {copyText}
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}
