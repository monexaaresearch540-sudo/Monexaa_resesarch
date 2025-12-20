import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUser, FaMobileAlt, FaList, FaCommentDots, FaPaperPlane, FaCheckCircle, FaWhatsapp, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { getRdbInstance } from '../firebase';
import { push, ref, set } from 'firebase/database';

const ContactUs = () => {
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    serviceType: '',
    message: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "Stock Option",
    "Rapid Index",
    "Stock Future",
    "Option BTST",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    } else if (name === 'mobile') {
      // Only allow numbers
      const numericValue = value.replace(/\D/g, '');
      setForm({ ...form, [name]: numericValue });
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    } else {
      setForm({ ...form, [name]: value });
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = 'Please enter a valid Indian mobile number starting with 6-9';
    } else if (/^(\d)\1{9}$/.test(form.mobile)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email ID is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.serviceType) newErrors.serviceType = 'Please select a service';
    if (!form.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms to proceed';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        ...form,
        submittedAt: new Date().toISOString(),
        source: 'Contact Us Page'
      };

      // Save to Firebase
      const db = await getRdbInstance();
      if (db) {
        const newContactRef = push(ref(db, 'contact_inquiries'));
        await set(newContactRef, payload);
      }

      setStatus('success');

      // Google Tag Manager Tracking
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'form_submission',
        formType: 'Contact Us',
        service: form.serviceType
      });

      setForm({ fullName: '', mobile: '', email: '', serviceType: '', message: '', agreeToTerms: false });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Helmet>
        <title>Contact Us | Monexaa Research - Get in Touch for Expert Trading Advice</title>
        <meta name="description" content="Connect with Monexaa Research for premium stock market guidance. Reach our support team via phone, email, or visit our Indore office. We are here to assist your trading journey." />
        <meta name="keywords" content="Contact Monexaa Research, Stock Market Customer Care, Trading Support Number, Monexaa Research Address, Share Market Advisory Contact, Financial Consultant Phone Number, Indore Stock Advisory Office" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.monexaaresearch.com/contact-us" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.monexaaresearch.com/contact-us" />
        <meta property="og:title" content="Contact Us | Monexaa Research - Get in Touch for Expert Trading Advice" />
        <meta property="og:description" content="Connect with Monexaa Research for premium stock market guidance. Reach our support team via phone, email, or visit our Indore office." />
        <meta property="og:image" content="https://www.monexaaresearch.com/assest/logo/logo2.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.monexaaresearch.com/contact-us" />
        <meta property="twitter:title" content="Contact Us - Monexaa Research | Get Expert Trading Support" />
        <meta property="twitter:description" content="Contact Monexaa Research for expert stock market tips and support. Reach out via phone, email, or visit our office." />
        <meta property="twitter:image" content="https://www.monexaaresearch.com/assest/logo/logo2.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Monexaa Research",
              "description": "Get in touch with Monexaa Research for expert stock market advice and trading support.",
              "url": "https://www.monexaaresearch.com/contact-us",
              "mainEntity": {
                "@type": "Organization",
                "name": "Monexaa Research",
                "telephone": "+91 62326 78136",
                "email": "support@monexaaresearch.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "261, PU-4, Plot No. 26, Scheme No. 54",
                  "addressLocality": "Indore",
                  "addressRegion": "Madhya Pradesh",
                  "postalCode": "452010",
                  "addressCountry": "IN"
                }
              }
            }
          `}
        </script>
      </Helmet>

      <div className="text-center pt-6 pb-4 px-4">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#003E29] mb-2">Get in Touch</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          Have questions? We are here to help you navigate the markets.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-8 relative z-20">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
          
          {/* Contact Information Side - Ultra Compact */}
          <div className="lg:w-4/12 bg-[#003E29] text-white p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-lg md:text-xl font-bold mb-2">Contact Info</h2>
              <p className="text-green-100 mb-4 text-xs md:text-sm">Fill up the form and our team will get back to you within 24 hours.</p>
              
              <div className="space-y-3 md:space-y-4">
                <a href="tel:+916232678136" className="flex items-start gap-2 hover:bg-white/5 p-2 rounded-lg transition-all group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F8B6E] transition-colors">
                    <FaPhoneAlt className="text-white text-xs" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Phone</h3>
                    <p className="text-green-100 text-xs group-hover:text-white transition-colors">+91 62326 78136</p>
                    <p className="text-green-100 text-[10px] group-hover:text-white transition-colors">(Mon-Fri, 9-6 PM)</p>
                  </div>
                </a>

                <a href="https://wa.me/916232678136" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:bg-white/5 p-2 rounded-lg transition-all group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F8B6E] transition-colors">
                    <FaWhatsapp className="text-white text-xs" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">WhatsApp</h3>
                    <p className="text-green-100 text-xs group-hover:text-white transition-colors">+91 62326 78136</p>
                  </div>
                </a>

                <a href="mailto:support@monexaaresearch.com" className="flex items-start gap-2 hover:bg-white/5 p-2 rounded-lg transition-all group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F8B6E] transition-colors">
                    <FaEnvelope className="text-white text-xs" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Email</h3>
                    <p className="text-green-100 text-xs group-hover:text-white transition-colors">support@monexaaresearch.com</p>
                  </div>
                </a>

                <a href="https://www.google.com/maps/search/?api=1&query=Monexaa+Research,+Indore" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 hover:bg-white/5 p-2 rounded-lg transition-all group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0F8B6E] transition-colors">
                    <FaMapMarkerAlt className="text-white text-xs" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Address</h3>
                    <p className="text-green-100 text-xs group-hover:text-white transition-colors">
                      261, PU-4, Plot No. 26, Scheme No. 54,<br/>
                      Indore, Madhya Pradesh – 452010
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-6 relative z-10">
              <div className="flex gap-3">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0F8B6E] transition-colors cursor-pointer flex items-center justify-center text-white" aria-label="Facebook">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href="https://www.linkedin.com/company/monexaa-research/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0F8B6E] transition-colors cursor-pointer flex items-center justify-center text-white" aria-label="LinkedIn">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href="https://x.com/MonexaaResearch" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0F8B6E] transition-colors cursor-pointer flex items-center justify-center text-white" aria-label="Twitter">
                  <FaTwitter className="text-sm" />
                </a>
                <a href="https://www.instagram.com/monexaa_research/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#0F8B6E] transition-colors cursor-pointer flex items-center justify-center text-white" aria-label="Instagram">
                  <FaInstagram className="text-sm" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Side - Ultra Compact */}
          <div className="lg:w-8/12 p-5 md:p-6 bg-white">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <FaUser className="text-[#0F8B6E]" /> Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={`w-full px-3 py-1.5 rounded bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <FaMobileAlt className="text-[#0F8B6E]" /> Mobile <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    className={`w-full px-3 py-1.5 rounded bg-gray-50 border ${errors.mobile ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm`}
                    placeholder="9876543210"
                  />
                  {errors.mobile && <p className="text-red-500 text-[10px] mt-0.5">{errors.mobile}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Email ID */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <FaEnvelope className="text-[#0F8B6E]" /> Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-1.5 rounded bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all text-sm`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
                </div>

                {/* Service Interested In */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                    <FaList className="text-[#0F8B6E]" /> Service <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="serviceType"
                      value={form.serviceType}
                      onChange={handleChange}
                      className={`w-full px-3 py-1.5 rounded bg-gray-50 border ${errors.serviceType ? 'border-red-500' : 'border-gray-200'} focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all appearance-none text-sm`}
                    >
                      <option value="">Select Service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 text-xs">
                      ▼
                    </div>
                  </div>
                  {errors.serviceType && <p className="text-red-500 text-[10px] mt-0.5">{errors.serviceType}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                  <FaCommentDots className="text-[#0F8B6E]" /> Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-3 py-1.5 rounded bg-gray-50 border border-gray-200 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E]/20 outline-none transition-all resize-none text-sm"
                  placeholder="Your requirements..."
                ></textarea>
              </div>

              {/* Consent Checkbox */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={form.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 w-3 h-3 text-[#0F8B6E] border-gray-300 rounded focus:ring-[#0F8B6E]"
                  />
                  <span className="text-[10px] text-gray-600 leading-tight">
                    I agree to the <a href="/terms-and-conditions" className="text-[#0F8B6E] hover:underline">Terms</a> & <a href="/privacy-policy" className="text-[#0F8B6E] hover:underline">Privacy Policy</a> and authorize Monexaa Research to contact me via Call/SMS/WhatsApp even if I am registered on DND.
                  </span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-[10px] mt-0.5 ml-5">{errors.agreeToTerms}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#0F8B6E] hover:bg-[#0b6b54] text-white font-bold py-2.5 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>

              {/* Success Message */}
              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-2 rounded-lg flex items-center gap-2 animate-fade-in-up">
                  <FaCheckCircle className="text-green-500 text-base" />
                  <div>
                    <p className="font-bold text-xs">Sent Successfully!</p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-2 rounded-lg text-center">
                  <p className="text-xs">Error. Try again.</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <section className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#003E29]">How We Help You</h2>
          <p className="text-sm text-gray-600 mt-2">Simple 3-step process to start your journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#FFF4E9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0F8B6E] font-bold text-xl">1</div>
            <h3 className="font-bold text-gray-800 mb-2">Fill the Form</h3>
            <p className="text-xs text-gray-500">Share your details and requirements with us.</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#FFF4E9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0F8B6E] font-bold text-xl">2</div>
            <h3 className="font-bold text-gray-800 mb-2">Expert Analysis</h3>
            <p className="text-xs text-gray-500">Our team analyzes your profile and needs.</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#FFF4E9] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0F8B6E] font-bold text-xl">3</div>
            <h3 className="font-bold text-gray-800 mb-2">Get Support</h3>
            <p className="text-xs text-gray-500">Receive personalized guidance and start trading.</p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-48 md:h-64 w-full bg-gray-200 relative">
        <iframe 
          src="https://maps.google.com/maps?q=Monexaa+Research,+Indore&t=&z=17&ie=UTF8&iwloc=&output=embed"
          width="100%" 
          height="100%" 
          style={{border:0}} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Office Location"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        ></iframe>
      </section>
    </div>
  );
}

export default ContactUs;
