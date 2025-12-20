import React, { useState, useEffect } from 'react';
import { FaPhone, FaExclamationTriangle } from 'react-icons/fa';
import { getRdbInstance } from '../../firebase';
import { ref, onValue } from 'firebase/database';

export default function ComplaintsList() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const rdb = await getRdbInstance();
      const complaintsRef = ref(rdb, 'complaints');
      onValue(complaintsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const complaintsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          complaintsArray.sort((a, b) => b.timestamp - a.timestamp);
          setComplaints(complaintsArray);
        } else {
          setComplaints([]);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error('Error fetching complaints:', error);
      setLoading(false);
    }
  };

  const filteredComplaints = complaints.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.mobile?.includes(searchTerm) ||
    c.complaintType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
            <input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8B6E] text-sm"
            />
        </div>
        {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
            <div className="w-10 h-10 border-4 border-[#0F8B6E] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500">Loading complaints...</p>
            </div>
        ) : (
            <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 font-semibold text-gray-600 text-sm">Complainant</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Type</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Description</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Resolution Expected</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((comp) => (
                        <tr key={comp.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                            <div className="font-medium text-gray-800">{comp.name}</div>
                            <div className="text-xs text-gray-500">{comp.email}</div>
                            <div className="text-xs text-gray-500">{comp.mobile}</div>
                        </td>
                        <td className="p-4">
                            <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit">
                            <FaExclamationTriangle className="text-xs" />
                            {comp.complaintType}
                            </span>
                        </td>
                        <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={comp.description}>
                            {comp.description}
                        </td>
                        <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={comp.resolution}>
                            {comp.resolution}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                            {new Date(comp.timestamp).toLocaleDateString()}
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="5" className="p-8 text-center text-gray-500">
                        No complaints found.
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden p-4 space-y-4">
                {filteredComplaints.length > 0 ? (
                filteredComplaints.map((comp) => (
                    <div key={comp.id} className="bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                        <h3 className="font-bold text-gray-800">{comp.name}</h3>
                        <div className="text-xs text-gray-500">{comp.email}</div>
                        </div>
                        <span className="text-xs text-gray-500">{new Date(comp.timestamp).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="text-[#0F8B6E] text-xs" />
                        <span>{comp.mobile}</span>
                        </div>
                        
                        <div>
                        <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit">
                            <FaExclamationTriangle className="text-xs" />
                            {comp.complaintType}
                        </span>
                        </div>

                        <div className="bg-white p-3 rounded border border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 mb-1">Description:</p>
                        <p className="text-gray-700 text-xs">{comp.description}</p>
                        </div>

                        {comp.resolution && (
                        <div className="bg-white p-3 rounded border border-gray-100">
                            <p className="text-xs font-semibold text-gray-500 mb-1">Expected Resolution:</p>
                            <p className="text-gray-700 text-xs">{comp.resolution}</p>
                        </div>
                        )}
                    </div>
                    </div>
                ))
                ) : (
                <div className="text-center text-gray-500 py-8">
                    No complaints found.
                </div>
                )}
            </div>
            </>
        )}
    </div>
  );
}
