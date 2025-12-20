import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaBalanceScale, 
  FaGavel, 
  FaUserShield, 
  FaFileContract, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaBuilding
} from 'react-icons/fa';

// ==========================================
// DATA CONFIGURATION
// ==========================================

const SEBI_DETAILS = {
  name: "Satish Kumar Pandey proprietor of Monexaa Research",
  type: "Individual",
  regNumber: "INH000020387",
  validity: "May 08, 2025 till perpetual",
  website: "www.Monexaaresearch.com",
  sebiLink: "https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14"
};

const CONTACT_MATRIX = [
  {
    designation: "Customer Care",
    person: "Mr. Satish Kumar Pandey",
    address: "261, Plot No 26, PU-4 Scheme No- 54, Vijay Nagar Indore, 452010",
    phone: "+916232678136",
    email: "support@Monexaaresearch.com",
    hours: "Mon-Fri 10 AM – 05 PM (Holidays off)"
  },
  {
    designation: "Compliance Officer",
    person: "Mr. Satish Kumar Pandey",
    address: "261, Plot No 26, PU-4 Scheme No- 54, Vijay Nagar Indore, 452010",
    phone: "+916232678136",
    email: "support@Monexaaresearch.com",
    hours: "Mon-Fri 10 AM – 05 PM (Holidays off)"
  },
  {
    designation: "CEO",
    person: "Mr. Satish Kumar Pandey",
    address: "261, Plot No 26, PU-4 Scheme No- 54, Vijay Nagar Indore, 452010",
    phone: "+916232678136",
    email: "support@Monexaaresearch.com",
    hours: "Mon-Fri 10 AM – 05 PM (Holidays off)"
  },
  {
    designation: "Principal Officer",
    person: "Mr. Satish Kumar Pandey",
    address: "261, Plot No 26, PU-4 Scheme No- 54, Vijay Nagar Indore, 452010",
    phone: "+916232678136",
    email: "support@Monexaaresearch.com",
    hours: "Mon-Fri 10 AM – 05 PM (Holidays off)"
  }
];

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

export default function GrievanceRedressal() {
  return (
    <div className="min-h-screen bg-transparent font-sans text-gray-800">
      <Helmet>
        <title>Grievance Redressal Policy | Monexaa Research - Investor Support</title>
        <meta name="description" content="Read Monexaa Research's Grievance Redressal Policy. Find contact details of our Compliance Officer and steps to escalate complaints as per SEBI norms." />
        <meta name="keywords" content="Grievance Redressal Policy, Investor Complaints, SEBI SCORES, Compliance Officer Contact, Monexaa Research Grievance, Stock Market Dispute Resolution, Investor Protection" />
        <link rel="canonical" href="https://www.monexaaresearch.com/grievance-redressal" />
      </Helmet>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        
        {/* HEADER SECTION */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-4">
            <FaBalanceScale className="text-3xl text-[#0F8B6E]" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#003E29] mb-4 tracking-tight">
            Grievance <span className="text-[#0F8B6E]">Redressal</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At Monexaa Research, we are committed to resolving your concerns promptly and fairly. 
            Transparency and client satisfaction are our core values.
          </p>
        </motion.div>

        {/* SEBI REGISTRATION CARD */}
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003E29] to-[#0F8B6E]"></div>
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                <FaUserShield className="text-2xl text-[#0F8B6E]" />
                <h2 className="text-2xl font-bold text-[#003E29]">SEBI Registration Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Registered Name</p>
                  <p className="text-lg font-bold text-gray-800">{SEBI_DETAILS.name}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Registration Number</p>
                  <p className="text-lg font-bold text-[#0F8B6E] font-mono bg-green-50 inline-block px-2 rounded">{SEBI_DETAILS.regNumber}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Type of Registration</p>
                  <p className="text-lg font-medium text-gray-800 flex items-center gap-2">
                    <FaUserShield className="text-gray-400" /> {SEBI_DETAILS.type}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Validity</p>
                  <p className="text-lg font-medium text-gray-800 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> {SEBI_DETAILS.validity}
                  </p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Official Website</p>
                  <a href={`https://${SEBI_DETAILS.website}`} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-[#0F8B6E] hover:underline flex items-center gap-2">
                    {SEBI_DETAILS.website} <FaExternalLinkAlt className="text-sm" />
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <a 
                  href={SEBI_DETAILS.sebiLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#003E29] text-white rounded-lg font-bold hover:bg-[#0F8B6E] transition-colors shadow-md"
                >
                  <FaGavel /> Verify on SEBI Website
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ESCALATION MATRIX TABLE */}
        <motion.div variants={fadeInUp} className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FaBuilding className="text-2xl text-[#0F8B6E]" />
            <h2 className="text-2xl font-bold text-[#003E29]">Grievance Escalation Matrix</h2>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="bg-[#003E29] text-white text-left">
                    <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Designation</th>
                    <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Contact Person</th>
                    <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider w-1/4">Address</th>
                    <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Contact No.</th>
                    <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Email-ID</th>
                    <th className="py-4 px-6 font-bold text-sm uppercase tracking-wider">Working Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {CONTACT_MATRIX.map((row, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-green-50/50 transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <span className="font-bold text-[#0F8B6E] bg-green-100 px-3 py-1 rounded-full text-xs uppercase">
                          {row.designation}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-800">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs">
                            <FaUserShield />
                          </div>
                          {row.person}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600 leading-relaxed">
                        <div className="flex gap-2">
                          <FaMapMarkerAlt className="text-gray-400 mt-1 flex-shrink-0" />
                          {row.address}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-800 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaPhoneAlt className="text-[#0F8B6E] text-xs" />
                          {row.phone}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        <a href={`mailto:${row.email}`} className="flex items-center gap-2 hover:text-[#0F8B6E] transition-colors">
                          <FaEnvelope className="text-gray-400 text-xs" />
                          {row.email}
                        </a>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        <div className="flex gap-2">
                          <FaClock className="text-gray-400 mt-1 flex-shrink-0" />
                          <span className="whitespace-pre-line">{row.hours}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 p-4 text-xs text-gray-500 text-center border-t border-gray-200">
              <FaExclamationCircle className="inline mr-1" /> 
              In absence of response/complaint not addressed to your satisfaction, you may lodge a complaint with SEBI at <a href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer" className="text-[#0F8B6E] font-bold hover:underline">SCORES</a> or Exchange at <a href="https://smartodr.in" target="_blank" rel="noreferrer" className="text-[#0F8B6E] font-bold hover:underline">SMART ODR</a>.
            </div>
          </div>
        </motion.div>

        {/* IMPORTANT LINKS SECTION */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <a 
            href="https://scores.sebi.gov.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaFileContract className="text-2xl text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">SEBI SCORES</h3>
              <p className="text-sm text-gray-500">Lodge your complaint online with SEBI</p>
            </div>
            <FaExternalLinkAlt className="ml-auto text-gray-300 group-hover:text-blue-600" />
          </a>

          <a 
            href="https://smartodr.in/login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <FaGavel className="text-2xl text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors">SMART ODR</h3>
              <p className="text-sm text-gray-500">Online Dispute Resolution Portal</p>
            </div>
            <FaExternalLinkAlt className="ml-auto text-gray-300 group-hover:text-orange-600" />
          </a>
        </motion.div>

        {/* DISCLAIMER FOOTER */}
        <motion.div variants={fadeInUp} className="mt-16 text-center">
          <p className="text-sm text-gray-400 max-w-3xl mx-auto">
            Monexaa Research is a SEBI Registered Research Analyst. We follow a strict code of conduct and are committed to resolving all investor grievances in a timely manner.
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
}
