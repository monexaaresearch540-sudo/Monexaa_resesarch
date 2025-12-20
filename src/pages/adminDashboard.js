import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaEnvelope, FaSync, FaFileAlt, FaSignOutAlt, FaChartLine, FaLock, FaExclamationTriangle, FaCommentDots, FaBriefcase, FaUserTie, FaUniversalAccess } from 'react-icons/fa';
import { getRdbInstance } from '../firebase';
import { ref, get, child } from 'firebase/database';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import ReportManager from '../components/admin/ReportManager';
import ComplaintManager from '../components/admin/ComplaintManager';
import SubmissionsManager from '../components/admin/SubmissionsManager';
import ContactManager from '../components/admin/ContactManager';
import ComplaintsList from '../components/admin/ComplaintsList';
import JobManager from '../components/admin/JobManager';
import ApplicationManager from '../components/admin/ApplicationManager';
import AccessibilityManager from '../components/admin/AccessibilityManager';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('submissions');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const isRestrictedAdmin = user?.email === 'monexaaresearch540@gmail.com';

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // If restricted admin, change default tab from submissions
        if (currentUser.email === 'monexaaresearch540@gmail.com') {
          setActiveTab('contacts');
        }

        // Check if user is admin
        try {
          const rdb = await getRdbInstance();
          const snapshot = await get(child(ref(rdb), `admins/${currentUser.uid}`));
          if (snapshot.exists() || currentUser.email === 'monexaaresearch540@gmail.com') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      } else {
        navigate('/admin/login');
      }
      setAuthChecking(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  if (authChecking) {
    return (
      <div className="w-full min-h-screen bg-transparent flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-[#0F8B6E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="w-full min-h-screen bg-transparent flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-red-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            You do not have permission to access this dashboard. Please contact the system administrator.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Current User</p>
            <p className="text-sm font-medium text-gray-800">{user?.email}</p>
            <p className="text-xs text-gray-500 mt-1">UID: {user?.uid}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-[#003E29] text-white py-3 rounded-lg font-semibold hover:bg-[#0F8B6E] transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden bg-transparent min-h-screen">
      <Helmet>
        <title>Admin Dashboard - Client Submissions | Monexaa Research</title>
      </Helmet>

      {/* Header */}
      <div className="bg-[#003E29] text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-sm md:text-base text-green-100">Client Information Submissions</p>
              {user && (
                <p className="text-xs text-green-200 mt-1">
                  Logged in as: {user.email}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 bg-[#0F8B6E] hover:bg-[#0b6b54] px-4 py-2 rounded-lg font-semibold transition-all"
              >
                <FaSync className="text-sm" />
                <span className="hidden md:inline">Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-all"
                title="Logout"
              >
                <FaSignOutAlt className="text-sm" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-1">
          {!isRestrictedAdmin && (
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
                activeTab === 'submissions' 
                  ? 'bg-white text-[#0F8B6E] border border-b-0 border-gray-200' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaFileAlt /> E-Sign Submissions
              </div>
            </button>
          )}
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
              activeTab === 'contacts' 
                ? 'bg-white text-[#0F8B6E] border border-b-0 border-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaEnvelope /> Contact Inquiries
            </div>
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
              activeTab === 'complaints' 
                ? 'bg-white text-[#0F8B6E] border border-b-0 border-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaExclamationTriangle /> Complaints
            </div>
          </button>
          <button
            onClick={() => setActiveTab('complaintStats')}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
              activeTab === 'complaintStats' 
                ? 'bg-white text-[#0F8B6E] border border-b-0 border-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaCommentDots /> Complaint Stats
            </div>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
              activeTab === 'reports' 
                ? 'bg-white text-[#0F8B6E] border border-b-0 border-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaChartLine /> Report Manager
            </div>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
              activeTab === 'jobs' 
                ? 'bg-white text-[#0F8B6E] border border-b-0 border-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaBriefcase /> Job Posts
            </div>
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
              activeTab === 'applications' 
                ? 'bg-white text-[#0F8B6E] border border-b-0 border-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaUserTie /> Applications
            </div>
          </button>
          <button
            onClick={() => setActiveTab('accessibility')}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
              activeTab === 'accessibility' 
                ? 'bg-white text-[#0F8B6E] border border-b-0 border-gray-200' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <FaUniversalAccess /> Accessibility
            </div>
          </button>
        </div>

        {activeTab === 'submissions' && !isRestrictedAdmin && (
          <SubmissionsManager />
        )}

        {activeTab === 'contacts' && (
          <ContactManager />
        )}

        {activeTab === 'complaints' && (
          <ComplaintsList />
        )}

        {activeTab === 'complaintStats' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ComplaintManager />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ReportManager />
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <JobManager />
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <ApplicationManager />
          </div>
        )}

        {activeTab === 'accessibility' && (
          <AccessibilityManager />
        )}
      </div>
    </div>
  );
}
