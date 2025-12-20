import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FaShieldAlt, 
  FaUserCheck, 
  FaFileInvoiceDollar, 
  FaSearchDollar, 
  FaBan, 
  FaUniversity, 
  FaLock,
  FaChartLine,
  FaCogs,
  FaGlobe
} from 'react-icons/fa';

const AntiMoneyLaundering = () => {
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
        <title>Anti-Money Laundering (AML) Policy & Compliance | Monexaa Research</title>
        <meta name="description" content="Read Monexaa Research's comprehensive Anti-Money Laundering (AML) Policy. As a SEBI-registered Investment Adviser, we strictly adhere to PMLA 2002 guidelines, KYC norms, and financial crime prevention standards to ensure a secure investment environment." />
        <meta name="keywords" content="Anti-Money Laundering Policy, AML Compliance India, SEBI AML Guidelines, PMLA Act 2002, Investment Adviser Compliance, KYC Norms SEBI, Financial Crime Prevention, Suspicious Transaction Reporting, Monexaa Research AML, Terrorist Financing Prevention" />
        <link rel="canonical" href="https://monexaaresearch.com/anti-money-laundering" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://monexaaresearch.com/anti-money-laundering" />
        <meta property="og:title" content="Anti-Money Laundering (AML) Policy & Compliance | Monexaa Research" />
        <meta property="og:description" content="Monexaa Research is committed to preventing financial crimes. Read our full AML policy and compliance framework." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://monexaaresearch.com/anti-money-laundering" />
        <meta property="twitter:title" content="Anti-Money Laundering (AML) Policy & Compliance | Monexaa Research" />
        <meta property="twitter:description" content="Monexaa Research is committed to preventing financial crimes. Read our full AML policy and compliance framework." />
      </Helmet>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      >
        
        {/* HEADER SECTION */}
        <motion.div variants={fadeIn} className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center p-3 md:p-4 bg-green-100 rounded-full mb-4 md:mb-6">
            <FaShieldAlt className="text-3xl md:text-4xl text-[#0F8B6E]" />
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#003E29] mb-4 leading-tight">
            Anti-Money Laundering (AML) Policy
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Monexaa Research is strictly committed to preventing money laundering and terrorist financing. We adhere to the Prevention of Money Laundering Act (PMLA), 2002, and SEBI regulations to ensure a secure financial environment.
          </p>
          <div className="w-16 md:w-24 h-1.5 bg-[#0F8B6E] mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* WHAT IS AML */}
        <motion.section variants={fadeIn} className="mb-16">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-[#0F8B6E]">
            <h2 className="text-2xl font-bold text-[#003E29] mb-4 flex items-center gap-3">
              <FaGlobe className="text-[#0F8B6E]" />
              Anti-Money Laundering Overview
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Anti-Money Laundering (AML) refers to a comprehensive set of policies, procedures, and regulations designed to prevent criminals from disguising illegally obtained funds as legitimate income. As a SEBI-registered Investment Adviser, Monexaa Research implements robust measures to detect, prevent, and report potential money laundering activities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              These policies are not just regulatory requirements but are essential for maintaining the integrity of the financial markets and protecting our clients and the firm from financial crimes.
            </p>
          </div>
        </motion.section>

        {/* THE MONEY LAUNDERING PROCESS */}
        <motion.section variants={fadeIn} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003E29] mb-8 text-center">
            The Money Laundering Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placement */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FaFileInvoiceDollar className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">1. Placement</h3>
              <p className="text-gray-600 text-sm">
                The introduction of illicit funds into the financial system. This is the most vulnerable stage for launderers as it involves placing large amounts of cash into banks or financial instruments.
              </p>
            </div>

            {/* Layering */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FaCogs className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">2. Layering</h3>
              <p className="text-gray-600 text-sm">
                Carrying out a complex series of financial transactions to camouflage the illegal origin of the funds. This involves moving money between accounts, countries, or instruments to create confusion.
              </p>
            </div>

            {/* Integration */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <FaUniversity className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">3. Integration</h3>
              <p className="text-gray-600 text-sm">
                The final stage where the "cleaned" money is returned to the economy as legitimate funds. It is often used to purchase assets like real estate, luxury goods, or business investments.
              </p>
            </div>
          </div>
        </motion.section>

        {/* OUR AML CONTROLS */}
        <motion.section variants={fadeIn} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#003E29] mb-8 flex items-center gap-3">
            <FaLock className="text-[#0F8B6E]" />
            Our AML Controls & Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* KYC */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-[#0F8B6E]">
              <h3 className="text-xl font-bold text-[#003E29] mb-4 flex items-center gap-2">
                <FaUserCheck className="text-[#0F8B6E]" /> Know Your Customer (KYC)
              </h3>
              <p className="text-gray-600 mb-4">
                We strictly adhere to SEBI's KYC norms. Before onboarding any client, we verify their identity, address, and financial status to ensure they are not involved in illegal activities.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0F8B6E] rounded-full"></div> Verification of PAN and Aadhaar.</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0F8B6E] rounded-full"></div> In-person verification (IPV) or Video KYC.</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#0F8B6E] rounded-full"></div> Screening against global sanctions lists.</li>
              </ul>
            </div>

            {/* Monitoring & Reporting */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-[#003E29]">
              <h3 className="text-xl font-bold text-[#003E29] mb-4 flex items-center gap-2">
                <FaSearchDollar className="text-[#003E29]" /> Monitoring & Reporting
              </h3>
              <p className="text-gray-600 mb-4">
                We employ continuous monitoring to identify suspicious activities. Any transaction or behavior that raises a red flag is analyzed and, if necessary, reported to the relevant authorities.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#003E29] rounded-full"></div> Tracking unusual transaction patterns.</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#003E29] rounded-full"></div> Reporting Suspicious Transaction Reports (STR) to FIU-IND.</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#003E29] rounded-full"></div> Maintaining records for a minimum of 5 years.</li>
              </ul>
            </div>

            {/* Risk Profiling */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-[#003E29]">
              <h3 className="text-xl font-bold text-[#003E29] mb-4 flex items-center gap-2">
                <FaChartLine className="text-[#003E29]" /> Risk-Based Approach
              </h3>
              <p className="text-gray-600 mb-4">
                Clients are categorized based on their risk profile (Low, Medium, High). Enhanced Due Diligence (EDD) is performed for high-risk clients, such as Politically Exposed Persons (PEPs) or those from high-risk jurisdictions.
              </p>
            </div>

            {/* Technology */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-[#0F8B6E]">
              <h3 className="text-xl font-bold text-[#003E29] mb-4 flex items-center gap-2">
                <FaBan className="text-[#0F8B6E]" /> Technology & Training
              </h3>
              <p className="text-gray-600 mb-4">
                We leverage modern technology to screen clients and monitor compliance. Our staff undergoes regular training to stay updated on the latest AML laws and money laundering techniques.
              </p>
            </div>

          </div>
        </motion.section>

        {/* CONCLUSION */}
        <motion.section variants={fadeIn} className="text-center bg-green-50 p-8 rounded-3xl border border-green-100">
          <h2 className="text-2xl font-bold text-[#003E29] mb-4">Commitment to Compliance</h2>
          <p className="text-gray-700 max-w-4xl mx-auto">
            By combining legal frameworks, careful customer screening, robust record-keeping, and technology-driven monitoring, Monexaa Research's AML program helps reduce financial crime and ensures strict compliance with regulatory requirements. We are dedicated to fostering a transparent and secure investment environment for all our clients.
          </p>
        </motion.section>

      </motion.div>
    </div>
  );
};

export default AntiMoneyLaundering;

