import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

/**
 * TablePage Component
 * - Reads `shareToken` from URL params
 * - Fetches student data from the public API
 * - Displays in a Tailwind-styled table with an email filter input
 */
export default function TablePage() {
  const { shareToken } = useParams();
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://tnp-recruitment-challenge.manitvig.live/share?shareToken=${shareToken}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch student data.');
        }
        const data = await res.json();
        setStudents(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    if (shareToken) fetchData();
  }, [shareToken]);

  const filtered = students.filter((s) =>
    s.email.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-center">Shared Students</h1>
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Filter by email…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-sm px-3 py-2 border rounded focus:outline-none focus:ring"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Roll No</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.roll_no} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{s.first_name}</td>
                <td className="px-4 py-2 border">{s.last_name}</td>
                <td className="px-4 py-2 border break-all">{s.email}</td>
                <td className="px-4 py-2 border">{s.roll_no}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
