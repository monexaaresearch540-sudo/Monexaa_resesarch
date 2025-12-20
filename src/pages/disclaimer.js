import React from 'react';
import { motion } from 'framer-motion';

const Disclaimer = () => {
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
            Disclaimer
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Important information regarding our services and risk disclosure
          </p>
          <div className="w-24 h-1 bg-[#0F8B6E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed max-w-5xl mx-auto">
          
          {/* SEBI Mandated Disclaimers */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
            <h2 className="text-lg font-bold text-[#003E29] mb-3">Regulatory Disclosures</h2>
            <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E] text-sm md:text-base font-medium">
              <li>Registration granted by SEBI and certification from NISM do not guarantee the performance of the intermediary or assure any returns to investors.</li>
              <li>Investments in the securities market are subject to market risks. Please read all related documents carefully before investing.</li>
              <li>Securities mentioned are provided for illustrative purposes only and should not be considered as investment recommendations.</li>
              <li>Past performance is not indicative of future results. Investors are advised to make investment decisions based on their own risk assessment and financial objectives.</li>
            </ul>
          </div>

          {/* General Disclaimer */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              General Disclaimer
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                <strong>Monexaa Research</strong> recommendations are believed to be reliable, but we do not represent or warrant the accuracy, completeness, or reliability of the information contained in our Research Information. Investors and clients are advised to independently evaluate the market conditions/risks involved before making any trading/investment decisions.
              </p>
              <p className="mb-4">
                The Research Information is not intended to be an exhaustive statement on the financial instruments, issuers, markets, or developments referred to therein. Reasonable care has been taken to ensure that the Research Information is not misleading or untrue at the time of publication. Any opinions expressed in the Research Information are subject to change without notice.
              </p>
              <p>
                Information in the specific research reports is for the private use of the person to whom it has been provided without any liability whatsoever on the part of the company, its partners, employees, and associated entities. The research material published on this website does not constitute an offer or solicitation to buy or sell any securities referred to therein.
              </p>
            </div>
          </section>

          {/* Risk & Liability */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Risk & Liability
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                Investment/Trading in Securities markets has its own risks. Sincere efforts have been made to present the right investment perspective. The information contained herein is based on analysis and on sources that we consider reliable. We, however, do not vouch for the accuracy or the completeness thereof. This material is for personal information and we are not responsible for any loss incurred due to it & take no responsibility whatsoever for any financial profits or loss which may arise from the recommendations above.
              </p>
              <p>
                <strong>Monexaa Research</strong>, its management, its associate companies, and/or their employees take no responsibility for the veracity, validity, and correctness of the expert recommendations or other information or research. Any prediction made on the direction of the stock/commodity market or on the direction of individual stocks/commodities may prove to be incorrect.
              </p>
            </div>
          </section>

          {/* Usage & Content Policy */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Usage & Content Policy
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                The content of the site and the interpretation of data are solely the personal views of the contributors. <strong>Monexaa Research</strong> reserves the right to make modifications and alterations to the content of the website. Users are advised to use the data for the purpose of information only and rely on their own judgment while making investment decisions.
              </p>
              <p className="mb-4">
                Our clients (Paid or Unpaid), any third party, or anyone else has no right to forward or share our calls, reports, or any information provided by us to/with anyone which is received directly or indirectly by them. If found so then serious legal actions can be taken.
              </p>
              <p>
                There are risks associated with utilizing internet and electronic communications-based information and research dissemination services. Subscribers are advised to understand that services can fail due to the failure of hardware, software, networks, or connectivity.
              </p>
            </div>
          </section>

          {/* Jurisdiction & Legal */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Jurisdiction & Legal
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                <strong>Monexaa Research</strong> hereby expressly disclaims any implied warranties imputed by the laws of any jurisdiction. We consider ourselves and intend to be subject to the jurisdiction only of the court of <strong>Indore in India</strong>. If you don’t agree with any of our disclaimers above please do not read the material on any of our pages.
              </p>
              <p>
                All disputes will be subject, first to mediation, and then by arbitration by a sole arbitrator by Monexaa Research in accordance with Indian Law, Indian Arbitration and Conciliation Act, 1996, for the time being in force. The venue of arbitration or/and other further courts, legal and other proceedings will be in the jurisdiction of Indore, Indore courts.
              </p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

export default Disclaimer;
