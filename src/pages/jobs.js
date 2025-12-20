import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaBriefcase, FaUserTie, FaChartLine, FaHandshake, FaFileUpload, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { getRdbInstance } from '../firebase';
import { ref, push, onValue } from 'firebase/database';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Jobs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fileProcessing, setFileProcessing] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: ''
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit file size to 5MB for Realtime Database storage
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      e.target.value = null; // Reset input
      return;
    }

    setFileProcessing(true);
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setResumeData({
        name: file.name,
        base64: reader.result
      });
      setFileProcessing(false);
    };

    reader.onerror = () => {
      toast.error("Error reading file. Please try again.");
      setFileProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setResumeData(null);
    // We can't easily reset the file input value from here without a ref, 
    // but the user can just click the input again to replace it.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (fileProcessing) {
      toast.info("Please wait, processing resume file...");
      return;
    }

    setSubmitting(true);

    if (!resumeData) {
      toast.error("Please upload your resume.");
      setSubmitting(false);
      return;
    }

    try {
      const rdb = await getRdbInstance();

      // Save Application Data with Base64 Resume
      const applicationsRef = ref(rdb, 'job_applications');
      await push(applicationsRef, {
        ...formData,
        resumeName: resumeData.name,
        resumeBase64: resumeData.base64,
        timestamp: Date.now(),
        status: 'new'
      });

      toast.success("Application submitted successfully!");
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        message: ''
      });
      setResumeData(null);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(`Failed to submit: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'FaChartLine': return <FaChartLine />;
      case 'FaHandshake': return <FaHandshake />;
      case 'FaUserTie': return <FaUserTie />;
      default: return <FaBriefcase />;
    }
  };

  return (
    <div className="w-full bg-transparent">
      <Helmet>
        <title>Careers at Monexaa Research | Join Top SEBI Registered Analyst Team</title>
        <meta name="description" content="Explore career opportunities at Monexaa Research. We are hiring talented Research Analysts, Sales Executives, and Support Staff. Grow your career in the stock market industry with us." />
        <meta name="keywords" content="Careers at Monexaa Research, Stock Market Jobs Indore, Research Analyst Jobs, Business Development Executive Vacancy, Finance Jobs India, Share Market Career, Work at Monexaa, Investment Advisory Jobs" />
        <link rel="canonical" href="https://monexaaresearch.com/jobs" />
      </Helmet>
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#003E29] mb-3">
            Join Our Team
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Build a rewarding career in the financial markets with a SEBI Registered Investment Adviser.
          </p>
          <div className="w-24 h-1 bg-[#0F8B6E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          
          {/* Job Listings */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-4 flex items-center gap-2">
              <FaBriefcase /> Current Openings
            </h2>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <FaSpinner className="animate-spin text-3xl text-[#0F8B6E]" />
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <motion.div 
                  key={job.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-50 text-[#0F8B6E] rounded-lg text-xl">
                      {getIcon(job.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#003E29]">{job.title}</h3>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1 mb-2">
                        <span className="bg-gray-100 px-2 py-1 rounded">{job.type}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{job.experience}</span>
                      </div>
                      <p className="text-sm text-gray-600 text-justify">{job.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white p-6 rounded-xl border border-gray-200 text-center text-gray-500">
                <p>No current openings. Please check back later.</p>
              </div>
            )}
          </div>

          {/* Application Form */}
          <div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-8">
              <h2 className="text-xl font-bold text-[#0F8B6E] mb-4 flex items-center gap-2">
                <FaPaperPlane /> Apply Now
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Ready to take the next step? Fill out the form below and we will get back to you.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F8B6E] focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F8B6E] focus:border-transparent outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F8B6E] focus:border-transparent outline-none transition-all"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position Applied For</label>
                  <select 
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F8B6E] focus:border-transparent outline-none transition-all"
                    required
                  >
                    <option value="">Select a position</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume (PDF/Doc - Max 5MB)</label>
                  <div className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors ${resumeData ? 'border-[#0F8B6E] bg-green-50' : 'border-gray-300 hover:border-[#0F8B6E] cursor-pointer'}`}>
                    {!resumeData && (
                      <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        accept=".pdf,.doc,.docx" 
                      />
                    )}
                    
                    {fileProcessing ? (
                      <div className="flex flex-col items-center justify-center text-[#0F8B6E]">
                        <FaSpinner className="animate-spin text-xl mb-2" />
                        <p className="text-xs">Processing file...</p>
                      </div>
                    ) : resumeData ? (
                      <div className="relative z-10">
                        <FaFileUpload className="mx-auto text-[#0F8B6E] text-xl mb-2" />
                        <p className="text-sm font-medium text-[#003E29] mb-1">{resumeData.name}</p>
                        <button 
                          type="button"
                          onClick={removeFile}
                          className="text-xs text-red-500 hover:text-red-700 underline"
                        >
                          Remove / Change File
                        </button>
                      </div>
                    ) : (
                      <>
                        <FaFileUpload className="mx-auto text-gray-400 text-xl mb-2" />
                        <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0F8B6E] focus:border-transparent outline-none transition-all"
                    placeholder="Tell us why you are a good fit..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-[#0F8B6E] text-white font-bold py-3 rounded-lg hover:bg-[#003E29] transition-colors shadow-md flex justify-center items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default Jobs;
