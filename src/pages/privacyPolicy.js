import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <div className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto space-y-1">
            <p className="font-bold text-[#0F8B6E]">Monexaa Research</p>
            <p>SEBI Registered Research Analyst (Reg. No. INH000020387)</p>
            <p>Registered Office: 261, PU-4, Plot No. 26, Scheme No. 54, Indore, Madhya Pradesh – 452010</p>
          </div>
          <div className="w-24 h-1 bg-[#0F8B6E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed max-w-5xl mx-auto">
          
          {/* Commitment to Privacy */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Commitment to Privacy
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                At Monexaa Research, we are committed to safeguarding your personal information. We comply with the Information Technology Act, 2000 and the relevant rules (including IT Rules, 2011) relating to data privacy and security. Your privacy is of utmost importance to us, and we ensure that any data shared with us is handled with responsibility and transparency.
              </p>
              <p>
                We respect the privacy and choices of our online customers and visitors. We hope that the information provided below will address any questions or concerns you may have about privacy issues.
              </p>
            </div>
          </section>

          {/* Website Visits */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Website Visits
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p>
                Generally, you may visit our website anonymously and obtain information about our organization, products, and services without providing any personal information, such as your phone number or email address. However, certain sections or services may require registration.
              </p>
            </div>
          </section>

          {/* Collection and Use of Personal Information */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Collection and Use of Personal Information
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                In specific sections of our website (e.g., Registration, Transaction), we may ask for your name, email address, telephone number, PAN, and other personal information needed to provide services or subscribe you to offers. This information is collected strictly for the following purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E] mb-4">
                <li>To provide research/advisory services and support our customer relationship with you.</li>
                <li>To communicate with you regarding services, special offers, upgrades, or updates.</li>
                <li>For verification and compliance with SEBI regulations.</li>
              </ul>
              <p className="mb-4">
                We do not collect unnecessary or excessive personal information, nor do we use your data for any unrelated purposes. The personal information you provide will be kept confidential.
              </p>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <strong className="block text-[#003E29] mb-2">Feedback & Surveys</strong>
                <p className="text-sm">
                  From time to time, we may request your valuable feedback to evaluate and improve our services. We might invite you to participate in polls or surveys that may be posted on our website or mailed to you directly. Participation in such surveys or polls is completely voluntary.
                </p>
              </div>
            </div>
          </section>

          {/* Communication Consent */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Communication Consent
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p>
                By submitting your contact details (via website, WhatsApp, email, etc.), you authorize Monexaa Research to contact you via phone call, SMS, WhatsApp, or email—even if your number is registered under the DND registry. This includes promotional, transactional, and service-related communication.
              </p>
            </div>
          </section>

          {/* Information Sharing and Disclosure */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Information Sharing and Disclosure
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                We do not sell, rent, or exchange your personal data with any third party without your explicit consent, except in cases where:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E] mb-4">
                <li>Disclosure is required by law or regulatory authority.</li>
                <li>It is necessary to protect our legal rights or prevent fraud.</li>
                <li>It is required to deliver services through authorized channels or partners.</li>
              </ul>
              <p className="font-medium text-[#003E29]">All client information is treated as confidential.</p>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Data Security
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p>
                We follow reasonable and appropriate security practices to protect your data from unauthorized access, alteration, disclosure, or destruction. While we take adequate safeguards, we do not guarantee absolute security due to the nature of digital platforms.
              </p>
            </div>
          </section>

          {/* Use of Website and Services */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Use of Website and Services
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-3 font-medium">By accessing our website or subscribing to our services, you confirm that:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E]">
                <li>You have read and accepted our Terms & Conditions and this Privacy Policy.</li>
                <li>You agree to be contacted for service-related purposes.</li>
                <li>You accept that Monexaa Research is not liable for any losses due to data delays, SMS delivery issues, or market movements.</li>
              </ul>
            </div>
          </section>

          {/* Client Responsibility and Risk Disclaimer */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Client Responsibility and Risk Disclaimer
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p>
                Stock market investment and trading are subject to market risks. Clients are advised to make investment decisions based on their own judgment. Monexaa Research does not assure or guarantee any returns, and shall not be liable for losses incurred based on our recommendations.
              </p>
            </div>
          </section>

          {/* Third-Party Links and Cookies */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Third-Party Links and Cookies
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of those websites. We may also use standard cookies to enhance website functionality.
              </p>
            </div>
          </section>

          {/* Changes to the Privacy Policy */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Changes to the Privacy Policy
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p>
                Monexaa Research reserves the right to update or amend this Privacy Policy from time to time. When we do so, we will post notice of any revisions on this site. Users are encouraged to review this page periodically. Continued use of our services implies agreement to the updated terms.
              </p>
            </div>
          </section>

          {/* Grievance Redressal */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Grievance Redressal
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base">
              <p className="mb-4">For any queries or grievances regarding your personal data or privacy concerns, please contact:</p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="mailto:support@monexaaresearch.com" className="flex items-center gap-2 text-[#0F8B6E] font-bold hover:text-[#003E29] transition-colors">
                  <span>📧</span> support@monexaaresearch.com
                </a>
                <a href="tel:+916232678136" className="flex items-center gap-2 text-[#0F8B6E] font-bold hover:text-[#003E29] transition-colors">
                  <span>📞</span> +91-6232678136
                </a>
              </div>
            </div>
          </section>

          {/* Jurisdiction */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Jurisdiction
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p>
                All disputes arising out of this policy shall be subject to the exclusive jurisdiction of the courts of Indore, Madhya Pradesh.
              </p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

export default PrivacyPolicy;
