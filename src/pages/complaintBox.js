import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push } from 'firebase/database';
import { getRdbInstance } from '../firebase';
import { toast } from 'react-toastify';
import {
  FaExclamationTriangle,
  FaPaperPlane,
  FaCheckCircle,
  FaRegClock,
  FaUserTie
} from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';

const ComplaintBox = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    complaintType: '',
    description: '',
    resolution: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDb = async () => {
      const database = await getRdbInstance();
      setDb(database);
    };
    initDb();
  }, []);

  const complaintTypes = [
    "Service Delay", "Research Quality", "Miscommunication",
    "Refund Request", "Technical Issue", "Billing Problem", "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentStep(4);

    if (!db) {
        toast.error("Database connection not initialized. Please try again.");
        setCurrentStep(3);
        return;
    }

    // Save complaint to RTDB
    try {
      const newComplaint = {
        ...formData,
        timestamp: Date.now()
      };
      
      await push(ref(db, 'complaints'), newComplaint);
      setSubmitted(true);

    } catch (error) {
      console.error('Error saving complaint:', error);
      toast.error('Failed to submit complaint: ' + error.message);
      setCurrentStep(3); // return to review so user can retry
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <>
      <Helmet>
        <title>Lodge a Complaint | Monexaa Research - Grievance Redressal</title>
        <meta name="description" content="Submit your complaints or grievances to Monexaa Research. We are committed to resolving client issues promptly and transparently as per SEBI guidelines." />
        <meta name="keywords" content="Monexaa Research Complaint, Lodge Grievance, Customer Complaint Form, Stock Market Dispute, SEBI Complaint Redressal, Investor Grievance, Monexaa Support" />
        <link rel="canonical" href="https://monexaaresearch.com/complaint-box" />
      </Helmet>
      
      <div className="text-center pt-6 pb-2 px-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#003E29] mb-2">Complaint Box</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          We are here to help. Please submit your grievances below.
        </p>
      </div>

      <motion.section
        className="relative py-2 sm:py-6 px-3 sm:px-6 bg-transparent min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-lg md:max-w-2xl mx-auto">
            {/* Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 relative overflow-hidden">
              
              {/* Header inside card */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#0F8B6E]/10 text-[#0F8B6E] rounded-full mb-3 sm:mb-4">
                  <RiCustomerService2Fill className="text-2xl sm:text-3xl" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#003E29] mb-2">
                  Investor Grievance Portal
                </h2>
                <p className="text-gray-600 text-xs sm:text-base">
                  Your concerns are our priority. We are committed to resolving complaints within <span className="font-bold text-[#0F8B6E]">7 working days</span>.
                </p>
              </motion.div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between relative">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full"></div>
                  <div 
                    className="absolute top-1/2 left-0 h-1 bg-[#0F8B6E] -translate-y-1/2 z-0 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                  ></div>
                  
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                          currentStep >= step ? 'bg-[#0F8B6E] text-white shadow-md' : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step === 4 ? <FaCheckCircle /> : step}
                      </div>
                      <span className={`mt-2 text-[10px] sm:text-xs font-medium ${currentStep >= step ? 'text-[#0F8B6E]' : 'text-gray-400'}`}>
                        {['Details', 'Complaint', 'Review', 'Submit'][step - 1]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Step 1: Personal Info */}
                        {currentStep === 1 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[#003E29] flex items-center gap-2 mb-4">
                                    <FaUserTie className="text-[#0F8B6E]" /> Your Information
                                </h3>
                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email / Client ID *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                                        <input
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all"
                                            placeholder="Enter your mobile number"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.name || !formData.email || !formData.mobile}
                                        className="px-6 py-2.5 bg-[#0F8B6E] hover:bg-[#0b6b54] text-white rounded-lg font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Complaint Details */}
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[#003E29] flex items-center gap-2 mb-4">
                                    <FaExclamationTriangle className="text-[#0F8B6E]" /> Complaint Details
                                </h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nature of Complaint *</label>
                                    <select
                                        name="complaintType"
                                        value={formData.complaintType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all bg-white"
                                    >
                                        <option value="">Select complaint type</option>
                                        {complaintTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all resize-none"
                                        placeholder="Please describe your issue in detail..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Resolution</label>
                                    <input
                                        type="text"
                                        name="resolution"
                                        value={formData.resolution}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all"
                                        placeholder="How would you like this resolved?"
                                    />
                                </div>
                                <div className="flex justify-between mt-6">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.complaintType || !formData.description}
                                        className="px-6 py-2.5 bg-[#0F8B6E] hover:bg-[#0b6b54] text-white rounded-lg font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review */}
                        {currentStep === 3 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[#003E29] flex items-center gap-2 mb-4">
                                    <FaRegClock className="text-[#0F8B6E]" /> Review Your Complaint
                                </h3>
                                <div className="bg-white p-4 rounded-lg space-y-3 text-sm border border-gray-100">
                                    <div className="grid grid-cols-3 gap-2">
                                        <span className="font-semibold text-gray-600">Name:</span>
                                        <span className="col-span-2 text-gray-900">{formData.name}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <span className="font-semibold text-gray-600">Email:</span>
                                        <span className="col-span-2 text-gray-900">{formData.email}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <span className="font-semibold text-gray-600">Mobile:</span>
                                        <span className="col-span-2 text-gray-900">{formData.mobile}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <span className="font-semibold text-gray-600">Type:</span>
                                        <span className="col-span-2 text-gray-900">{formData.complaintType}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <span className="font-semibold text-gray-600">Description:</span>
                                        <span className="col-span-2 text-gray-900">{formData.description}</span>
                                    </div>
                                    {formData.resolution && (
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="font-semibold text-gray-600">Resolution:</span>
                                            <span className="col-span-2 text-gray-900">{formData.resolution}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex items-start gap-3 mt-4">
                                    <input 
                                        id="confirm" 
                                        type="checkbox" 
                                        required 
                                        className="mt-1 w-4 h-4 text-[#0F8B6E] border-gray-300 rounded focus:ring-[#0F8B6E]" 
                                    />
                                    <label htmlFor="confirm" className="text-xs text-gray-600">
                                        I confirm this complaint is genuine and understand it will be registered as per SEBI compliance.
                                    </label>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 bg-[#0F8B6E] hover:bg-[#0b6b54] text-white rounded-lg font-bold shadow-md transition-colors"
                                    >
                                        Submit Complaint
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Loading */}
                        {currentStep === 4 && (
                            <div className="flex flex-col items-center justify-center py-12">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    <FaPaperPlane className="text-[#0F8B6E] text-5xl mb-6" />
                                </motion.div>
                                <h3 className="text-xl font-bold text-[#003E29] mb-2">Submitting...</h3>
                                <p className="text-gray-500">Please wait while we register your complaint.</p>
                            </div>
                        )}
                    </motion.form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FaCheckCircle className="text-4xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#003E29] mb-2">Complaint Registered!</h2>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                            Your complaint has been successfully submitted. Our team will review it and get back to you within 7 working days.
                        </p>
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setCurrentStep(1);
                                setFormData({ name: '', email: '', mobile: '', complaintType: '', description: '', resolution: '' });
                            }}
                            className="px-6 py-2.5 bg-[#0F8B6E] hover:bg-[#0b6b54] text-white rounded-lg font-bold shadow-md transition-colors"
                        >
                            Submit Another Complaint
                        </button>
                    </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </motion.section>
    </>
  );
};

export default ComplaintBox;
