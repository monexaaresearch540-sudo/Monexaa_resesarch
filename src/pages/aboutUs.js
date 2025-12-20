import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaUserTie, FaChartLine, FaHandshake, FaBalanceScale, FaLightbulb, FaShieldAlt, FaCheckCircle, FaUsers, FaRegFileAlt } from 'react-icons/fa';

const AboutUs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full bg-transparent">
      <Helmet>
        <title>About Us | Monexaa Research - Leading SEBI Registered Research Analyst</title>
        <meta name="description" content="Learn about Monexaa Research, a premier SEBI Registered Research Analyst firm. Led by experts, we provide transparent, data-driven stock market recommendations for wealth creation." />
        <meta name="keywords" content="About Monexaa Research, SEBI Registered Research Analyst Profile, Stock Market Experts Team, Financial Advisory Company, Best Research Analyst India, Share Market Consultants, Investment Advisors Profile, Satish Kumar Pandey Monexaa" />
        <link rel="canonical" href="https://monexaaresearch.com/about-us" />
      </Helmet>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#003E29] mb-3">
            About Monexaa Research
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
            A SEBI Registered Investment Advisory Firm committed to your financial growth through unbiased, data-driven, and disciplined investment advice.
          </p>
          <div className="w-24 h-1 bg-[#0F8B6E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed max-w-5xl mx-auto">
          
          {/* Introduction & Founder Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
                  <FaUserTie /> Who We Are
                </h2>
                <div className="text-sm md:text-base text-justify space-y-4">
                  <p>
                    <strong>Monexaa Research</strong> is a premier <strong>SEBI Registered Investment Adviser (IA)</strong> firm established with a singular vision: to empower investors with reliable, transparent, and actionable financial insights. Unlike traditional brokerage firms or distributors, our primary allegiance is to you—the investor. We operate on a fiduciary standard, meaning your financial interests always come before ours.
                  </p>
                  <p>
                    Founded by <strong>Mr. Satish Kumar Pandey</strong>, a distinguished SEBI-registered Investment Adviser, Monexaa Research was born out of a need to bridge the gap between complex market dynamics and the retail investor. With years of experience in the Indian financial markets, Mr. Pandey envisioned a firm that doesn't just sell products but provides genuine, high-quality advice that helps clients navigate market volatility with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Commitment */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
              <h3 className="text-xl font-bold text-[#003E29] mb-3 flex items-center gap-2">
                <FaLightbulb className="text-[#0F8B6E]" /> Our Mission
              </h3>
              <p className="text-sm md:text-base text-justify">
                To help you grow your wealth confidently. We aim to democratize access to high-quality investment advice, ensuring that every investor, regardless of their portfolio size, has access to professional-grade market intelligence. We strive to deliver unbiased analysis tailored specifically for participants in the Indian financial markets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-[#003E29] mb-3 flex items-center gap-2">
                <FaShieldAlt className="text-[#0F8B6E]" /> Our Commitment
              </h3>
              <p className="text-sm md:text-base text-justify">
                We are committed to providing a best-in-class service experience, grounded in integrity, expertise, and client satisfaction. <strong>Monexaa Research</strong> strictly adheres to all regulatory guidelines set by SEBI to ensure you receive authentic and trustworthy services. We do not engage in portfolio management or hold client funds.
              </p>
            </div>
          </section>

          {/* Why Choose Us */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Why Choose Monexaa Research?
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[#0F8B6E] text-2xl mb-2"><FaBalanceScale /></div>
                <h3 className="font-bold text-[#003E29] mb-2">Unbiased Advice</h3>
                <p className="text-sm text-gray-600 text-justify">
                  As an IA, we earn from our advice, not from commissions. This ensures our recommendations are purely in your best interest.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[#0F8B6E] text-2xl mb-2"><FaRegFileAlt /></div>
                <h3 className="font-bold text-[#003E29] mb-2">Regulatory Compliance</h3>
                <p className="text-sm text-gray-600 text-justify">
                  We strictly follow SEBI (Investment Advisers) Regulations, 2013. This means rigorous compliance and documented advice.
                </p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="text-[#0F8B6E] text-2xl mb-2"><FaUsers /></div>
                <h3 className="font-bold text-[#003E29] mb-2">Client-Centric</h3>
                <p className="text-sm text-gray-600 text-justify">
                  We don't believe in one-size-fits-all. Our advice is based on thorough market research tailored to help you make informed decisions.
                </p>
              </div>
            </div>
          </section>

          {/* Core Values */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { title: "Integrity", desc: "Honesty in every advice we give." },
                { title: "Transparency", desc: "Clear communication, no hidden agendas." },
                { title: "Excellence", desc: "Striving for the highest quality research." },
                { title: "Discipline", desc: "Adhering to proven strategies over emotions." }
              ].map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="font-bold text-[#003E29] mb-1">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Empowering Journey */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Empowering Your Financial Journey
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify space-y-4">
              <p>
                At <strong>Monexaa Research</strong>, we understand that the financial markets can be daunting. With thousands of stocks, fluctuating indices, and a constant stream of news, it is easy for investors to feel overwhelmed. That is where we come in. Our role is to cut through the noise and provide you with clear, actionable, and research-backed investment advice.
              </p>
              <p>
                Our research is results-driven. We employ a rigorous methodology that combines technical analysis of price patterns and trends with fundamental analysis of economic indicators. This dual approach allows us to identify opportunities that have a high probability of success while managing the inherent risks of the market.
              </p>
              <p>
                <strong>Mr. Satish Kumar Pandey</strong> and the entire team at Monexaa Research invite you to experience a new standard of investment advisory. One that is built on trust, powered by expertise, and dedicated to your prosperity.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-6 font-medium text-lg">
              Ready to Invest with Confidence?
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="/contact-us" className="bg-[#0F8B6E] text-white px-8 py-3 rounded-full font-bold hover:bg-[#003E29] transition-colors shadow-md flex items-center gap-2">
                <FaHandshake /> Connect With Us
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default AboutUs;
