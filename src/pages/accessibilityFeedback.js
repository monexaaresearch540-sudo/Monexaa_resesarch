import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { getRdbInstance } from '../firebase';
import { ref, push, set } from 'firebase/database';
import { 
  FaUniversalAccess, 
  FaPaperPlane, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaWheelchair,
  FaBlind,
  FaDeaf,
  FaKeyboard,
  FaSpinner
} from 'react-icons/fa';

// ==========================================
// ANIMATION VARIANTS
// ==========================================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function AccessibilityFeedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    issueType: 'navigation',
    url: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const rdb = await getRdbInstance();
      const feedbackRef = ref(rdb, 'accessibility_feedback');
      const newFeedbackRef = push(feedbackRef);
      
      await set(newFeedbackRef, {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'new'
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', issueType: 'navigation', url: '', description: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setIsSubmitting(false);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-sans text-gray-800">
      <Helmet>
        <title>Accessibility Feedback | Monexaa Research</title>
        <meta name="description" content="Help us improve our website accessibility. Report issues or provide suggestions to make Monexaa Research more inclusive." />
        <meta name="keywords" content="Accessibility Feedback, Report Issue, Inclusive Design, Web Accessibility, Monexaa Support" />
        <link rel="canonical" href="https://www.monexaaresearch.com/accessibility-feedback" />
      </Helmet>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      >
        
        {/* HEADER SECTION */}
        <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-4 shadow-sm">
            <FaUniversalAccess className="text-3xl text-[#0F8B6E]" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#003E29] mb-3 tracking-tight">
            Accessibility <span className="text-[#0F8B6E]">Feedback</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are committed to ensuring digital accessibility for people with disabilities. 
            If you encounter any barriers, please let us know so we can improve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
          {/* LEFT COLUMN: FORM */}
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#0F8B6E]"></div>
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#003E29] mb-5 flex items-center gap-2">
                  <FaPaperPlane className="text-[#0F8B6E]" /> Submit a Report
                </h2>

                <AnimatePresence mode='wait'>
                  {isSubmitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaCheckCircle className="text-2xl text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-green-800 mb-2">Thank You!</h3>
                      <p className="text-sm text-green-700">
                        Your feedback has been submitted successfully. Our team will review the issue and take necessary actions.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 text-xs font-bold text-[#0F8B6E] hover:underline"
                      >
                        Submit another report
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700">Your Name</label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#0F8B6E] focus:bg-white focus:ring-2 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700">Email Address</label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#0F8B6E] focus:bg-white focus:ring-2 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Type of Issue</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            { id: 'visual', icon: FaBlind, label: 'Visual' },
                            { id: 'auditory', icon: FaDeaf, label: 'Auditory' },
                            { id: 'navigation', icon: FaKeyboard, label: 'Nav' },
                            { id: 'other', icon: FaExclamationTriangle, label: 'Other' }
                          ].map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, issueType: type.id })}
                              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                                formData.issueType === type.id 
                                  ? 'bg-[#0F8B6E] text-white border-[#0F8B6E] shadow-md' 
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#0F8B6E] hover:bg-green-50'
                              }`}
                            >
                              <type.icon className="text-base mb-1" />
                              <span className="text-[10px] font-bold">{type.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Page URL (Optional)</label>
                        <input 
                          type="url" 
                          name="url"
                          value={formData.url}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#0F8B6E] focus:bg-white focus:ring-2 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm"
                          placeholder="https://www.monexaaresearch.com/..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700">Description of the Issue</label>
                        <textarea 
                          name="description"
                          required
                          value={formData.description}
                          onChange={handleChange}
                          rows="3"
                          className="w-full px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#0F8B6E] focus:bg-white focus:ring-2 focus:ring-[#0F8B6E]/20 outline-none transition-all resize-none text-sm"
                          placeholder="Please describe the barrier you encountered..."
                        ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-[#003E29] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#0F8B6E] transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin" /> Submitting...
                          </>
                        ) : (
                          <>
                            Submit Feedback <FaPaperPlane />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: INFO & CONTACT */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 space-y-5">
            
            {/* Contact Card */}
            <div className="bg-[#003E29] text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#0F8B6E] rounded-full opacity-20 blur-xl -mr-8 -mt-8"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#0F8B6E] rounded-full opacity-20 blur-xl -ml-8 -mb-8"></div>
              
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                <FaPhoneAlt className="text-[#0F8B6E]" /> Direct Support
              </h3>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <p className="text-green-200 text-[10px] font-bold uppercase tracking-wider mb-0.5">Accessibility Coordinator</p>
                  <p className="text-base font-bold">Mr. Satish Kumar Pandey</p>
                </div>
                
                <div>
                  <p className="text-green-200 text-[10px] font-bold uppercase tracking-wider mb-0.5">Phone</p>
                  <a href="tel:+916232678136" className="text-base font-bold hover:text-[#0F8B6E] transition-colors flex items-center gap-2">
                    +91 62326 78136
                  </a>
                </div>

                <div>
                  <p className="text-green-200 text-[10px] font-bold uppercase tracking-wider mb-0.5">Email</p>
                  <a href="mailto:support@Monexaaresearch.com" className="text-base font-bold hover:text-[#0F8B6E] transition-colors flex items-center gap-2">
                    support@Monexaaresearch.com
                  </a>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h3 className="text-base font-bold text-[#003E29] mb-3 flex items-center gap-2">
                <FaWheelchair className="text-[#0F8B6E]" /> Our Commitment
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed mb-3">
                Monexaa Research strives to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. We regularly test our website using assistive technologies.
              </p>
              <ul className="space-y-2">
                {[
                  "Screen reader compatibility",
                  "Keyboard navigation support",
                  "High contrast text ratios",
                  "Alt text for images"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
