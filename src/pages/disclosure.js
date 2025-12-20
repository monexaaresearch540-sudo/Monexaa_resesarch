import React from 'react';
import { motion } from 'framer-motion';

const Disclosure = () => {
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
            Disclosure Document
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Prepared in accordance with SEBI (Investment Advisers) Regulations, 2013
          </p>
          <div className="w-24 h-1 bg-[#0F8B6E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed max-w-5xl mx-auto">
          
          {/* Purpose */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-[#0F8B6E] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-[#003E29] rounded-full"></span>
              Purpose of the Document
            </h2>
            <p className="mb-4 text-justify">
              This disclosure document is prepared in compliance with the SEBI (Investment Advisers) Regulations, 2013, with the objective of providing essential information about the investment advisory services offered by <strong>Monexaa Research</strong>. It is intended to help prospective clients make an informed decision before engaging in advisory services related to securities investments.
            </p>
            <div className="bg-green-50 p-5 rounded-xl border border-green-100 text-sm md:text-base flex items-start gap-3">
              <div className="mt-1 min-w-[4px] h-4 bg-[#0F8B6E] rounded-full"></div>
              <p>
                For the purpose of this document, the Investment Adviser refers to <strong>Mr. Satish Kumar Pandey</strong>, Proprietor of Monexaa Research.
              </p>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-[#0F8B6E] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-[#003E29] rounded-full"></span>
              Description of the Investment Adviser
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-[#003E29] mb-2 text-lg">Background & Overview</h3>
                <p className="text-sm md:text-base text-justify">
                  Satish Kumar Pandey, Proprietor of Monexaa Research, is a SEBI-registered Investment Adviser holding registration number <strong>INH000020387</strong>, granted on May 08, 2025 (Validity: Perpetual). The firm provides independent investment advice, offering unbiased insights tailored to client needs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-bold text-[#003E29] mb-2 text-lg">Operations</h3>
                <p className="text-sm md:text-base">
                  The Investment Adviser currently operates from rented office premises at <strong>261, PU-4, Plot No. 26, Scheme No. 54, Indore, Madhya Pradesh – 452010</strong>, ensuring a dedicated environment for market analysis and client service.
                </p>
              </div>
            </div>
          </section>

          {/* Terms & Conditions / Disclaimer */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-[#0F8B6E] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-[#003E29] rounded-full"></span>
              Terms and Conditions & General Disclaimer
            </h2>
            <div className="prose prose-green max-w-none text-gray-600 text-sm md:text-base text-justify">
              <p className="mb-3">
                All services are provided in accordance with the detailed Terms and Conditions, which are shared separately with clients. Clients are advised to review them thoroughly before availing of services.
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E]">
                <li>Recommendations are shared via official, registered communication channels only. Please act only on recommendations shared through these official channels.</li>
                <li>Investment in securities market are subject to market risks. Read all the related documents carefully before investing.</li>
                <li>The information or advice provided is based on technical expertise which may vary from other experts. The subscriber voluntarily agrees to take into consideration our inputs while making investments.</li>
                <li><strong>Monexaa Research</strong> does not provide any guarantees in the stock market. Every individual will be responsible for their own funds, buying, and selling. We hold no legal responsibility towards any loss of wealth or damages.</li>
                <li>Monexaa Research shall not be responsible for any loss due to connectivity failure of network or internet.</li>
              </ul>
            </div>
          </section>

          {/* Disciplinary History */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-[#0F8B6E] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-[#003E29] rounded-full"></span>
              Disciplinary History
            </h2>
            <div className="bg-white border-l-4 border-[#0F8B6E] pl-4 py-4 shadow-sm rounded-r-lg">
              <p className="text-justify">
                No penalties or directions have been issued by SEBI under the SEBI Act or regulations pertaining to investment advisory services. There are no pending material litigations, legal proceedings, or adverse findings from inspections or investigations by any regulatory authority against the Investment Adviser or its employees.
              </p>
            </div>
          </section>

           {/* Associates */}
           <section>
            <h2 className="text-xl md:text-2xl font-bold text-[#0F8B6E] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-[#003E29] rounded-full"></span>
              Details of Associates
            </h2>
            <p>The Investment Adviser does not have any associates.</p>
          </section>

          {/* Disclosures Related to Investment Advisory Services */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-[#0F8B6E] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-[#003E29] rounded-full"></span>
              Disclosures Related to Investment Advisory Services
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 bg-green-50/50 p-4 rounded-lg border border-green-100">
                  <strong className="block text-[#003E29] mb-1">Financial Interest</strong>
                  <span className="text-sm">The Investment Adviser may have a financial interest or beneficial ownership in the securities recommended. Any such interest will be clearly disclosed at the time of providing advice.</span>
                </div>
                <div className="flex-1 bg-green-50/50 p-4 rounded-lg border border-green-100">
                  <strong className="block text-[#003E29] mb-1">Conflicts of Interest</strong>
                  <span className="text-sm">There are no actual or potential conflicts of interest arising from any association with the issuers of the securities being recommended. Any conflict that arises will be promptly disclosed.</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm">
                <p className="font-bold text-[#003E29] mb-3 text-base">The Investment Adviser, its employees, or associates:</p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-5 text-gray-600 marker:text-[#0F8B6E]">
                  <li>Have not received any compensation from the subject company in the past 12 months.</li>
                  <li>Have not managed or co-managed any public offering of the subject company in the past 12 months.</li>
                  <li>Have not received compensation for investment banking, merchant banking, or brokerage services from the subject company.</li>
                  <li>Have not received compensation for products or services other than those mentioned above.</li>
                  <li>Have not received any compensation or other benefits in connection with the provision of investment advice.</li>
                  <li>The subject company has not been a client in the 12 months prior to the provision of investment advice.</li>
                  <li>Have not served as an officer, director, or employee of the subject company.</li>
                  <li>Have not engaged in market-making activities for the subject company.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Grievance Redressal */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-[#0F8B6E] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-[#003E29] rounded-full"></span>
              Grievance Redressal
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base">
              <p className="mb-4 text-justify">
                Client's queries/complaints may arise due to lack of understanding or a deficiency of service. Resolution of grievances is the responsibility of the Investment Adviser.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-[#003E29] mb-2">Compliance Officer Details</h3>
                  <p><strong>Name:</strong> Mr. Satish Kumar Pandey</p>
                  <p><strong>Email:</strong> support@monexaaresearch.com</p>
                  <p><strong>Phone:</strong> +91 6232678136</p>
                </div>
                <div>
                  <h3 className="font-bold text-[#003E29] mb-2">SEBI Scores Platform</h3>
                  <p className="text-justify">
                    If the grievance is not redressed within a reasonable time period, you may lodge your complaint with SEBI on SEBI's SCORES portal (<a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#0F8B6E] hover:underline">https://scores.sebi.gov.in</a>).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4 font-medium">
              If you have any questions regarding this disclosure or would like further information, please feel free to contact us:
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
              <a href="mailto:support@monexaaresearch.com" className="flex items-center gap-2 text-[#0F8B6E] font-bold hover:text-[#003E29] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                <span>✉️</span> support@monexaaresearch.com
              </a>
              <a href="https://www.monexaaresearch.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0F8B6E] font-bold hover:text-[#003E29] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                <span>🌐</span> www.monexaaresearch.com
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default Disclosure;
