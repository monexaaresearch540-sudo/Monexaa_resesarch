/**
 * Reports.js
 * Component for displaying and managing research reports with password-protected downloads.
 * Features day-based filtering, category selection, search, pagination, and animations.
 */

import React, { useState, useEffect, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { getRdbInstance } from '../firebase';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEye, FiDownload, FiX, FiFileText, FiLock } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

// Constants
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const CATEGORIES = ['Market', 'Technical', 'Financial', 'Competitor', 'Other'];

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

// Loading spinner component
const LoadingSpinner = () => (
  <>
    <Helmet>
      <title>Research Reports | Monexaa Research - Daily Market Analysis</title>
      <meta name="description" content="Access daily research reports, market outlooks, and technical analysis from Monexaa Research. Stay informed with our expert stock market insights." />
      <meta name="keywords" content="Daily Research Reports, Stock Market Analysis, Nifty Outlook, Bank Nifty Report, Equity Research Reports, Technical Analysis PDF, Monexaa Research Reports" />
      <link rel="canonical" href="https://monexaaresearch.com/reports" />
    </Helmet>
    <motion.div
      className="flex justify-center items-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-12 h-12 border-4 border-[#0F8B6E] border-t-transparent rounded-full animate-spin"></div>
    </motion.div>
  </>
);

// Report preview modal with robust PDF embedding
const ReportPreviewModal = ({ isOpen, onClose, report = null, onDownload = null }) => {
  const isMobile = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }, []);

  const { previewUrl, revoke } = useMemo(() => {
    const fileSource = report?.file || report?.fileData || '';
    try {
      if (!fileSource) return { previewUrl: null, revoke: () => {} };

      if (/^https?:\/\//i.test(fileSource)) {
        return { previewUrl: fileSource, revoke: () => {} };
      }

      const toBlobUrl = (bytes, mime = 'application/pdf') => {
        const blob = new Blob([bytes], { type: mime });
        const objectUrl = URL.createObjectURL(blob);
        return { previewUrl: objectUrl, revoke: () => URL.revokeObjectURL(objectUrl) };
      };

      if (fileSource.startsWith('data:')) {
        const commaIndex = fileSource.indexOf(',');
        if (commaIndex !== -1) {
          const meta = fileSource.substring(0, commaIndex);
          const base64 = fileSource.substring(commaIndex + 1);
          const mimeMatch = meta.match(/data:([^;]+);base64/);
          const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
          try {
            const bin = atob(base64);
            const bytes = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
            return toBlobUrl(bytes, mime);
          } catch (e) {
            console.error('Base64 decode error:', e);
            return { previewUrl: null, revoke: () => {} };
          }
        }
      }

      const bin = atob(fileSource);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return toBlobUrl(bytes, 'application/pdf');
    } catch (e) {
      return { previewUrl: null, revoke: () => {} };
    }
  }, [report]);

  useEffect(() => revoke, [revoke]);

  return (
    <AnimatePresence>
      {isOpen && report && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="bg-[#003E29] text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2 overflow-hidden">
                <FiFileText className="flex-shrink-0" />
                <h3 className="text-sm md:text-base font-bold truncate">{report?.title}</h3>
              </div>
              <div className="flex gap-2">
                {previewUrl && (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-xs md:text-sm transition-colors flex items-center gap-1"
                  >
                    <FiEye /> Open
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white/10 hover:bg-red-500/80 rounded text-xs md:text-sm transition-colors flex items-center gap-1"
                >
                  <FiX /> Close
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 bg-gray-100 relative">
              {previewUrl ? (
                isMobile ? (
                  <iframe
                    src={previewUrl}
                    title={report?.title || 'Report preview'}
                    className="w-full h-full border-0"
                  />
                ) : (
                  <object data={previewUrl} type="application/pdf" className="w-full h-full">
                    <iframe
                      src={previewUrl}
                      title={report?.title || 'Report preview'}
                      className="w-full h-full border-0"
                    />
                  </object>
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 p-6 text-center">
                  <FiFileText className="text-4xl mb-2 opacity-50" />
                  <p className="mb-4 font-medium">Preview unavailable</p>
                  {onDownload && (
                    <button
                      onClick={() => onDownload(report)}
                      className="px-4 py-2 bg-[#0F8B6E] text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-md hover:bg-[#0b6b54] transition-colors"
                    >
                      <FiDownload /> Download File
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-white border-t border-gray-200 flex justify-end gap-3">
              {onDownload && (
                <button
                  onClick={() => onDownload(report)}
                  className="px-4 py-2 bg-[#0F8B6E] hover:bg-[#0b6b54] text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-md"
                >
                  <FiDownload /> Download PDF
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

ReportPreviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  report: PropTypes.object,
  onDownload: PropTypes.func,
};

// Day selector component
const DaySelector = ({ activeDay, setActiveDay }) => (
  <motion.div className="mb-4 md:mb-6 w-full" variants={itemVariants}>
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
      {WEEK_DAYS.map((day) => (
        <button
          key={day}
          onClick={() => setActiveDay(day)}
          className={`flex-grow md:flex-grow-0 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
            activeDay === day
              ? 'bg-[#0F8B6E] text-white shadow-md transform -translate-y-0.5'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-[#0F8B6E]/30'
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  </motion.div>
);

DaySelector.propTypes = {
  activeDay: PropTypes.string.isRequired,
  setActiveDay: PropTypes.func.isRequired,
};

// Search and filter component
const SearchFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => (
  <motion.div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-3" variants={itemVariants}>
    <div className="relative flex-grow">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0F8B6E]" />
      <input
        type="text"
        placeholder="Search reports..."
        className="w-full pl-10 pr-4 py-2 md:py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    <div className="relative min-w-[180px]">
      <select
        className="w-full px-4 py-2 md:py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm appearance-none cursor-pointer"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
    </div>
  </motion.div>
);

SearchFilter.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
};

// Pagination component
const Pagination = ({ totalPages, currentPage, paginate }) => (
  <motion.div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-2" variants={itemVariants}>
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => paginate(i + 1)}
        className={`w-7 h-7 md:w-10 md:h-10 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center justify-center ${
          currentPage === i + 1
            ? 'bg-[#0F8B6E] text-white shadow-md'
            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-[#0F8B6E]/30'
        }`}
      >
        {i + 1}
      </button>
    ))}
  </motion.div>
);

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

/**
 * Main Reports component
 */
function Reports() {
  const [activeDay, setActiveDay] = useState('Monday');
  const [pdfPreview, setPdfPreview] = useState(null);
  const [reports, setReports] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [pendingReport, setPendingReport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Increased slightly for grid
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch reports
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setIsLoading(true);
    
    let unsubscribe = () => {};

    const initReports = async () => {
      try {
        const db = await getRdbInstance();
        if (!db) {
          console.error('Failed to initialize Firebase Realtime Database');
          setIsLoading(false);
          return;
        }

        const reportsRef = ref(db, 'reports');
        unsubscribe = onValue(
          reportsRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              const reportList = Object.entries(data).map(([key, value]) => ({
                id: key,
                ...value,
              }));
              const groupedReports = WEEK_DAYS.reduce((acc, day) => {
                acc[day] = reportList.filter((report) => report.day === day);
                return acc;
              }, {});
              setReports(groupedReports);
            } else {
              setReports(WEEK_DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {}));
            }
            setIsLoading(false);
          },
          (error) => {
            console.error('Error fetching reports:', error);
            toast.error('Failed to load reports');
            setIsLoading(false);
          }
        );
      } catch (err) {
        console.error('Error initializing reports:', err);
        setIsLoading(false);
      }
    };

    initReports();
    return () => unsubscribe();
  }, []);

  // Reset preview when day changes
  useEffect(() => {
    setPdfPreview(null);
    setSelectedReport(null);
    setCurrentPage(1);
  }, [activeDay]);

  const handlePreviewReport = (report) => {
    // If report has an OTP, require it. Otherwise open directly.
    if (report.otp && String(report.otp).trim().length > 0) {
      setPendingReport(report);
      setOtpInput('');
      setIsOtpOpen(true);
    } else {
      openReport(report);
    }
  };

  const openReport = (report) => {
    setSelectedReport(report);
    setPdfPreview(report);
    setIsPreviewOpen(true);
    setIsOtpOpen(false);
    setPendingReport(null);
    setOtpInput('');
  };

  const verifyOtpAndOpen = () => {
    if (!pendingReport) return;

    try {
      const expected = String(pendingReport.otp || '').trim();
      const entered = String(otpInput || '').trim();
      
      if (entered === expected) {
        openReport(pendingReport);
      } else {
        toast.error('Invalid OTP. Please check and try again.');
      }
    } catch (e) {
      console.error('OTP Error:', e);
      toast.error('Failed to verify OTP.');
    }
  };

  const handleDownload = (report) => {
    try {
      const fileSource = report?.file || report?.fileData;
      const filename = report?.filename || `${report?.title || 'report'}.pdf`;

      if (!fileSource) throw new Error('No file source found');

      const downloadBlob = (blob, name) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) link.parentNode.removeChild(link);
        URL.revokeObjectURL(url);
      };

      if (fileSource.startsWith('data:')) {
        const [meta, base64] = fileSource.split(',');
        const mimeMatch = meta.match(/data:([^;]+);base64/);
        const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
        const bin = atob(base64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        downloadBlob(new Blob([bytes], { type: mime }), filename);
      } else if (/^https?:\/\//i.test(fileSource)) {
        const link = document.createElement('a');
        link.href = fileSource;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) link.parentNode.removeChild(link);
      } else {
        const bin = atob(fileSource);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        downloadBlob(new Blob([bytes], { type: 'application/pdf' }), filename);
      }
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download report');
    }
  };

  // Filter and sort
  const currentDayReports = reports[activeDay] || [];
  const filteredReports = currentDayReports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortBy === 'size') {
      const sizeA = parseFloat(a.size) || 0;
      const sizeB = parseFloat(b.size) || 0;
      return sortOrder === 'asc' ? sizeA - sizeB : sizeB - sizeA;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full overflow-x-hidden bg-trasparent min-h-screen">
      <div className="max-w-7xl mx-auto px-4 text-center pt-10 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#003E29] mb-2">Research Reports</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Daily market analysis, technical insights, and financial reports.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-lg p-3 md:p-8 min-h-[400px] md:min-h-[600px]">
          
          {/* Controls Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
            <DaySelector activeDay={activeDay} setActiveDay={setActiveDay} />
            
            <div className="flex gap-2 w-full md:w-auto">
              <select
                className="px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:border-[#0F8B6E] outline-none"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title">Sort by Title</option>
                <option value="size">Sort by Size</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                {sortOrder === 'asc' ? 'Asc' : 'Desc'}
              </button>
            </div>
          </div>

          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            
            {/* Left: Report List */}
            <div className="lg:col-span-1 flex flex-col h-full">
              <h3 className="text-lg font-bold text-[#003E29] mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#0F8B6E] rounded-full"></span>
                {activeDay}'s Reports
              </h3>
              
              {isLoading ? (
                <LoadingSpinner />
              ) : paginatedReports.length > 0 ? (
                <div className="space-y-2 md:space-y-3">
                  {paginatedReports.map((report) => (
                    <motion.div
                      key={report.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => handlePreviewReport(report)}
                      className={`p-3 md:p-4 rounded-xl border transition-all cursor-pointer group ${
                        selectedReport?.id === report.id
                          ? 'border-[#0F8B6E] bg-[#0F8B6E]/5 shadow-md'
                          : 'border-gray-100 bg-white hover:border-[#0F8B6E]/30 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className={`font-bold text-sm mb-1 line-clamp-2 ${
                            selectedReport?.id === report.id ? 'text-[#0F8B6E]' : 'text-gray-800 group-hover:text-[#0F8B6E]'
                          }`}>
                            {report.title}
                          </h4>
                          <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full font-medium">
                            {report.category}
                          </span>
                        </div>
                        {report.otp && <FiLock className="text-amber-500 text-xs flex-shrink-0 mt-1" title="Password Protected" />}
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                        <span>{report.size}</span>
                        <span className="flex items-center gap-1 text-[#0F8B6E] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          View <FiEye />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm">No reports found for {activeDay}.</p>
                </div>
              )}

              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  paginate={paginate}
                />
              )}
            </div>

            {/* Right: Preview Area (Desktop) */}
            <div className="hidden lg:block lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 relative overflow-hidden">
              {pdfPreview ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="w-32 h-40 bg-white shadow-lg border border-gray-200 rounded-lg mb-6 flex items-center justify-center relative group cursor-pointer" onClick={() => setIsPreviewOpen(true)}>
                    <FiFileText className="text-5xl text-gray-300 group-hover:text-[#0F8B6E] transition-colors" />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <FiEye className="text-white text-2xl drop-shadow-md" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#003E29] mb-2 max-w-md">{pdfPreview.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-sm">{pdfPreview.description || 'No description available.'}</p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="px-6 py-2.5 bg-[#0F8B6E] hover:bg-[#0b6b54] text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      <FiEye /> Read Report
                    </button>
                    <button
                      onClick={() => handleDownload(pdfPreview)}
                      className="px-6 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-bold shadow-sm transition-all flex items-center gap-2"
                    >
                      <FiDownload /> Download
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FiFileText className="text-3xl opacity-50" />
                  </div>
                  <p className="font-medium">Select a report to preview</p>
                  <p className="text-sm opacity-70 mt-1">Click on any report from the list</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <AnimatePresence>
        {isOtpOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-[90%] max-w-xs md:max-w-sm p-4 md:p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="text-center mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-3">
                  <FiLock className="text-lg md:text-xl" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800">Protected Report</h3>
                <p className="text-[10px] md:text-xs text-gray-500 mt-1">Enter the 6-digit PIN to access this report</p>
              </div>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                autoFocus
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-gray-50 border border-gray-300 focus:border-[#0F8B6E] focus:ring-2 focus:ring-[#0F8B6E]/20 outline-none text-center text-lg md:text-2xl tracking-[0.5em] font-mono mb-4 md:mb-6 transition-all"
                placeholder="••••••"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, ''))}
              />

              <div className="flex gap-2 md:gap-3">
                <button
                  onClick={() => { setIsOtpOpen(false); setPendingReport(null); setOtpInput(''); }}
                  className="flex-1 py-2 md:py-2.5 border border-gray-300 rounded-lg text-sm md:text-base text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={verifyOtpAndOpen}
                  className="flex-1 py-2 md:py-2.5 bg-[#0F8B6E] hover:bg-[#0b6b54] text-white rounded-lg text-sm md:text-base font-bold shadow-md transition-colors"
                >
                  Unlock
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReportPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => {
          setIsPreviewOpen(false);
          // Don't clear selectedReport here so the right panel stays active
        }}
        report={selectedReport}
        onDownload={handleDownload}
      />
    </div>
  );
}

export default Reports;
