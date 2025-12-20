import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ref, onValue } from 'firebase/database';
import { getRdbInstance } from '../firebase';

export default function Payment() {
  const [qrCodes, setQrCodes] = useState({
    yesBank: '',
    hdfcBank: '',
    idfcBank: ''
  });

  useEffect(() => {
    // Push a page view event to GTM
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'page_view',
        page_type: 'Payment',
        page_path: '/payment'
      });
    } catch (e) {}

    // Fetch QR codes from Firebase
    const fetchQRCodes = async () => {
      try {
        const database = await getRdbInstance();
        if (!database) return;
        
        const qrRef = ref(database, 'paymentQRCodes');
        const unsubscribe = onValue(qrRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setQrCodes({
              yesBank: data.yesBank || '',
              hdfcBank: data.hdfcBank || '',
              idfcBank: data.idfcBank || ''
            });
          }
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching QR codes:', error);
      }
    };

    let unsubscribe;
    fetchQRCodes().then(unsub => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const bankDetails = [
    {
      id: 'yesBank',
      bankName: 'Yes Bank',
      logo: '',
      accountHolder: 'Monexaa Research',
      accountNumber: '119361900001142',
      ifscCode: 'YESB0001193',
      accountType: 'CURRENT',
      branch: 'SAPNA SANGITA BRANCH',
      color: '#004B8D'
    },
    {
      id: 'hdfcBank',
      bankName: 'HDFC Bank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/HDFC_Bank_Logo.svg',
      accountHolder: 'Monexaa Research',
      accountNumber: '50200112113808',
      ifscCode: 'HDFC0000404',
      accountType: 'CURRENT',
      branch: 'VIJAY NAGAR',
      color: '#004C8F'
    },
    {
      id: 'idfcBank',
      bankName: 'IDFC First Bank',
      logo: 'https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/logo.png',
      accountHolder: 'Monexaa Research',
      accountNumber: '86020684918',
      ifscCode: 'IDFB0041269',
      accountType: 'CURRENT',
      branch: 'VIJAY NAGAR',
      color: '#9D1939'
    }
  ];

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'copy_to_clipboard',
        copy_label: label,
        page: 'Payment'
      });
    } catch (e) {}
    alert(`${label} copied to clipboard!`);
  };

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Helmet>
        <title>Payment Details | Monexaa Research - Secure Bank Transfer Options</title>
        <meta name="description" content="Securely pay for Monexaa Research services. Find our official bank account details for NEFT, RTGS, IMPS, and UPI transfers. Safe and transparent transactions." />
        <meta name="keywords" content="Monexaa Research Payment, Bank Account Details, Subscription Payment, NEFT Details, RTGS Information, UPI Payment Monexaa, Official Bank Accounts" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Monexaa Research" />
        <meta name="theme-color" content="#0F8B6E" />
        <link rel="canonical" href="https://www.monexaaresearch.com/payment" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.monexaaresearch.com/payment" />
        <meta property="og:title" content="Payment Details | Monexaa Research - Secure Bank Transfer Options" />
        <meta property="og:description" content="Secure payment options and bank account details for Monexaa Research services." />
        <meta property="og:image" content="https://www.monexaaresearch.com/assest/logo/logo2.png" />
        <meta property="og:image:secure_url" content="https://www.monexaaresearch.com/assest/logo/logo2.png" />
        <meta property="og:image:alt" content="Monexaa Research Logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Monexaa Research" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.monexaaresearch.com/payment" />
        <meta property="twitter:title" content="Payment Options - Monexaa Research" />
        <meta property="twitter:description" content="Secure payment options and bank account details for Monexaa Research services." />
        <meta property="twitter:image" content="https://www.monexaaresearch.com/assest/logo/logo2.png" />
        <meta name="twitter:image:alt" content="Monexaa Research Logo" />
        <meta name="twitter:site" content="@MonexaaResearch" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Payment Options - Monexaa Research",
              "description": "Secure payment options and bank account details for Monexaa Research services.",
              "url": "https://www.monexaaresearch.com/payment",
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://www.monexaaresearch.com/"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Payment",
                    "item": "https://www.monexaaresearch.com/payment"
                  }
                ]
              },
              "mainEntity": {
                "@type": "Organization",
                "name": "Monexaa Research",
                "url": "https://www.monexaaresearch.com",
                "logo": "https://www.monexaaresearch.com/assest/logo/logo2.png",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "261, PU-4, Plot No. 26, Scheme No. 54",
                  "addressLocality": "Indore",
                  "addressRegion": "Madhya Pradesh",
                  "postalCode": "452010",
                  "addressCountry": "IN"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91 62326 78136",
                  "contactType": "customer service",
                  "areaServed": "IN",
                  "availableLanguage": ["en", "hi"]
                },
                "sameAs": [
                  "https://www.facebook.com",
                  "https://www.linkedin.com/company/monexaa-research/",
                  "https://x.com/MonexaaResearch",
                  "https://www.instagram.com/monexaa_research/"
                ]
              }
            }
          `}
        </script>
      </Helmet>

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Payment Options
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
            Secure payments for Monexaa Research services.
          </p>
        </div>

        {/* Bank Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {bankDetails.map((bank) => (
            <div
              key={bank.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              {/* Bank Header with Logo */}
              <div 
                className="p-3 sm:p-4 md:p-5 text-white relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${bank.color} 0%, ${bank.color}dd 100%)`
                }}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div className="bg-white rounded-lg p-2 shadow-lg">
                    <img 
                      src={bank.logo} 
                      alt={`${bank.bankName} Logo`}
                      className="h-5 sm:h-6 md:h-7 w-auto object-contain"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div style={{ display: 'none' }} className="text-gray-800 font-bold text-xs">
                      {bank.bankName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-80">A/C Type</div>
                    <div className="text-xs sm:text-sm font-semibold">{bank.accountType}</div>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mb-0.5">{bank.bankName}</h2>
                <p className="text-xs sm:text-sm opacity-90">{bank.branch}</p>
              </div>

              {/* Account Details */}
              <div className="p-3 sm:p-4 md:p-5 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Account Holder
                  </label>
                  <p className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">
                    {bank.accountHolder}
                  </p>
                </div>

                <div className="border-t pt-3">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Account Number
                  </label>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-sm sm:text-base font-mono font-bold text-gray-900 break-all">
                      {bank.accountNumber}
                    </p>
                    <button
                      onClick={() => copyToClipboard(bank.accountNumber, 'Account Number')}
                      className="ml-1 sm:ml-2 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                      title="Copy Account Number"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    IFSC Code
                  </label>
                  <div className="flex items-center justify-between mt-0.5">
                    <p className="text-sm sm:text-base font-mono font-bold text-gray-900">
                      {bank.ifscCode}
                    </p>
                    <button
                      onClick={() => copyToClipboard(bank.ifscCode, 'IFSC Code')}
                      className="ml-1 sm:ml-2 p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                      title="Copy IFSC Code"
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* QR Code Section */}
                {qrCodes[bank.id] && (
                  <div className="border-t pt-3">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      Scan to Pay
                    </label>
                    <div className="bg-gray-50 rounded-lg p-3 flex justify-center">
                      <img 
                        src={qrCodes[bank.id]} 
                        alt={`${bank.bankName} QR Code`}
                        className="w-32 h-32 sm:w-40 sm:h-40 object-contain rounded-lg shadow-md"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-2.5 sm:p-3 border border-green-200">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-green-600 mt-0.5 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-xs text-gray-700 leading-snug">
                      Official account. Share payment details after transaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice Section */}
        <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-lg p-3 sm:p-4 md:p-5 shadow-lg">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2">Important Instructions</h3>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-1.5 sm:mr-2">•</span>
                    <span>Only pay to accounts listed above.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-1.5 sm:mr-2">•</span>
                    <span>Share transaction details via WhatsApp <strong>+91 62326 78136</strong> or email <strong>support@monexaaresearch.com</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-1.5 sm:mr-2">•</span>
                    <span>Subscription activated within 24 hours.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-1.5 sm:mr-2">•</span>
                    <span>Support: 9:30 AM - 6:00 PM (Mon-Sat)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto mt-4 sm:mt-6">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 text-center">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Need Help?</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Contact our support team</p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-stretch sm:items-center">
              <a 
                href="tel:+916232678136"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
                onClick={() => {
                  try {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: 'contact_click',
                      contact_method: 'phone',
                      value: '+916232678136',
                      page: 'Payment'
                    });
                  } catch (e) {}
                }}
              >
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="hidden sm:inline">Call: </span>+91 62326 78136
              </a>
              <a 
                href="https://wa.me/916232678136"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
                onClick={() => {
                  try {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: 'contact_click',
                      contact_method: 'whatsapp',
                      value: '+916232678136',
                      page: 'Payment'
                    });
                  } catch (e) {}
                }}
              >
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a 
                href="mailto:support@monexaaresearch.com"
                className="inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs sm:text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg"
                onClick={() => {
                  try {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                      event: 'contact_click',
                      contact_method: 'email',
                      value: 'support@monexaaresearch.com',
                      page: 'Payment'
                    });
                  } catch (e) {}
                }}
              >
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
