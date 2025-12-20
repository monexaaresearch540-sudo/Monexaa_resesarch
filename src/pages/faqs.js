import FAQ from '../components/FAQ'; // Assuming there is an FAQ component based on file list
import React from 'react';
import { Helmet } from 'react-helmet-async';

const FAQs = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Helmet>
        <title>FAQs | Monexaa Research - Common Questions on Stock Market Services</title>
        <meta name="description" content="Have questions about Monexaa Research? Find answers to common queries regarding our stock market tips, subscription plans, payment methods, and trading support." />
        <meta name="keywords" content="Monexaa Research FAQ, Stock Market Questions, Trading Service Queries, Subscription Help, Payment Questions, Share Market Advisory FAQ, Common Trading Doubts" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.monexaaresearch.com/faqs" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.monexaaresearch.com/faqs" />
        <meta property="og:title" content="FAQs | Monexaa Research - Common Questions on Stock Market Services" />
        <meta property="og:description" content="Find answers to frequently asked questions about Monexaa Research stock market tips, trading services, and expert advisory." />
        <meta property="og:image" content="https://www.monexaaresearch.com/assest/logo/logo2.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.monexaaresearch.com/faqs" />
        <meta property="twitter:title" content="FAQs - Monexaa Research | Stock Market & Trading Questions Answered" />
        <meta property="twitter:description" content="Find answers to frequently asked questions about Monexaa Research stock market tips, trading services, and expert advisory." />
        <meta property="twitter:image" content="https://www.monexaaresearch.com/assest/logo/logo2.png" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "name": "Monexaa Research - Frequently Asked Questions",
              "description": "Comprehensive answers to common questions about Monexaa Research stock market tips and trading services.",
              "url": "https://www.monexaaresearch.com/faqs",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What services does Monexaa Research provide?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Monexaa Research provides expert stock market advisory services including Stock Options, Rapid Index, Stock Futures, Option BTST, Cash Positional, and various combo packages for equity and derivatives trading."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How accurate are Monexaa Research stock tips?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Monexaa Research provides data-driven stock market tips backed by technical and fundamental analysis. Our experienced research team aims for high accuracy, though market investments always carry inherent risks."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I subscribe to Monexaa Research services?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can subscribe by visiting our services pages, selecting your preferred plan, and contacting us via phone at +91 62326 78136, WhatsApp, or email at support@monexaaresearch.com."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the duration of subscription plans?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Monexaa Research offers flexible subscription plans including monthly, quarterly, half-yearly, and annual packages to suit different trading needs and budgets."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide free trial for your services?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Please contact our support team at +91 62326 78136 or support@monexaaresearch.com to inquire about current trial offers and promotional packages."
                  }
                }
              ],
              "publisher": {
                "@type": "Organization",
                "name": "Monexaa Research",
                "url": "https://www.monexaaresearch.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.monexaaresearch.com/assest/logo/logo2.png"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-62326-78136",
                  "contactType": "Customer Service",
                  "email": "support@monexaaresearch.com",
                  "areaServed": "IN",
                  "availableLanguage": ["Hindi", "English"]
                }
              }
            }
          `}
        </script>
      </Helmet>

      <div className="text-center pt-12 pb-8 px-4 bg-transparent">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#003E29] mb-4">Frequently Asked Questions</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Get answers to common questions about Monexaa Research stock market tips, trading services, subscription plans, and expert advisory.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <FAQ />
      </div>
    </div>
  );
};

export default FAQs;
