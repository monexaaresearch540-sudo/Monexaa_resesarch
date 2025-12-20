import React from 'react';
import { motion } from 'framer-motion';

const RefundPolicy = () => {
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
            Refund Policy
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Monexaa Research
          </p>
          <div className="w-24 h-1 bg-[#0F8B6E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed max-w-5xl mx-auto">
          
          {/* Service Commitment & Refund Terms */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Service Commitment & Refund Terms
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                At <strong>Monexaa Research</strong>, we are committed to providing high-quality, research-based services in accordance with SEBI guidelines. However, clients must note the following:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E] mb-4">
                <li>We do not offer any refund, cancellation, or money-back policy under any circumstances once the subscription is activated and payment is made.</li>
                <li>Clients are advised to thoroughly read and understand all terms and conditions, service descriptions, disclaimers, and policies available on our official website before making any payment.</li>
                <li>Stock market trading and investment involve significant market risks. The performance of research recommendations is subject to market conditions and does not guarantee returns.</li>
                <li>Monexaa Research, while SEBI-registered, does not assure or guarantee any profit, fixed return, or success rate from its services.</li>
                <li>Clients are expected to use their own discretion and judgment before acting on any research recommendations.</li>
              </ul>
            </div>
          </section>

          {/* Important Note to Clients */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Important Note to Clients
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-3 font-medium">Please ensure you:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E] mb-4">
                <li>Understand the nature of research advisory services.</li>
                <li>Are fully aware that investments are subject to market risks, including loss of capital.</li>
                <li>Do not proceed with payment until all doubts are clarified and you have reviewed our official communication thoroughly.</li>
              </ul>
              <p className="mb-3 font-medium">By making a payment, you acknowledge and accept that:</p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E]">
                <li>You have read and understood all applicable terms.</li>
                <li>You agree to proceed without expectation of refund or cancellation.</li>
                <li>You accept full responsibility for investment decisions made based on our research.</li>
              </ul>
            </div>
          </section>

          {/* SEBI Guidelines for Cancellation */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              SEBI Guidelines for Cancellation
            </h2>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                As per SEBI guidelines, if a client requests to cancel the subscription, a refund shall only be issued for the unused portion of the subscription period. The refund will be calculated on a pro-rata basis, deducting the charges for the services already availed, including applicable taxes and administrative fees.
              </p>
              <p className="font-medium text-[#003E29]">
                Refunds will not be provided for the period of services already availed, irrespective of the client’s satisfaction with the recommendations or the outcome of trades.
              </p>
            </div>
          </section>

          {/* Contact */}
          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4 font-medium">
              For more details, visit our official website or contact us at:
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
              <a href="mailto:support@monexaaresearch.com" className="flex items-center gap-2 text-[#0F8B6E] font-bold hover:text-[#003E29] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                <span>✉️</span> support@monexaaresearch.com
              </a>
              <a href="tel:+916232678136" className="flex items-center gap-2 text-[#0F8B6E] font-bold hover:text-[#003E29] transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
                <span>📞</span> +91-6232678136
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default RefundPolicy;
