import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full bg-transparent">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#003E29] mb-3">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
          <div className="w-24 h-1 bg-[#0F8B6E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed max-w-5xl mx-auto">
          
          {/* Introduction */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-justify mb-4">
              Welcome to <strong>Monexaa Research</strong>. By accessing or using the services or website of Monexaa Research, you agree to be legally bound by the terms and conditions outlined below. These terms may be modified at any time without prior notice, and continued use of our website implies acceptance of the revised terms. Clients are advised to check our website regularly for updates.
            </p>
          </div>

          {/* Registration & KYC */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Registration & KYC
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base">
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E]">
                <li>By registering with Monexaa Research, you confirm that all personal and contact details provided are accurate and up to date.</li>
                <li>In order to use Monexaa Research services, you must provide certain personal information as per regulations.</li>
                <li>Service will start post completion of KYC as per norms. Service tenure will be applicable as per the package.</li>
                <li>Monexaa Research will render services only after receiving all credentials i.e., KYC for acknowledgement of mutual well-being.</li>
              </ul>
            </div>
          </section>

          {/* Services & Trading Policy */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Services & Trading Policy
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base">
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E]">
                <li><strong>No Guaranteed Service:</strong> We do not offer any type of guaranteed service, surety, or fixed profit commitment plan. We do not have services related to any type of profit sharing or portfolio management services.</li>
                <li><strong>Stop Loss:</strong> Monexaa Research recommends strict adherence to its trading discipline, especially stop-loss policies. It is mandatory for clients to maintain stop loss in each and every trading recommendation. Clients who choose to deviate from these recommendations do so at their own risk.</li>
                <li><strong>Execution:</strong> Client needs to trade on each & every recommendation/trading calls provided by us for better results.</li>
                <li><strong>Risk Warning:</strong> Investment in NSE/BSE/MCX/Stock Market is subject to market risk. Clients need to follow all the given technical levels & instructions in a strict manner. Monexaa Research does not suggest taking loans for investment purposes.</li>
              </ul>
            </div>
          </section>

          {/* Payment & Fees */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Payment & Fees
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base">
              <p className="mb-3 text-justify">
                Subscription Fee is paid in advance followed by the KYC process. It is assumed that the client has made payment with their free consent. Profit and loss which is the result of the trading and investment will be totally borne by the client.
              </p>
              <p className="text-justify">
                <strong>Refund Policy:</strong> Subscription fees once paid is Non-Refundable. However, if a client is having any kind of issue, they may raise their complaints regarding refund which may be considered as per the terms & condition of Monexaa Research.
              </p>
            </div>
          </section>

          {/* Communication & Security */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Communication & Security
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base">
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E]">
                <li><strong>Consent:</strong> By registering with Monexaa Research, you give consent to receive calls, emails, and SMS/WhatsApp alerts from the company, even if your number is registered under DND (Do Not Disturb).</li>
                <li><strong>Official Channels:</strong> All services/trading recommendations are shared via your registered contact channel. We suggest you not to work on personal recommendations given by associates of the company.</li>
                <li><strong>Security:</strong> You are not supposed to give your De-mat login id, password to any of our employees. Neither company nor any of the employees are responsible for your losses, it will be at your own risk.</li>
              </ul>
            </div>
          </section>

          {/* Liability & Indemnification */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Liability & Indemnification
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base">
              <p className="mb-3 text-justify">
                <strong>Liability Disclaimer:</strong> All content, recommendations, and services are provided on an “as-is” and “as-available” basis. While care is taken in research and analysis, Monexaa Research does not guarantee the accuracy or timeliness of the information. Monexaa Research shall not be liable for delays in service or interruptions due to technical failures, internet outages, or other force majeure events.
              </p>
              <p className="text-justify">
                <strong>Indemnification:</strong> You agree to indemnify and hold harmless Monexaa Research, its employees, directors, and affiliates from any losses, claims, or legal expenses arising out of your misuse of services or violation of these terms.
              </p>
            </div>
          </section>

          {/* Jurisdiction */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Jurisdiction
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base">
              <p className="text-justify">
                All disputes or claims arising from the use of our services or website shall be subject to the exclusive jurisdiction of courts in <strong>Indore, Madhya Pradesh</strong>. This includes any matters related to interpretation, performance, breach, or enforceability of agreements entered into with Monexaa Research.
              </p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

export default TermsAndConditions;
