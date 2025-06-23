import { useContext, useEffect, useState, useMemo } from 'react';
import AuthContext from '../context/auth/AuthContext';

export default function StudentDetailPage() {
  const {
    fetchAndSetStudentDetails,
    studentDetails,
    loading,
    link,
  } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  // grab shareToken from either current URL or context.link
  useEffect(() => {
    let token = new URLSearchParams(window.location.search).get('shareToken');
    if (!token && link) {
      // create a URL object, then read its searchParams
      const urlObj = new URL(link);
      token = urlObj.searchParams.get('shareToken');
    }
    if (token) {
      fetchAndSetStudentDetails(token).catch(err => {
        console.error(err);
        setError('Failed to load student details');
      });
    }
    console.log(token)
  }, []);
  
  const filteredStudents = useMemo(() =>
    studentDetails.filter(s =>
      s.email.toLowerCase().includes(filter.toLowerCase())
    ),
    [studentDetails, filter]
  );
  

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-pink-500">
        <p className="text-white text-lg">Loading student data…</p>
      </div>
    );
  if (error)
    return (
      <div className="p-4">
        <p className="text-red-400 font-medium">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-600 to-pink-500">
      <div className="max-w-4xl mx-auto space-y-4">
       <div className='text-center'>
       <input
          type="text"
          placeholder="Filter by email..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full max-w-sm px-4 py-2 rounded-4xl focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500 text-gray-800 bg-amber-50 "
        />
       </div>

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
