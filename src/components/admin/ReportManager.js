import React, { useState, useEffect } from 'react';
import { Trans } from '../../i18nShim';
import { ref, onValue, push, remove } from 'firebase/database';
import { motion } from 'framer-motion';
import { FiUpload, FiEye, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getRdbInstance } from '../../firebase';
import { getAuth } from 'firebase/auth';
import PropTypes from 'prop-types';

import LoadingSpinner from './LoadingSpinner';
import ConfirmationModal from './ConfirmationModal';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const REPORT_CATEGORIES = ['Market', 'Technical', 'Financial', 'Competitor', 'Other'];

const ReportUploadCard = ({ day, reports, onUpload, onDelete, onPreview }) => {
  const [newReport, setNewReport] = useState({ title: '', description: '', category: 'Market', file: null });
  const [uploading, setUploading] = useState(false);
  const [lastOtp, setLastOtp] = useState('');

  const handleUpload = async () => {
    if (!newReport.file) {
      toast.error('Please select a file.');
      return;
    }
    // 10MB size limit
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (newReport.file.size > maxSize) {
      toast.error('File size must be 10MB or less.');
      return;
    }
    setUploading(true);
    try {
      const result = await onUpload(day, newReport);
      if (result?.otp) setLastOtp(result.otp);
      setNewReport({ title: '', description: '', category: 'Market', file: null });
      const fileInput = document.getElementById(`file-input-${day}`);
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error(`Failed to upload report: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      className="rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col gap-4 bg-white"
      variants={itemVariants}
    >
      <h4 className="text-xl font-bold text-[#003E29] mb-2 tracking-wide">{day}</h4>
      <div className="mb-2 space-y-3">
        <input
          type="text"
          placeholder="Report Title"
          className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F8B6E]"
          value={newReport.title}
          onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
        />
        <textarea
          placeholder="Report Description"
          className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F8B6E]"
          rows="3"
          value={newReport.description}
          onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
        />
        <select
          className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0F8B6E]"
          value={newReport.category}
          onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
        >
          {REPORT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat} className="text-gray-900">{cat}</option>
          ))}
        </select>
        <input
          id={`file-input-${day}`}
          type="file"
          accept=".pdf"
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-[#0F8B6E] file:text-white file:border-0 file:hover:bg-[#0b6b54]"
          onChange={(e) => setNewReport({ ...newReport, file: e.target.files[0] })}
        />
        <motion.button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full px-4 py-2 bg-[#0F8B6E] hover:bg-[#0b6b54] text-white rounded-lg shadow flex items-center justify-center gap-2 font-semibold text-base disabled:opacity-50 transition-colors"
          variants={buttonVariants}
          whileHover="hover"
        >
          <FiUpload /> {uploading ? 'Uploading...' : 'Upload'}
        </motion.button>
        {lastOtp && (
          <div className="mt-2 text-sm text-emerald-700">
            <span className="inline-flex items-center px-2 py-1 rounded bg-emerald-100 border border-emerald-200">New OTP: <strong className="ml-1 tracking-widest">{lastOtp}</strong></span>
          </div>
        )}
      </div>
      <div>
        <h5 className="text-sm font-semibold text-gray-700 mb-2"><Trans i18nKey="pages.admin_ReportManager.uploaded-reports">Uploaded Reports</Trans></h5>
        {reports[day]?.length > 0 ? (
          <ul className="space-y-2">
            {reports[day].map((report) => (
              <motion.li
                key={report.id}
                className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg"
                variants={itemVariants}
              >
                <div className="min-w-0">
                  <p className="text-sm text-gray-900 font-medium truncate" title={report.title}>{report.title}</p>
                  {report.otp && (
                    <p className="text-xs text-emerald-700 mt-1">OTP: <span className="font-mono tracking-widest">{report.otp}</span></p>
                  )}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => onPreview(report)}
                    className="text-blue-600 hover:text-blue-800"
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    <FiEye size={16} />
                  </motion.button>
                  <motion.button
                    onClick={() => onDelete(report.id)}
                    className="text-red-600 hover:text-red-700"
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    <FiTrash2 size={16} />
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400"><Trans i18nKey="pages.admin_ReportManager.no-reports-uploaded">No reports uploaded.</Trans></p>
        )}
      </div>
    </motion.div>
  );
};

ReportUploadCard.propTypes = {
  day: PropTypes.string.isRequired,
  reports: PropTypes.object.isRequired,
  onUpload: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
};

const ReportManager = () => {
  const [reports, setReports] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    let unsubscribe = () => {};
    const init = async () => {
      try {
        const db = await getRdbInstance();
        if (!db) {
          console.error('Firebase DB not initialized');
          setIsLoading(false);
          return;
        }
        const reportsRef = ref(db, 'reports');
        unsubscribe = onValue(reportsRef, (snapshot) => {
          const data = snapshot.val() || {};
          const groupedReports = WEEK_DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
          Object.entries(data).forEach(([key, value]) => {
            if (value.day && groupedReports[value.day]) {
              groupedReports[value.day].push({ id: key, ...value });
            }
          });
          setReports(groupedReports);
          setIsLoading(false);
        }, (error) => {
          toast.error('Failed to load reports: ' + error.message);
          setIsLoading(false);
        });
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };
    init();
    return () => unsubscribe();
  }, []);

  const handleUploadReport = async (day, reportData) => {
    const auth = getAuth();
    if (!auth.currentUser) {
      toast.error('You must be logged in to upload reports.');
      return;
    }
    const file = reportData.file;
    const fileDataUrl = await toBase64(file);
    // Generate a 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const newReportData = {
      title: reportData.title || 'Untitled Report',
      description: reportData.description || 'No description',
      category: reportData.category,
      size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
      fileData: fileDataUrl,
      filename: file.name,
      timestamp: Date.now(),
      day,
      otp,
    };

    const db = await getRdbInstance();
    await push(ref(db, 'reports'), newReportData);
    toast.success(`Report uploaded for ${day}.`, { autoClose: 3000 });
    return { otp };
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        const db = await getRdbInstance();
        // Delete from Realtime Database
        await remove(ref(db, `reports/${itemToDelete}`));
        toast.success('Report deleted successfully.');
      } catch (error) {
        toast.error(`Failed to delete report: ${error.message}`);
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handlePreview = (report) => {
    // Handle base64 or URL
    if (report.fileData) {
        // If it's a base64 string, we might need to open it in a way that works for PDF
        // For simplicity, opening in new tab often works for data URLs in modern browsers
        const win = window.open();
        if (win) {
            win.document.write(
                `<iframe src="${report.fileData}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
            );
        }
    }
  };

  return (
    <motion.div
      className="admin-section text-black"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold mb-6 text-[#003E29]"><Trans i18nKey="pages.admin_ReportManager.report-manager">Report Manager</Trans></h2>
      {isLoading ? <LoadingSpinner /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WEEK_DAYS.map((day) => (
            <ReportUploadCard
              key={day}
              day={day}
              reports={reports}
              onUpload={handleUploadReport}
              onDelete={handleDeleteClick}
              onPreview={handlePreview}
            />
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Report Deletion"
        message="Are you sure you want to delete this report? This action cannot be undone."
      />
    </motion.div>
  );
};

export default ReportManager;
