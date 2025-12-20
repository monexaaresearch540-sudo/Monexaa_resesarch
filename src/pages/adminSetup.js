import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getRdbInstance } from '../firebase';
import { ref, set, get, child } from 'firebase/database';
import { FaShieldAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function AdminSetup() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading'); // loading, ready, success, error, exists
  const [message, setMessage] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        checkAdminStatus();
      } else {
        navigate('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const checkAdminStatus = async () => {
    try {
      const rdb = await getRdbInstance();
      const snapshot = await get(child(ref(rdb), 'admins'));
      if (snapshot.exists()) {
        setStatus('exists');
        setMessage('Admin configuration already exists. For security reasons, you cannot add new admins via this page anymore.');
      } else {
        setStatus('ready');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Error checking database status.');
    }
  };

  const handleClaimAdmin = async () => {
    if (!user) return;
    
    try {
      const rdb = await getRdbInstance();
      // Create the admins node with the current user as the first admin
      await set(ref(rdb, `admins/${user.uid}`), {
        email: user.email,
        role: 'super_admin',
        createdAt: new Date().toISOString()
      });
      
      setStatus('success');
      setMessage('Success! You are now the Super Admin.');
      setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Failed to claim admin access. It might have been claimed already.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaShieldAlt className="text-blue-600 text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Setup</h1>
        
        {status === 'loading' && <p>Checking system status...</p>}
        
        {status === 'ready' && (
          <div>
            <p className="text-gray-600 mb-6">
              No admins detected. You can claim the <strong>Super Admin</strong> role for your account:
              <br/>
              <span className="font-mono text-sm bg-gray-100 p-1 rounded">{user?.email}</span>
            </p>
            <button
              onClick={handleClaimAdmin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Claim Admin Access
            </button>
          </div>
        )}

        {status === 'exists' && (
          <div>
            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-4 flex items-start gap-3 text-left">
              <FaExclamationTriangle className="mt-1 flex-shrink-0" />
              <p className="text-sm">{message}</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {status === 'success' && (
          <div className="text-green-600">
            <FaCheckCircle className="text-4xl mx-auto mb-2" />
            <p className="font-bold">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-red-600">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
