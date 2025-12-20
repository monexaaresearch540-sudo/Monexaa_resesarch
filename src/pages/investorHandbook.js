import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaEye, 
  FaBullseye, 
  FaBriefcase, 
  FaHandshake, 
  FaGavel, 
  FaUserShield, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaExternalLinkAlt,
  FaFileContract,
  FaBalanceScale,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const InvestorHandbook = () => {
  const fadeIn = {
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

  return (
    <div className="w-full bg-transparent min-h-screen font-sans text-gray-800">
      <Helmet>
        <title>Investor Handbook | Monexaa Research - Guidelines & Rights</title>
        <meta name="description" content="Read the Investor Handbook by Monexaa Research. Understand your rights, responsibilities, and our commitment to transparent, ethical, and SEBI-compliant services." />
        <meta name="keywords" content="Investor Handbook, Investor Rights, SEBI Guidelines, Monexaa Research Policy, Investor Charter, Stock Market Grievance, Do's and Don'ts for Investors" />
        <link rel="canonical" href="https://monexaaresearch.com/investor-handbook" />
      </Helmet>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        
        {/* HEADER SECTION */}
        <motion.div variants={fadeIn} className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <FaUserShield className="text-3xl text-[#0F8B6E]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#003E29] mb-4">
            Investor Handbook
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your guide to investing with knowledge, safety, and confidence. Understanding your rights and responsibilities is the first step towards financial wellness.
          </p>
          <div className="w-24 h-1.5 bg-[#0F8B6E] mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* VISION & MISSION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div variants={fadeIn} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-[#0F8B6E]">
            <div className="flex items-center gap-3 mb-4">
              <FaEye className="text-2xl text-[#0F8B6E]" />
              <h2 className="text-2xl font-bold text-[#003E29]">Vision</h2>
            </div>
            <p className="text-lg text-gray-700 font-medium italic">
              "Invest with knowledge and safety."
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-[#003E29]">
            <div className="flex items-center gap-3 mb-4">
              <FaBullseye className="text-2xl text-[#003E29]" />
              <h2 className="text-2xl font-bold text-[#003E29]">Mission</h2>
            </div>
            <p className="text-gray-700">
              To empower every investor to make informed decisions by investing in suitable products aligned with their financial goals, while enabling them to manage, monitor, and track their progress toward financial wellness.
            </p>
          </motion.div>
        </div>

        {/* NATURE OF BUSINESS */}
        <motion.section variants={fadeIn} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003E29] mb-8 flex items-center gap-3">
            <FaBriefcase className="text-[#0F8B6E]" />
            Nature of Business
          </h2>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <p className="mb-6 text-gray-700">
              As a <strong>SEBI-registered Investment Adviser</strong>, Monexaa Research undertakes the following responsibilities for the benefit of investors:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Providing investment advice based on in-house analysis.",
                "Offering independent, unbiased views on securities.",
                "Providing objective recommendations with full disclosure of any financial interests.",
                "Delivering investment insights using publicly available information and observable data.",
                "Conducting an annual audit of business practices.",
                "Ensuring all advertisements comply with SEBI’s Advertisement Code.",
                "Maintaining records of all client interactions."
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <FaCheckCircle className="text-[#0F8B6E] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* SERVICES PROVIDED */}
        <motion.section variants={fadeIn} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003E29] mb-8 flex items-center gap-3">
            <FaHandshake className="text-[#0F8B6E]" />
            Details of Services Provided
          </h2>
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                "Client onboarding and registration",
                "Sharing comprehensive Terms & Conditions of advisory services",
                "Completing Know Your Customer (KYC) process for paid clients",
                "Disclosures to Clients (Business activities, conflicts, risks)",
                "Disclosure of AI tools usage in analysis",
                "Disclosure of material conflicts for third-party recommendations",
                "Fair distribution of investment advice to all clients",
                "Confidentiality and timely communication of investment advice",
                "Respecting data privacy and protection from unauthorized use",
                "Disclosure of expected service timelines",
                "Clear risk disclaimers for complex products",
                "Upholding honesty, integrity, and fair treatment",
                "Ensuring confidentiality of client data"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-[#003E29] rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* GRIEVANCE REDRESSAL */}
        <motion.section variants={fadeIn} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003E29] mb-8 flex items-center gap-3">
            <FaGavel className="text-[#0F8B6E]" />
            Grievance Redressal Mechanism
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Direct Complaint */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0F8B6E] mb-4">1. Filing a Complaint with Monexaa Research</h3>
              <p className="text-gray-600 mb-4">
                Investors may file complaints directly with us. We strive to resolve all grievances within <strong>21 days</strong> of receipt.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FaExternalLinkAlt className="text-gray-400" />
                  <a href="https://monexaaresearch.com/grievance-redressal" className="text-blue-600 hover:underline">Visit Grievance Page</a>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-gray-400" />
                  <span>+91 6232678136, +91 8982019404</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-400" />
                  <a href="mailto:support@monexaaresearch.com" className="text-blue-600 hover:underline">support@monexaaresearch.com</a>
                </li>
              </ul>
            </div>

            {/* SEBI SCORES */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0F8B6E] mb-4">2. Filing via SEBI’s SCORES or RAASB</h3>
              <p className="text-gray-600 mb-4">
                <strong>SCORES 2.0</strong> (SEBI’s centralized grievance redressal platform):
              </p>
              <a href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-white bg-[#003E29] px-4 py-2 rounded-lg hover:bg-[#0F8B6E] transition-colors mb-4">
                Visit SCORES 2.0 <FaExternalLinkAlt />
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Two levels of review: First by RAASB, Second by SEBI.
              </p>
            </div>

            {/* ODR */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0F8B6E] mb-4">3. SMART ODR (Online Dispute Resolution)</h3>
              <p className="text-gray-600 mb-4">
                If unsatisfied with the resolution, investors can file complaints through SEBI’s SMART ODR platform for online conciliation/arbitration.
              </p>
              <a href="https://smartodr.in" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium flex items-center gap-2">
                Visit SMART ODR <FaExternalLinkAlt />
              </a>
            </div>

            {/* Physical Address */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#0F8B6E] mb-4">4. Physical Complaints</h3>
              <div className="flex items-start gap-3 text-gray-600">
                <FaMapMarkerAlt className="text-xl mt-1 flex-shrink-0" />
                <p>
                  <strong>Office of Investor Assistance and Education</strong><br/>
                  Securities and Exchange Board of India (SEBI)<br/>
                  SEBI Bhavan, Plot No. C4-A, ‘G’ Block,<br/>
                  Bandra-Kurla Complex, Bandra (E),<br/>
                  Mumbai – 400051
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* RIGHTS OF INVESTORS */}
        <motion.section variants={fadeIn} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003E29] mb-8 flex items-center gap-3">
            <FaBalanceScale className="text-[#0F8B6E]" />
            Rights of Investors
          </h2>
          <div className="bg-gradient-to-br from-[#003E29] to-[#0F8B6E] rounded-2xl p-6 md:p-8 text-white shadow-lg">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Right to privacy and confidentiality",
                "Right to transparent, fair, and ethical practices",
                "Right to adequate and continuing disclosure",
                "Right to accurate information on service timelines",
                "Right to be heard and receive timely redressal",
                "Right to exit a service as per agreed terms",
                "Right to clear risk guidance for complex products",
                "Right to protection against coercive/unfair clauses",
                "Right to fair and truthful advertisements",
                "Right to provide feedback"
              ].map((right, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <FaCheckCircle className="text-white" />
                  </div>
                  <span className="font-medium">{right}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* DO'S AND DON'TS */}
        <motion.section variants={fadeIn} className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003E29] mb-8 text-center">
            Expectations from Investors
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO's */}
            <div className="bg-green-50 p-6 md:p-8 rounded-2xl border border-green-100">
              <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                <FaCheckCircle className="text-2xl" /> DO's
              </h3>
              <ul className="space-y-4">
                {[
                  "Deal only with SEBI-registered Investment Advisers.",
                  "Verify the SEBI registration number of your Investment Adviser.",
                  "Carefully read all disclosures in advisory documents.",
                  "Make payments only through official banking channels.",
                  "Retain signed receipts with payment details.",
                  "Use CeFCoM (Centralized Fee Collection Mechanism) if opted.",
                  "Refer to expert advice before buying/selling.",
                  "Clarify doubts before acting on any recommendation.",
                  "Ask questions when dealing with complex products.",
                  "Know your right to discontinue services.",
                  "Report to SEBI any assured return schemes."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-green-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'Ts */}
            <div className="bg-red-50 p-6 md:p-8 rounded-2xl border border-red-100">
              <h3 className="text-xl font-bold text-red-800 mb-6 flex items-center gap-2">
                <FaTimesCircle className="text-2xl" /> DON'Ts
              </h3>
              <ul className="space-y-4">
                {[
                  "Do not provide funds for investment to the Investment Adviser.",
                  "Avoid falling for misleading advertisements or market rumours.",
                  "Do not be lured by discounts, gifts, or incentives.",
                  "Do not share login credentials of trading, DEMAT, or bank accounts with the Investment Adviser."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-red-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
};

export default InvestorHandbook;
