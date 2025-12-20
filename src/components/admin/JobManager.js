import React, { useState, useEffect } from 'react';
import { getRdbInstance } from '../../firebase';
import { ref, push, remove, onValue } from 'firebase/database';
import { FaTrash, FaPlus, FaBriefcase } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';

const JobManager = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, jobId: null });
  const [newJob, setNewJob] = useState({
    title: '',
    type: 'Full Time',
    location: 'Indore, India',
    experience: '',
    description: '',
    icon: 'FaBriefcase'
  });

  useEffect(() => {
    const fetchJobs = async () => {
      const rdb = await getRdbInstance();
      const jobsRef = ref(rdb, 'jobs');
      onValue(jobsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const jobsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setJobs(jobsArray);
        } else {
          setJobs([]);
        }
        setLoading(false);
      });
    };
    fetchJobs();
  }, []);

  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const rdb = await getRdbInstance();
      const jobsRef = ref(rdb, 'jobs');
      await push(jobsRef, newJob);
      toast.success("Job posted successfully!");
      setNewJob({
        title: '',
        type: 'Full Time',
        location: 'Indore, India',
        experience: '',
        description: '',
        icon: 'FaBriefcase'
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding job:", error);
      toast.error("Failed to post job.");
    }
  };

  const handleDeleteJob = (id) => {
    setDeleteModal({ isOpen: true, jobId: id });
  };

  const confirmDeleteJob = async () => {
    if (!deleteModal.jobId) return;
    
    try {
      const rdb = await getRdbInstance();
      const jobRef = ref(rdb, `jobs/${deleteModal.jobId}`);
      await remove(jobRef);
      toast.success("Job deleted successfully!");
      setDeleteModal({ isOpen: false, jobId: null });
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <ConfirmationModal 
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, jobId: null })}
        onConfirm={confirmDeleteJob}
        title="Delete Job Posting"
        message="Are you sure you want to delete this job posting? This action cannot be undone."
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-[#003E29] flex items-center gap-2">
          <FaBriefcase /> Job Postings
        </h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#0F8B6E] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#003E29] transition-colors"
        >
          <FaPlus /> {showForm ? 'Cancel' : 'Post New Job'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddJob} className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input 
                type="text" 
                name="title" 
                value={newJob.title} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F8B6E] outline-none"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input 
                type="text" 
                name="experience" 
                value={newJob.experience} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F8B6E] outline-none"
                placeholder="e.g. 2-5 Years"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                type="text" 
                name="location" 
                value={newJob.location} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F8B6E] outline-none"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select 
                name="type" 
                value={newJob.type} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F8B6E] outline-none"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
              <select 
                name="icon" 
                value={newJob.icon} 
                onChange={handleInputChange} 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F8B6E] outline-none"
              >
                <option value="FaBriefcase">Briefcase (Default)</option>
                <option value="FaChartLine">Chart Line (Analyst)</option>
                <option value="FaHandshake">Handshake (Sales)</option>
                <option value="FaUserTie">User Tie (Manager)</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              name="description" 
              value={newJob.description} 
              onChange={handleInputChange} 
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0F8B6E] outline-none"
              required 
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-[#003E29] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Post Job
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No active job postings.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-700 border-b">
                <th className="p-3 font-semibold">Title</th>
                <th className="p-3 font-semibold">Location</th>
                <th className="p-3 font-semibold">Experience</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium text-[#003E29]">{job.title}</td>
                  <td className="p-3 text-gray-600">{job.location}</td>
                  <td className="p-3 text-gray-600">{job.experience}</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {job.type}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => handleDeleteJob(job.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete Job"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobManager;