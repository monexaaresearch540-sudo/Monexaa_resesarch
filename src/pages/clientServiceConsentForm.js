import React, { useState } from 'react';
import { FaUser, FaIdCard, FaEnvelope, FaCalendar, FaCreditCard, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaPhone } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'https://monexaa-resesarch.onrender.com';

export default function ClientServiceConsentForm() {
  const [formData, setFormData] = useState({
    clientName: '',
    clientId: '',
    fatherName: '',
    mobile: '',
    email: '',
    dob: '',
    pan: '',
    aadhaar: '',
    address: ''
  });
  
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Validation function
  function validate() {
    const e = {};
    if (!formData.clientName.trim()) e.clientName = 'Client name is required';
    if (!formData.fatherName.trim()) e.fatherName = "Father's/Spouse's name is required";
    
    // Mobile validation - Indian numbers only (6-9 se start)
    if (!formData.mobile.trim()) {
      e.mobile = 'Mobile number is required';
    } else if (!/^[6-9][0-9]{9}$/.test(formData.mobile)) {
      e.mobile = 'Enter a valid 10-digit Indian mobile number starting with 6-9';
    }
    
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = 'Enter a valid email';
    
    if (!formData.dob.trim()) e.dob = 'Date of birth is required';
    
    // PAN validation
    if (!formData.pan.trim()) {
      e.pan = 'PAN is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      e.pan = 'Enter a valid PAN (e.g., ABCDE1234F)';
    }
    
    // Aadhaar validation - 12 digits
    if (!formData.aadhaar.trim()) {
      e.aadhaar = 'Aadhaar number is required';
    } else if (!/^[2-9][0-9]{11}$/.test(formData.aadhaar.replace(/\s/g, ''))) {
      e.aadhaar = 'Enter a valid 12-digit Aadhaar number';
    }
    
    if (!formData.address.trim()) e.address = 'Address is required';
    return e;
  }

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    
    // Auto-uppercase PAN and only allow valid characters
    if (name === 'pan') {
      const upperValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (upperValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: upperValue }));
      }
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
      return;
    }
    
    // Only allow digits for mobile - max 10
    if (name === 'mobile') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: digits }));
      }
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
      return;
    }
    
    // Only allow digits for Aadhaar - max 12
    if (name === 'aadhaar') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 12) {
        setFormData(prev => ({ ...prev, [name]: digits }));
      }
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  // Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setStatus(null);
    setErrors({});

    try {
      // Call API to send e-signature request
      const response = await fetch(`${API_URL}/api/client-information`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ 
          type: 'success', 
          message: data.message
        });
        
        // Reset form
        setFormData({
          clientName: '',
          clientId: '',
          fatherName: '',
          mobile: '',
          email: '',
          dob: '',
          pan: '',
          aadhaar: '',
          address: ''
        });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setStatus({ 
          type: 'error', 
          message: data.message || 'Failed to submit form. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="text-center pt-6 pb-4 px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#003E29] mb-2">Client Information Form</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Please fill in your details for e-signature consent
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-8 relative z-20">
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-5 md:p-8 animate-fadeInUp">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Client Name */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1 md:mb-2 flex items-center gap-1">
                  <FaUser className="text-[#0F8B6E] text-xs" /> Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-3 py-2 md:py-2.5 rounded bg-gray-50 border ${errors.clientName ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm`}
                />
                {errors.clientName && (
                  <p className="text-red-500 text-[10px] md:text-xs mt-0.5">{errors.clientName}</p>
                )}
              </div>

              {/* Father's/Spouse's Name */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1 md:mb-2 flex items-center gap-1">
                  <FaUser className="text-[#0F8B6E] text-xs" /> Father's/Spouse's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter father's/spouse's name"
                  className={`w-full px-3 py-2 md:py-2.5 rounded bg-gray-50 border ${errors.fatherName ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm`}
                />
                {errors.fatherName && (
                  <p className="text-red-500 text-[10px] md:text-xs mt-0.5">{errors.fatherName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Client ID (Optional) */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1 md:mb-2 flex items-center gap-1">
                  <FaIdCard className="text-[#0F8B6E] text-xs" /> Client ID <span className="text-[10px] md:text-xs text-gray-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  placeholder="Enter client ID (optional)"
                  maxLength="50"
                  className="w-full px-3 py-2 md:py-2.5 rounded bg-gray-50 border border-gray-200 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1 md:mb-2 flex items-center gap-1">
                  <FaPhone className="text-[#0F8B6E] text-xs" /> Mobile <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  maxLength="10"
                  className={`w-full px-3 py-2 md:py-2.5 rounded bg-gray-50 border ${errors.mobile ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm`}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-[10px] md:text-xs mt-0.5">{errors.mobile}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Email */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1 md:mb-2 flex items-center gap-1">
                  <FaEnvelope className="text-[#0F8B6E] text-xs" /> Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full px-3 py-2 md:py-2.5 rounded bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm`}
                />
                {errors.email && (
                  <p className="text-red-500 text-[10px] md:text-xs mt-0.5">{errors.email}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1 md:mb-2 flex items-center gap-1">
                  <FaCalendar className="text-[#0F8B6E] text-xs" /> Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className={`w-full px-3 py-2 md:py-2.5 rounded bg-gray-50 border ${errors.dob ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm`}
                />
                {errors.dob && (
                  <p className="text-red-500 text-[10px] md:text-xs mt-0.5">{errors.dob}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

              {/* PAN */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1 md:mb-2 flex items-center gap-1">
                  <FaCreditCard className="text-[#0F8B6E] text-xs" /> PAN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  onChange={handleChange}
                  placeholder="ABCDE1234F"
                  maxLength="10"
                  className={`w-full px-3 py-2 md:py-2.5 rounded bg-gray-50 border ${errors.pan ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all uppercase text-sm`}
                />
                {errors.pan && (
                  <p className="text-red-500 text-[10px] md:text-xs mt-0.5">{errors.pan}</p>
                )}
              </div>

              {/* Aadhaar */}
              <div>
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1 md:mb-2 flex items-center gap-1">
                  <FaIdCard className="text-[#0F8B6E] text-xs" /> Aadhaar <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  placeholder="Enter 12-digit Aadhaar number"
                  maxLength="12"
                  className={`w-full px-3 py-2 md:py-2.5 rounded bg-gray-50 border ${errors.aadhaar ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm`}
                />
                {errors.aadhaar && (
                  <p className="text-red-500 text-[10px] md:text-xs mt-0.5">{errors.aadhaar}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs md:text-sm font-bold text-gray-700 mb-1 md:mb-2 flex items-center gap-1">
                <FaMapMarkerAlt className="text-[#0F8B6E] text-xs" /> Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your complete address"
                rows="2"
                className={`w-full px-3 py-2 md:py-2.5 rounded bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all resize-none text-sm`}
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-[10px] md:text-xs mt-0.5">{errors.address}</p>
              )}
            </div>

            {/* Status Messages */}
            {status && (
              <div className={`p-3 md:p-4 rounded-lg flex items-center gap-2 md:gap-3 ${
                status.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {status.type === 'success' && <FaCheckCircle className="text-base md:text-xl flex-shrink-0" />}
                <span className="font-medium text-xs md:text-sm">{status.message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 md:py-3 px-4 md:px-6 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 text-sm md:text-base ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#0F8B6E] hover:bg-[#0b6b54] shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-xs md:text-sm" />
                  <span>Submit Form</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Info Note */}
      <div className="max-w-4xl mx-auto px-4 pb-6 md:pb-8">
        <div className="text-center text-[10px] md:text-sm text-gray-600 bg-blue-50 p-3 md:p-4 rounded-lg">
          <p>
            📧 After submission, you will receive an e-signature link via email. 
            Please check your inbox and spam folder.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
