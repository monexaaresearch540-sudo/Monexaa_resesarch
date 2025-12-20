import React, { useState, useEffect } from 'react';
import { getRdbInstance } from '../../firebase';
import { ref, onValue, update, remove } from 'firebase/database';
import { FaFileDownload, FaEnvelope, FaPhone, FaUser, FaCheckCircle, FaTimesCircle, FaClock, FaLink, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';

const ApplicationManager = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, appId: null });

  useEffect(() => {
    const fetchApplications = async () => {
      const rdb = await getRdbInstance();
      const appsRef = ref(rdb, 'job_applications');
      onValue(appsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const appsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          })).sort((a, b) => b.timestamp - a.timestamp); // Newest first
          setApplications(appsArray);
        } else {
          setApplications([]);
        }
        setLoading(false);
      });
    };
    fetchApplications();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const rdb = await getRdbInstance();
      const appRef = ref(rdb, `job_applications/${id}`);
      await update(appRef, { status: newStatus });
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteApplication = (id) => {
    setDeleteModal({ isOpen: true, appId: id });
  };

  const confirmDeleteApplication = async () => {
    if (!deleteModal.appId) return;

    try {
      const rdb = await getRdbInstance();
      const appRef = ref(rdb, `job_applications/${deleteModal.appId}`);
      await remove(appRef);
      toast.success("Application deleted successfully!");
      setDeleteModal({ isOpen: false, appId: null });
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application.");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new': return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"><FaClock /> New</span>;
      case 'reviewed': return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"><FaCheckCircle /> Reviewed</span>;
      case 'interview': return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"><FaUser /> Interview</span>;
      case 'hired': return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"><FaCheckCircle /> Hired</span>;
      case 'rejected': return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"><FaTimesCircle /> Rejected</span>;
      default: return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Unknown</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, appId: null })}
        onConfirm={confirmDeleteApplication}
        title="Delete Application"
        message="Are you sure you want to delete this application? This action cannot be undone."
      />

      <h2 className="text-xl font-bold text-[#003E29] mb-6 flex items-center gap-2">
        <FaUser /> Job Applications
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-500">No applications received yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gray-50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-[#003E29]">{app.name}</h3>
                  <p className="text-sm text-[#0F8B6E] font-medium">Applied for: {app.position}</p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(app.status)}
                  <select 
                    value={app.status} 
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="text-xs border rounded px-2 py-1 outline-none focus:border-[#0F8B6E]"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="interview">Interview</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button 
                    onClick={() => handleDeleteApplication(app.id)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                    title="Delete Application"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-400" /> {app.email}
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-gray-400" /> {app.phone}
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <span className="font-medium">Date:</span> {new Date(app.timestamp).toLocaleString()}
                </div>
              </div>

              {app.message && (
                <div className="bg-white p-3 rounded border border-gray-100 mb-3 text-sm text-gray-600 italic">
                  "{app.message}"
                </div>
              )}

              <div className="flex justify-end">
                {app.resumeBase64 ? (
                  <a 
                    href={app.resumeBase64} 
                    download={app.resumeName || "resume"}
                    className="flex items-center gap-2 text-[#0F8B6E] hover:text-[#003E29] font-medium text-sm border border-[#0F8B6E] px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <FaFileDownload /> Download Resume
                  </a>
                ) : app.resumeUrl ? (
                  <a 
                    href={app.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#0F8B6E] hover:text-[#003E29] font-medium text-sm border border-[#0F8B6E] px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <FaLink /> View Resume (Legacy)
                  </a>
                ) : app.resumeLink ? (
                  <a 
                    href={app.resumeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#0F8B6E] hover:text-[#003E29] font-medium text-sm border border-[#0F8B6E] px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <FaLink /> View Resume (Link)
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm italic">No resume provided</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationManager;