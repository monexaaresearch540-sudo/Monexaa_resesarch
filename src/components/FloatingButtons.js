import React, { useState, useEffect } from 'react';
import { FaPlus, FaUniversalAccess, FaWhatsapp, FaPhone, FaVolumeUp, FaChevronDown, FaChevronUp, FaVolumeMute } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AccessibilityMenu from './AccessibilityMenu';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isAutoSpeak, setIsAutoSpeak] = useState(() => {
    return localStorage.getItem('autoSpeak') === 'true';
  });
  const location = useLocation();

  const getPageDescription = (path, lang = 'en') => {
    const descriptions = {
      en: {
        '/': "Welcome to the Home page of Monexaa Research. We provide expert financial advice and market insights.",
        '/about-us': "This is the About Us page. Learn about our company history, our team, and our mission to help you succeed.",
        '/contact-us': "This is the Contact Us page. Reach out to us via phone, email, or visit our office.",
        '/services': "This is the Services page. Explore our wide range of trading and investment services.",
        '/blogs': "This is the Blogs page. Read expert articles and stay informed about market trends.",
        '/market-news': "This is the Market News page. Get the latest updates on stock markets and financial news.",
        '/accessibility-statement': "This is the Accessibility Statement page. We are committed to ensuring digital accessibility for people with disabilities.",
        '/disclaimer': "This is the Disclaimer page. Please read our terms regarding investment risks.",
        '/privacy-policy': "This is the Privacy Policy page. Learn how we handle and protect your personal data.",
        '/terms-and-conditions': "This is the Terms and Conditions page. Read the rules and regulations for using our services.",
        '/complaint-box': "This is the Complaint Box page. You can register your grievances here.",
        '/faqs': "This is the Frequently Asked Questions page. Find answers to common queries.",
        '/vision': "This is the Vision page. Discover our long-term goals and values.",
        '/jobs': "This is the Careers page. Check out current job openings at Monexaa Research.",
        '/payment': "This is the Payment page. Securely complete your transactions here.",
        '/refund-policy': "This is the Refund Policy page. Understand our policies regarding refunds and cancellations.",
      },
      hi: {
        '/': "मोनेक्सा रिसर्च के होम पेज पर आपका स्वागत है। हम विशेषज्ञ वित्तीय सलाह और बाजार अंतर्दृष्टि प्रदान करते हैं।",
        '/about-us': "यह हमारे बारे में (About Us) पेज है। हमारे कंपनी के इतिहास, हमारी टीम और आपकी सफलता में मदद करने के हमारे मिशन के बारे में जानें।",
        '/contact-us': "यह संपर्क (Contact Us) पेज है। फोन, ईमेल या हमारे कार्यालय में आकर हमसे संपर्क करें।",
        '/services': "यह सेवाएँ (Services) पेज है। हमारी ट्रेडिंग और निवेश सेवाओं की विस्तृत श्रृंखला का अन्वेषण करें।",
        '/blogs': "यह ब्लॉग पेज है। विशेषज्ञ लेख पढ़ें और बाजार के रुझानों के बारे में सूचित रहें।",
        '/market-news': "यह मार्केट न्यूज़ पेज है। शेयर बाजार और वित्तीय समाचारों पर नवीनतम अपडेट प्राप्त करें।",
        '/accessibility-statement': "यह एक्सेसिबिलिटी स्टेटमेंट पेज है। हम विकलांग लोगों के लिए डिजिटल पहुंच सुनिश्चित करने के लिए प्रतिबद्ध हैं।",
        '/disclaimer': "यह अस्वीकरण (Disclaimer) पेज है। कृपया निवेश जोखिमों के बारे में हमारी शर्तों को पढ़ें।",
        '/privacy-policy': "यह गोपनीयता नीति (Privacy Policy) पेज है। जानें कि हम आपके व्यक्तिगत डेटा को कैसे संभालते और सुरक्षित रखते हैं।",
        '/terms-and-conditions': "यह नियम और शर्तें (Terms and Conditions) पेज है। हमारी सेवाओं का उपयोग करने के लिए नियम और विनियम पढ़ें।",
        '/complaint-box': "यह शिकायत बॉक्स पेज है। आप यहां अपनी शिकायतें दर्ज कर सकते हैं।",
        '/faqs': "यह अक्सर पूछे जाने वाले प्रश्न (FAQs) पेज है। सामान्य प्रश्नों के उत्तर यहां पाएं।",
        '/vision': "यह विज़न पेज है। हमारे दीर्घकालिक लक्ष्यों और मूल्यों की खोज करें।",
        '/jobs': "यह करियर पेज है। मोनेक्सा रिसर्च में वर्तमान नौकरी के अवसरों की जांच करें।",
        '/payment': "यह भुगतान (Payment) पेज है। यहां अपने लेनदेन को सुरक्षित रूप से पूरा करें।",
        '/refund-policy': "यह रिफंड पॉलिसी पेज है। रिफंड और रद्दीकरण के बारे में हमारी नीतियों को समझें।",
      }
    };

    // Normalize path
    const normalizedPath = path.toLowerCase().replace(/\/$/, "") || '/';

    if (descriptions[lang] && descriptions[lang][normalizedPath]) {
      return descriptions[lang][normalizedPath];
    }

    // Fallback
    const readableName = normalizedPath.replace('/', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return lang === 'hi' 
      ? `आप वर्तमान में ${readableName} पेज पर हैं। अधिक जानने के लिए सामग्री का अन्वेषण करें।`
      : `You are currently on the ${readableName} page. Explore the content to learn more.`;
  };

  const speakPageInfo = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      // Detect language based on document content or simple heuristic
      // Since we don't have a global language state easily accessible, we'll check for Hindi characters in the body
      const bodyText = document.body.innerText.slice(0, 1000); // Check first 1000 chars
      const hasHindi = /[\u0900-\u097F]/.test(bodyText);
      const lang = hasHindi ? 'hi' : 'en';
      
      const description = getPageDescription(location.pathname, lang);
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Effect to handle auto-speak on page change
  useEffect(() => {
    if (isAutoSpeak) {
      // Small delay to allow page content to load/update for language detection
      const timer = setTimeout(() => {
        speakPageInfo();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isAutoSpeak]);

  const toggleAutoSpeak = () => {
    const newState = !isAutoSpeak;
    setIsAutoSpeak(newState);
    localStorage.setItem('autoSpeak', newState);
    
    if (newState) {
      speakPageInfo();
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
    <AccessibilityMenu isOpen={isAccessibilityOpen} onClose={() => setIsAccessibilityOpen(false)} />
    <div className="fixed bottom-6 right-2 md:right-6 z-[9999] flex flex-col items-center gap-2">
      
      {/* Main Buttons Container */}
      <div className={`flex flex-col items-center transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
        {/* Accessibility Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mb-3"
            >
              <button
                onClick={() => setIsAccessibilityOpen(true)}
                className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300"
                title="Accessibility"
                aria-label="Accessibility"
              >
                <FaUniversalAccess className="text-lg md:text-xl" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plus Button with Expandable Menu */}
        <div 
          className="relative flex flex-col items-center"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="absolute bottom-full pb-3 flex flex-col gap-3 items-center"
              >
                {/* Chat button removed as requested */}
                <button 
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                    isAutoSpeak ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-500 hover:bg-indigo-600'
                  } text-white hover:scale-110`}
                  title={isAutoSpeak ? "Turn Off Auto Speak" : "Turn On Auto Speak"}
                  onClick={toggleAutoSpeak}
                >
                  {isAutoSpeak ? <FaVolumeMute className="text-sm md:text-base" /> : <FaVolumeUp className="text-sm md:text-base" />}
                </button>
                <a 
                  href="https://wa.me/6232678136" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 md:w-10 md:h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-green-600 hover:scale-110 transition-all"
                  title="WhatsApp"
                >
                  <FaWhatsapp className="text-sm md:text-base" />
                </a>
                <a 
                  href="tel:+916232678136" 
                  className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-600 hover:scale-110 transition-all"
                  title="Call Us"
                >
                  <FaPhone className="text-sm md:text-base" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-xl text-white transition-all duration-300 ${
              isOpen ? 'bg-gray-700 rotate-45' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
            aria-label="More Actions"
          >
            <FaPlus className="text-lg md:text-xl" />
          </button>
        </div>
      </div>

      {/* Toggle Visibility Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="w-8 h-8 bg-gray-800/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-gray-800 transition-colors shadow-sm"
        title={isVisible ? "Hide Widgets" : "Show Widgets"}
      >
        {isVisible ? <FaChevronDown size={12} /> : <FaChevronUp size={12} />}
      </button>
    </div>
    </>
  );
};

export default FloatingButtons;
