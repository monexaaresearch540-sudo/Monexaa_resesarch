import React from 'react';
import { Link } from 'react-router-dom';
import { FaDatabase, FaUsers, FaHeadset } from 'react-icons/fa';
// Hero component (moved from pages/Hero.js)
import groupImg from '../assest/image/Group.png';
import vectorLeft from '../assest/image/Vector 1.png';
import vectorRight from '../assest/image/Vector 2.png';

export default function Hero() {
  return (
    <div role="main" className="py-8 sm:py-10 md:py-12 px-4 rounded-xl sm:rounded-2xl overflow-visible hero-gradient bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0b2b28] leading-tight fade-up animate-heading-loop">
              <span className="inline-flex items-center gap-1 -ml-2 md:-ml-8">
                <img src={vectorLeft} alt="ornament left" className="w-8 md:w-12" />
                <span className="text-accent-start font-marcellus">The</span>
              </span>
              <span className="ml-0">Smarter way</span>
              <span className="ml-0">to</span>
              <br />
              Invest your
              <span className="inline-flex items-center gap-1 ml-2">
                <strong className="text-accent-start animate-accent-loop">Money</strong>
                <img src={vectorRight} alt="ornament right" className="w-8 md:w-12 -ml-1" />
              </span>
            </h1>
          <p className="text-base sm:text-lg text-gray-700 max-w-md sm:max-w-2xl mx-auto md:mx-0 fade-up-1">Access 40,000+ instruments — across asset classes — to trade, hedge and invest from a single account.</p>
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 mt-3 fade-up-2">
            <Link
              className="inline-block bg-gradient-to-b from-accent-start to-accent-end text-white px-6 py-3 rounded-xl shadow-lg hover:-translate-y-1 transition-transform"
              to="/aboutUs"
              aria-label="Discover Monexaa"
            >
              Discover it now
            </Link>

            <a
              className="inline-block border border-accent-start text-accent-start bg-white px-5 py-3 rounded-xl shadow-sm transition"
              href="#services"
              aria-label="See our services"
            >
              Our Services
            </a>
          </div>

          <div className="mt-3 text-center md:text-left">
            <p className="disclaimer text-xs text-gray-600 max-w-md md:max-w-lg mx-auto md:mx-0">
              Products offered are subject to market risks. Please read the <Link to="/disclosure" className="underline">disclaimer and disclosures</Link> carefully before investing.
            </p>
          </div>

          {/* quick stats */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-600 fade-up-3">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
              <FaDatabase className="text-accent-start" />
              <div>
                <div className="font-bold">40,000+</div>
                <div className="text-xs">Instruments</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
              <FaUsers className="text-accent-start" />
              <div>
                <div className="font-bold">100+</div>
                <div className="text-xs">Trusted advisors</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
              <FaHeadset className="text-accent-start" />
              <div>
                <div className="font-bold">24/7</div>
                <div className="text-xs">Support</div>
              </div>
            </div>
          </div>
          </div>

          <div className="mt-6 md:mt-0 flex justify-center md:justify-end fade-up-3 hero-media">
            <img
              src={groupImg}
              alt="Group of investors and charts"
              className="hero-image w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl object-contain"
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
