import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaCheckCircle, FaClock, FaTimesCircle, FaCalendar, FaFileAlt } from 'react-icons/fa';
import { getRdbInstance } from '../../firebase';
import { ref, onValue } from 'firebase/database';

const API_URL = process.env.REACT_APP_API_URL || 'https://monexaa-resesarch.onrender.com';

export default function SubmissionsManager() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const rdb = await getRdbInstance();
      const submissionsRef = ref(rdb, 'client_information_submissions');
      onValue(submissionsRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const submissionsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          submissionsArray.sort((a, b) => b.timestamp - a.timestamp);
          
          const updatedSubmissions = await Promise.all(
            submissionsArray.map(async (submission) => {
              if (submission.digioId && !submission.digioStatus) {
                 try {
                    if (submission.digioStatus !== 'completed' && submission.digioStatus !== 'signed') {
                       const response = await fetch(`${API_URL}/api/digio/document/${submission.digioId}`);
                       const digioData = await response.json();
                       return {
                         ...submission,
                         digioStatus: digioData.success ? digioData.data.agreement_status : 'unknown',
                         digioDetails: digioData.success ? digioData.data : null
                       };
                    }
                 } catch (e) {
                   // ignore
                 }
              }
              return submission;
            })
          );
          setSubmissions(updatedSubmissions);
        } else {
          setSubmissions([]);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: FaClock, text: 'Pending' },
      requested: { color: 'bg-blue-100 text-blue-800', icon: FaClock, text: 'Requested' },
      signed: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Signed' },
      completed: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: 'Completed' },
      expired: { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, text: 'Expired' },
      unknown: { color: 'bg-gray-100 text-gray-800', icon: FaClock, text: 'Unknown' },
      error: { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, text: 'Error' }
    };

    const config = statusConfig[status] || statusConfig.unknown;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon className="text-xs" />
        {config.text}
      </span>
    );
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesFilter = filter === 'all' || sub.digioStatus === filter || (filter === 'pending' && (sub.digioStatus === 'requested' || sub.digioStatus === 'pending'));
    const matchesSearch = 
      sub.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.mobile?.includes(searchTerm) ||
      sub.pan?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <>
        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'signed', 'expired'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                      filter === f 
                        ? (f === 'all' ? 'bg-[#0F8B6E]' : f === 'pending' ? 'bg-blue-600' : f === 'signed' ? 'bg-green-600' : 'bg-red-600') + ' text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {f}
                  </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, mobile, PAN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F8B6E] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="inline-block w-8 h-8 border-4 border-[#0F8B6E] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600">No submissions found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div key={submission.id} className="bg-white rounded-lg shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left Side - Client Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                          <FaUser className="text-[#0F8B6E] text-sm" />
                          {submission.clientName}
                        </h3>
                        <p className="text-xs text-gray-500">Father: {submission.fatherName}</p>
                      </div>
                      {getStatusBadge(submission.digioStatus || submission.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaEnvelope className="text-[#0F8B6E] text-xs" />
                        <span className="truncate">{submission.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="text-[#0F8B6E] text-xs" />
                        <span>{submission.mobile}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaIdCard className="text-[#0F8B6E] text-xs" />
                        <span>PAN: {submission.pan}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaCalendar className="text-[#0F8B6E] text-xs" />
                        <span>DOB: {submission.dob}</span>
                      </div>
                    </div>

                    {submission.clientId && (
                      <p className="text-xs text-gray-500 mt-2">Client ID: {submission.clientId}</p>
                    )}
                  </div>

                  {/* Right Side - Document Info */}
                  <div className="md:text-right">
                    <p className="text-xs text-gray-500 mb-1">
                      Submitted: {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                    {submission.digioId && (
                      <p className="text-xs text-gray-500 mb-2">
                        Doc ID: {submission.digioId.substring(0, 20)}...
                      </p>
                    )}
                    {submission.fileName && (
                      <p className="text-xs text-gray-600 font-semibold">
                        📄 {submission.fileName}
                      </p>
                    )}
                    {submission.digioDetails?.signing_parties?.[0]?.expire_on && (
                      <p className="text-xs text-orange-600 mt-1">
                        Expires: {new Date(submission.digioDetails.signing_parties[0].expire_on).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-600">
                    <span className="font-semibold">Address:</span> {submission.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
    </>
  );
}
