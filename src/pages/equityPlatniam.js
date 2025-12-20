import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle, FaExclamationTriangle, FaRupeeSign, FaLightbulb, FaChartLine, FaUsers, FaHeadset, FaShieldAlt, FaChartBar, FaChevronDown, FaChevronUp, FaCrown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import heroImage from '../assest/image/handcoin1.png';
const heroVideo = process.env.PUBLIC_URL + '/assest/video/6917147_Motion_Graphics_Motion_Graphic_3840x2160.mp4';
import vectorLeft from '../assest/image/Vector 1.png';
import vectorRight from '../assest/image/Vector 2.png';

const EquityPlatniam = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Equity Platinum Services",
    "description": "Exclusive HNI service for high net worth individuals trading in Equity Cash segment.",
    "brand": {
      "@type": "Brand",
      "name": "Monexaa Research"
    },
    "offers": {
      "@type": "Offer",
      "price": "50000",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.monexaaresearch.com/"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Equity Platinum",
      "item": "https://www.monexaaresearch.com/equity-platinum"
    }]
  };

  return (
    <div className="w-full overflow-x-hidden">
      <Helmet>
        <title>Equity Platinum Services | Monexaa Research - HNI Stock Market Tips</title>
        <meta name="description" content="Join Monexaa Research's Equity Platinum service for HNI investors. Get exclusive, high-conviction stock market tips with personalized support and superior accuracy." />
        <meta name="keywords" content="Equity Platinum Tips, HNI Stock Tips, Premium Share Market Services, High Net Worth Investor Tips, Exclusive Stock Recommendations, Best HNI Advisory, Monexaa Research Platinum" />
        <link rel="canonical" href="https://www.monexaaresearch.com/equity-platinum" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.monexaaresearch.com/equity-platinum" />
        <meta property="og:title" content="Equity Platinum Services | Monexaa Research - HNI Stock Market Tips" />
        <meta property="og:description" content="Premium service for serious investors." />
        <meta property="og:image" content={`https://www.monexaaresearch.com${heroImage}`} />

        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Breadcrumbs */}
      <div className="bg-[#FFF4E9] px-4 py-2">
        <div className="max-w-7xl mx-auto text-sm text-gray-600">
          <Link to="/" className="hover:text-[#0F8B6E]">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-[#0F8B6E]">Equity Platinum</span>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative w-full py-10 md:py-20 px-4 hero-gradient bg-[#FFF4E9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
            <div className="space-y-6 text-center md:text-left z-10">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#0b2b28] leading-tight fade-up animate-heading-loop">
                <span className="inline-flex items-center gap-2 justify-center md:justify-start md:-ml-20">
                  <img src={vectorLeft} alt="ornament left" className="w-10 sm:w-16 md:w-20" />
                  <span className="text-accent-start font-marcellus">The</span>
                </span>
                <span className="block sm:inline ml-2">Premium</span>
                <span className="block sm:inline ml-2">Choice for</span>
                <br className="hidden sm:block" />
                <span className="inline-block mt-2">
                  <span className="inline-flex items-center gap-2 ml-2 align-middle">
                    <strong className="text-accent-start animate-accent-loop">HNI Traders</strong>
                    <img src={vectorRight} alt="ornament right" className="w-10 sm:w-16 md:w-20" />
                  </span>
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-xl mx-auto md:mx-0 fade-up-1 leading-relaxed px-2 md:px-0">
                Experience the power of personalized research with our Equity Platinum service. Designed exclusively for High Net Worth Individuals who seek quality over quantity.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-6 fade-up-2">
                <a
                  className="inline-block w-full sm:w-auto bg-gradient-to-b from-accent-start to-accent-end text-white px-8 py-3.5 rounded-xl shadow-lg hover:-translate-y-1 transition-transform font-bold text-base sm:text-lg text-center"
                  href="#services"
                  aria-label="Subscribe Now"
                >
                  Get Started Now
                </a>
                <a
                  className="inline-block w-full sm:w-auto border-2 border-accent-start text-accent-start bg-white px-8 py-3.5 rounded-xl shadow-sm hover:bg-gray-50 transition font-bold text-base sm:text-lg text-center"
                  href="#payment-options"
                  aria-label="See details"
                >
                  View Plans
                </a>
              </div>

              <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 fade-up-3">
                <span className="bg-white/60 px-3 py-1.5 rounded-full border border-gray-200">#HNIServices</span>
                <span className="bg-white/60 px-3 py-1.5 rounded-full border border-gray-200">#PremiumPicks</span>
                <span className="bg-white/60 px-3 py-1.5 rounded-full border border-gray-200">#BigTargets</span>
              </div>
            </div>

            <div className="mt-8 md:mt-0 flex justify-center md:justify-end fade-up-3 relative px-4 md:px-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full blur-3xl"></div>
              <div className="border-4 border-[#0F8B6E] rounded-xl overflow-hidden shadow-2xl w-full max-w-[320px] sm:max-w-md md:w-[550px] lg:w-[650px] transform md:translate-x-4">
                <video
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section id="services" className="py-12 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#003E29] mb-4">Equity Platinum Services</h2>
            <div className="h-1.5 w-20 bg-[#0F8B6E] mx-auto rounded-full mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
              Our Platinum service focuses on <strong>High Conviction Ideas</strong> with larger targets. 
              We filter out the noise and provide you with only the best opportunities in the market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0F8B6E]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0F8B6E] transition-colors">
                <FaCrown className="text-xl sm:text-2xl text-[#0F8B6E] group-hover:text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Exclusive Picks</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Get access to exclusive research reports and stock picks that are not available in standard plans.
              </p>
            </div>

            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0F8B6E]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0F8B6E] transition-colors">
                <FaChartBar className="text-xl sm:text-2xl text-[#0F8B6E] group-hover:text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Bigger Targets</h3>
              <p className="text-sm sm:text-base text-gray-600">
                We aim for larger movements in stock prices, suitable for traders with higher capital and risk appetite.
              </p>
            </div>

            <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0F8B6E]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0F8B6E] transition-colors">
                <FaHeadset className="text-xl sm:text-2xl text-[#0F8B6E] group-hover:text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Dedicated Support</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Enjoy the privilege of a dedicated relationship manager for all your queries and support needs.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-[#003E29] rounded-2xl p-6 sm:p-8 text-white text-center shadow-2xl transform hover:scale-[1.01] transition-transform max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Sample Recommendation</h3>
            <div className="font-mono text-sm sm:text-lg md:text-xl bg-white/10 p-4 rounded-lg inline-block border border-white/20 break-all sm:break-normal">
              PLATINUM : BUY BAJFINANCE ABV 7500 TGT 7650/7800 SL 7350
            </div>
            <p className="mt-4 text-gray-300 text-xs sm:text-sm">
              *This is a sample recommendation for illustration purposes only.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="payment-options" className="py-12 md:py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Payment Options</h2>
            <p className="text-sm sm:text-base text-gray-600">Choose a plan that fits your trading style and duration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { duration: "Monthly Plan", price: "₹ 20,000 + 18% GST", popular: false },
              { duration: "Quarterly Plan", price: "₹ 45,000 + 18% GST", popular: true },
              { duration: "Half-Yearly Plan", price: "₹ 60,000 + 18% GST", popular: false },
            ].map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 ${plan.popular ? 'border-[#0F8B6E] transform md:-translate-y-4' : 'border-transparent'}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#0F8B6E] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6 sm:p-8 text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-500 mb-2">{plan.duration}</h3>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#003E29] mb-6">{plan.price}</div>
                  <ul className="text-left space-y-3 mb-8 text-gray-600 text-xs sm:text-sm">
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 flex-shrink-0" /> High Conviction Calls</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 flex-shrink-0" /> Bigger Targets</li>
                    <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 flex-shrink-0" /> Dedicated RM</li>
                  </ul>
                  <Link 
                    to="/payment" 
                    className={`block w-full py-3 rounded-xl font-bold transition-colors text-sm sm:text-base ${plan.popular ? 'bg-[#0F8B6E] text-white hover:bg-[#0b6b54]' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                  >
                    Pay Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">
            All charges are inclusive of 18% GST as per Government norms.
          </div>
        </div>
      </section>

      {/* Trading Rules Section */}
      <section id="rules" className="py-12 md:py-20 bg-transparent">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003E29] mb-6">Golden Rules of Trading</h2>
              <p className="text-gray-600 mb-8 text-base sm:text-lg">
                Discipline is the key to success in the stock market. Follow these rules to stay profitable and protect your capital.
              </p>
              <div className="space-y-4 sm:space-y-6">
                {[
                  "Do not trade without Stop loss order ever.",
                  "Don’t take loan or borrow money from anyone and trade in stock market.",
                  "Always take risk of your spare capital only.",
                  "Don’t be emotional or greedy while trading. Always take profit home whenever you see good profit.",
                  "Don’t panic in case of any reverse situation because ups and downs are part of market and hold your position with proper Stoploss."
                ].map((rule, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 font-medium pt-1 text-sm sm:text-base">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-amber-50 rounded-3xl p-8 md:p-12 border border-amber-100">
              <FaLightbulb className="text-5xl sm:text-6xl text-amber-400 mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Why Rules Matter?</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                "The stock market is designed to transfer money from the Active to the Patient."
              </p>
              <p className="mt-4 text-gray-600 text-sm sm:text-base">
                Our rules are designed to keep you patient, disciplined, and profitable in the long run.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services Section */}
      <section className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#003E29] mb-8 text-center">Explore Other Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link to="/stock-option" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Stock Option</h3>
              <p className="text-sm text-gray-600">High-leverage option strategies for stocks and indices.</p>
              <span className="text-[#0F8B6E] text-sm font-bold mt-4 inline-block">View Details →</span>
            </Link>
            <Link to="/rapid-index" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Rapid Index</h3>
              <p className="text-sm text-gray-600">Fast-paced index trading strategies for Nifty and Bank Nifty.</p>
              <span className="text-[#0F8B6E] text-sm font-bold mt-4 inline-block">View Details →</span>
            </Link>
            <Link to="/option-btst" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Option BTST</h3>
              <p className="text-sm text-gray-600">Buy Today Sell Tomorrow strategies for overnight gains.</p>
              <span className="text-[#0F8B6E] text-sm font-bold mt-4 inline-block">View Details →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-transparent">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#003E29] mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Common questions about our Equity Platinum services.</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "Who is this service for?",
                a: "This service is designed for High Net Worth Individuals (HNIs) who have a higher capital base and risk appetite."
              },
              {
                q: "What is the minimum capital required?",
                a: "We recommend a minimum capital of ₹5,00,000 to ₹10,00,000 for this service."
              },
              {
                q: "How many recommendations can I expect?",
                a: "We focus on quality. You can expect 1-2 high-conviction recommendations per day."
              },
              {
                q: "How will I receive the recommendations?",
                a: "Recommendations are delivered via SMS on your registered contact channel."
              },
              {
                q: "Can I get support if I have questions?",
                a: "Our support team is available during Indian market hours."
              },
              {
                q: "Is there a refund policy?",
                a: "Please refer to our terms and conditions or contact support for refund-related queries."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 sm:p-6 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-bold text-gray-800 text-sm sm:text-base">{faq.q}</span>
                  {openFaq === index ? <FaChevronUp className="text-[#0F8B6E]" /> : <FaChevronDown className="text-gray-400" />}
                </button>
                {openFaq === index && (
                  <div className="p-4 sm:p-6 bg-white text-gray-600 text-sm sm:text-base border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEBI Compliance Footer Section */}
      <section className="py-8 bg-transparent text-black text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="border-l-4 border-[#0F8B6E] pl-4 sm:pl-6">
            <h3 className="text-black text-sm sm:text-base font-bold mb-2 flex items-center gap-2">
              <FaExclamationTriangle className="text-amber-500" /> Important Risk Disclosure
            </h3>
            <p className="mb-2 leading-relaxed">
              Investment in securities market are subject to market risks. Read all the related documents carefully before investing. 
              Monexaa Research does not guarantee any kind of assured return. Please trade only on recommendations provided through our official channels.
              <strong>Monexaa Research is a SEBI Registered Investment Adviser (IA)</strong>. Any amount paid to the company is only for investment adviser fees.
              Kindly note that past performance is not necessarily an indicator of future performance.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default EquityPlatniam;
