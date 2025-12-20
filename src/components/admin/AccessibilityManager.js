import React, { useState, useEffect } from 'react';
import { FaTrash, FaExternalLinkAlt, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { getRdbInstance } from '../../firebase';
import { ref, get, remove, update } from 'firebase/database';

export default function AccessibilityManager() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const rdb = await getRdbInstance();
      const feedbackRef = ref(rdb, 'accessibility_feedback');
      const snapshot = await get(feedbackRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const feedbackList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        
        // Sort by date (newest first)
        feedbackList.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
        setFeedbacks(feedbackList);
      } else {
        setFeedbacks([]);
      }
    } catch (err) {
      console.error("Error fetching feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        const rdb = await getRdbInstance();
        await remove(ref(rdb, `accessibility_feedback/${id}`));
        setFeedbacks(feedbacks.filter(item => item.id !== id));
      } catch (err) {
        console.error("Error deleting feedback:", err);
        alert("Failed to delete feedback");
      }
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === 'resolved' ? 'new' : 'resolved';
    try {
      const rdb = await getRdbInstance();
      await update(ref(rdb, `accessibility_feedback/${id}`), { status: newStatus });
      setFeedbacks(feedbacks.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredFeedbacks = feedbacks.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.issueType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-gray-800">Accessibility Feedback</h2>
        <input
          type="text"
          placeholder="Search feedback..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8B6E] text-sm"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-10 h-10 border-4 border-[#0F8B6E] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading feedback...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">User</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Issue Type</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Description</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">URL</th>
                <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <button 
                        onClick={() => handleStatusUpdate(item.id, item.status)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          item.status === 'resolved' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        {item.status === 'resolved' ? <FaCheckCircle /> : <FaExclamationCircle />}
                        {item.status === 'resolved' ? 'Resolved' : 'New'}
                      </button>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-800 text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.email}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium capitalize">
                        {item.issueType}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate" title={item.description}>
                        {item.description}
                      </div>
                    </td>
                    <td className="p-4">
                      {item.url ? (
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#0F8B6E] hover:underline flex items-center gap-1 text-xs"
                        >
                          View Page <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="p-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No feedback found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
