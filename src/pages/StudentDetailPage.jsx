import { useContext, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import Spinner from '../components/Spinner';
import { getWithExpiry } from '../utils/tokenStorage';

export default function StudentDetailPage() {
  const {
    fetchAndSetStudentDetails,
    studentDetails,
    loading,
  } = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  // Attempt to retrieve token from URL or localStorage, then fetch student data
  useEffect(() => {
    let token = new URLSearchParams(window.location.search).get('shareToken');

    if (!token) {
      const data = getWithExpiry('shareToken');
      const shareToken = data?.token;

      if (!shareToken) {
        navigate('/sharelink'); // Redirect if token not found
        return;
      }

      token = shareToken;

      // Fetch student data with token from localStorage
      fetchAndSetStudentDetails(token).catch(err => {
        console.error(err);
        setError('Failed to load student details');
      });
    }

    // If token was found in URL, fetch data
    if (token) {
      fetchAndSetStudentDetails(token).catch(err => {
        console.error(err);
        setError('Failed to load student details');
      });
    }

    console.log(token); // Debug log
  }, []);

  // Memoized filtered list based on email filter
  const filteredStudents = useMemo(() =>
    studentDetails.filter(s =>
      s.email.toLowerCase().includes(filter.toLowerCase())
    ),
    [studentDetails, filter]
  );

  // Loading UI
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-white">
        <div className="flex items-center space-x-2">
          <Spinner />
          <p className="text-gray-800 text-lg">Loading student data…</p>
        </div>
      </div>
    );

  // Error UI
  if (error)
    return (
      <div className="p-4">
        <p className="text-red-400 font-medium">{error}</p>
      </div>
    );

  // Main content
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 to-white">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Filter input */}
        <div className="text-center">
          <input
            type="text"
            placeholder="Filter by email..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="w-full max-w-sm px-4 py-3 rounded-4xl focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500 text-gray-800 bg-purple-200"
          />
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-auto">
          <table className="min-w-full">
            <thead className="bg-purple-700">
              <tr>
                {['First Name', 'Last Name', 'Email', 'Roll No.'].map((hdr, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wide"
                  >
                    {hdr}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="px-6 py-4 text-gray-800">{s.first_name}</td>
                  <td className="px-6 py-4 text-gray-800">{s.last_name}</td>
                  <td className="px-6 py-4 text-gray-800">{s.email}</td>
                  <td className="px-6 py-4 text-gray-800">{s.roll_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
