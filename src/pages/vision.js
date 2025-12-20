import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaBalanceScale, FaBullseye, FaHandshake, FaLightbulb, FaChartLine, FaUserShield } from 'react-icons/fa';

const Vision = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const values = [
    {
      title: "Integrity & Ethics",
      description: "We adhere to the highest ethical standards as a SEBI Registered Research Analyst, ensuring honesty, transparency, and unbiased recommendations in all our client interactions.",
      icon: <FaBalanceScale className="text-2xl" />
    },
    {
      title: "Precision & Accuracy",
      description: "Our stock market research is driven by rigorous technical and fundamental analysis. We strive for precision in Nifty, BankNifty, and Equity calls to help you make informed trading decisions.",
      icon: <FaBullseye className="text-2xl" />
    },
    {
      title: "Client Centricity",
      description: "Your financial goals are our priority. We provide research insights to help you navigate the volatile stock market with confidence and discipline.",
      icon: <FaHandshake className="text-2xl" />
    },
    {
      title: "Innovation in Analysis",
      description: "We continuously evolve our analytical methods and adopt cutting-edge technology to stay ahead in the dynamic Indian stock market environment.",
      icon: <FaLightbulb className="text-2xl" />
    }
  ];

  return (
    <div className="w-full bg-transparent">
      <Helmet>
        <title>Vision & Mission | Monexaa Research - Trusted SEBI Registered Analyst</title>
        <meta name="description" content="Discover the Vision and Mission of Monexaa Research. We aim to empower traders with accurate, ethical, and research-backed stock market advice as a SEBI Registered Research Analyst." />
        <meta name="keywords" content="Monexaa Research Vision, Our Mission, SEBI Registered Research Analyst Values, Ethical Stock Advisory, Transparent Trading Tips, Best Research Analyst India, Financial Goals, Stock Market Integrity" />
        <link rel="canonical" href="https://monexaaresearch.com/vision" />
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
            Vision & Mission
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Driving financial growth through expert research, unwavering commitment, and data-driven market intelligence.
          </p>
          <div className="w-24 h-1 bg-[#0F8B6E] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-8 text-gray-700 leading-relaxed max-w-5xl mx-auto">
          
          {/* Vision Section - Styled like Regulatory Disclosures in Disclaimer */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#0F8B6E] text-white rounded-lg">
                <FaChartLine />
              </div>
              <h2 className="text-lg md:text-xl font-bold text-[#003E29]">Our Vision</h2>
            </div>
            <p className="text-sm md:text-base font-medium text-gray-700 text-justify">
              To empower every investor and trader with professional-grade market intelligence, fostering a community of informed and successful market participants. We aim to be the most trusted <strong>SEBI Registered Research Analyst</strong> in India, known for our transparent, ethical, and high-accuracy research that simplifies wealth creation.
            </p>
          </div>

          {/* Mission Section - Styled like General Disclaimer */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Our Mission
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                At <strong>Monexaa Research</strong>, our mission is to provide high-quality, unbiased, and actionable financial research that helps our clients navigate the complexities of the stock market. We are dedicated to:
              </p>
              <ul className="list-disc pl-5 space-y-2 marker:text-[#0F8B6E]">
                <li>Delivering consistent value through expert technical and fundamental analysis.</li>
                <li>Providing high-accuracy recommendations based on thorough analysis.</li>
                <li>Empowering traders with research to make informed decisions.</li>
                <li>Providing timely updates on Nifty, BankNifty, and Stock Futures to capture market opportunities.</li>
              </ul>
            </div>
          </section>

          {/* Core Values Grid */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-[#0F8B6E] mt-1">{value.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-[#003E29] mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-600 text-justify">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Why Choose Us - SEO Rich Section */}
          <section>
            <h2 className="text-xl font-bold text-[#0F8B6E] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#003E29] rounded-full"></span>
              Why Choose Monexaa Research?
            </h2>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-sm md:text-base text-justify">
              <p className="mb-4">
                In the crowded space of stock market advisory, <strong>Monexaa Research</strong> stands out due to our unwavering commitment to quality and compliance. As a SEBI Registered firm, we prioritize your financial safety above all else. Our team of experienced analysts uses advanced charting tools and deep market understanding to generate calls with high accuracy.
              </p>
              <p className="mb-4">
                Whether you are looking for <strong>intraday tips, positional trading strategies, or long-term investment advice</strong>, our research is tailored to suit diverse risk profiles. We believe in transparency—our track record speaks for itself. Join us to experience a professional approach to trading and investing.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-green-50 text-[#003E29] text-xs font-bold rounded-full border border-green-100">SEBI Registered</span>
                <span className="px-3 py-1 bg-green-50 text-[#003E29] text-xs font-bold rounded-full border border-green-100">High Accuracy</span>
                <span className="px-3 py-1 bg-green-50 text-[#003E29] text-xs font-bold rounded-full border border-green-100">Expert Support</span>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-6 font-medium text-lg">
              Ready to start your wealth creation journey with a trusted partner?
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="/contact-us" className="bg-[#0F8B6E] text-white px-8 py-3 rounded-full font-bold hover:bg-[#003E29] transition-colors shadow-md flex items-center gap-2">
                <FaUserShield /> Contact Our Experts
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default Vision;
