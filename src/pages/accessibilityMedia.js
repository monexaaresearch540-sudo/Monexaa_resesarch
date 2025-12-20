import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FaVideo, 
  FaHeadphones, 
  FaClosedCaptioning, 
  FaSignLanguage, 
  FaDownload, 
  FaExclamationCircle, 
  FaExternalLinkAlt,
  FaPlay,
  FaFileAlt,
  FaListUl,
  FaUniversalAccess
} from 'react-icons/fa';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AccessibilityMedia() {
  const [activeTab, setActiveTab] = useState('transcript');

  return (
    <div className="min-h-screen bg-transparent font-sans text-gray-800">
      <Helmet>
        <title>Accessible Media | Monexaa Research</title>
        <meta name="description" content="Educational media resources with accessibility features including captions, transcripts, and ISL interpretation." />
        <link rel="canonical" href="https://www.monexaaresearch.com/accessibility-media" />
      </Helmet>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-12">
           <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-4 shadow-sm">
            <FaVideo className="text-3xl text-[#0F8B6E]" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#003E29] mb-3 tracking-tight">
            Accessible <span className="text-[#0F8B6E]">Media</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Educational resources designed for everyone. Watch, listen, and learn with inclusive features like captions, transcripts, and sign language interpretation.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Disclaimer */}
            <motion.div variants={fadeInUp} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex items-start gap-3">
                <FaExclamationCircle className="text-yellow-600 text-xl flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-sm font-bold text-yellow-800 mb-1">Education Purpose Only</h3>
                    <p className="text-xs text-yellow-700 leading-relaxed">
                        This page is for educational purposes only. It is not investment advice. Please consult a registered adviser before making any investment decision. For SEBI compliance, no performance/return claims are made.
                    </p>
                </div>
            </motion.div>

            {/* Main Video Section */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-[#003E29] flex items-center gap-2">
                            <FaPlay className="text-[#0F8B6E] text-sm" /> How does the Stock Market Work?
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Privacy-enhanced mode enabled. Watch on YouTube for full controls.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                            <FaClosedCaptioning /> CC
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                            <FaSignLanguage /> ISL
                        </span>
                    </div>
                </div>

                {/* Video Embed */}
                <div className="relative pb-[56.25%] h-0 bg-black">
                    <iframe 
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube-nocookie.com/embed/p7HKvqRI_Bo?cc_load_policy=1" 
                        title="How does the Stock Market Work?"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Media Controls / Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-gray-200">
                    
                    {/* Left: Transcript & Chapters */}
                    <div className="lg:col-span-2 border-r border-gray-200">
                        <div className="flex border-b border-gray-200">
                            <button 
                                onClick={() => setActiveTab('transcript')}
                                className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${activeTab === 'transcript' ? 'bg-white text-[#0F8B6E] border-b-2 border-[#0F8B6E]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                            >
                                Transcript
                            </button>
                            <button 
                                onClick={() => setActiveTab('chapters')}
                                className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${activeTab === 'chapters' ? 'bg-white text-[#0F8B6E] border-b-2 border-[#0F8B6E]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                            >
                                Chapters
                            </button>
                        </div>
                        
                        <div className="p-6 h-64 overflow-y-auto custom-scrollbar">
                            {activeTab === 'transcript' ? (
                                <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                                    <p><span className="font-bold text-[#003E29]">[00:00] Narrator:</span> In the 1600s, the Dutch East India Company employed hundreds of ships to trade gold, porcelain, spices, and silks around the globe.</p>
                                    <p><span className="font-bold text-[#003E29]">[00:15] Narrator:</span> But running this massive operation wasn't cheap. In order to fund their expensive voyages, the company turned to private citizens.</p>
                                    <p><span className="font-bold text-[#003E29]">[00:30] Narrator:</span> Individuals could invest money to support the trip in exchange for a share of the ship's profits. This practice allowed the company to afford even grander voyages.</p>
                                    <p className="italic text-gray-400 text-xs">[Visual: Animation of ships sailing and coins being exchanged]</p>
                                    <p><span className="font-bold text-[#003E29]">[01:00] Narrator:</span> Unknowingly, they invented the world's first stock market.</p>
                                    <p className="text-gray-400 text-xs italic mt-4">...Transcript continues...</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {[
                                        { time: '00:00', title: 'The First Stock Market' },
                                        { time: '01:15', title: 'How Companies Raise Capital' },
                                        { time: '02:30', title: 'Supply and Demand' },
                                        { time: '03:45', title: 'Why Stock Prices Change' },
                                        { time: '04:20', title: 'Conclusion' }
                                    ].map((chapter, idx) => (
                                        <button key={idx} className="w-full flex items-center gap-4 p-2 hover:bg-gray-50 rounded text-left group transition-colors">
                                            <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded group-hover:bg-[#0F8B6E] group-hover:text-white transition-colors">{chapter.time}</span>
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-[#003E29]">{chapter.title}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: ISL & Downloads */}
                    <div className="bg-gray-50 p-6 flex flex-col gap-6">
                        
                        {/* ISL Placeholder */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                                <FaSignLanguage /> ISL Interpretation
                            </h3>
                            <div className="bg-gray-800 rounded-lg aspect-video flex flex-col items-center justify-center text-center p-4 border border-gray-700 shadow-inner">
                                <FaSignLanguage className="text-gray-500 text-3xl mb-2" />
                                <p className="text-gray-400 text-xs font-medium">
                                    Indian Sign Language<br/>Interpretation View
                                </p>
                                <span className="mt-2 text-[10px] text-gray-500 bg-gray-900 px-2 py-0.5 rounded-full">
                                    Optional Overlay
                                </span>
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2 text-center">
                                When available, ISL video appears here.
                            </p>
                        </div>

                        {/* Downloads */}
                        <div>
                            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2">
                                <FaDownload /> Download Resources
                            </h3>
                            <div className="space-y-2">
                                <button className="w-full flex items-center justify-between p-2 bg-white border border-gray-200 rounded hover:border-[#0F8B6E] hover:text-[#0F8B6E] transition-all group">
                                    <div className="flex items-center gap-2">
                                        <FaVideo className="text-gray-400 group-hover:text-[#0F8B6E]" />
                                        <span className="text-xs font-bold">Video (MP4)</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400">720p • 50MB</span>
                                </button>
                                <button className="w-full flex items-center justify-between p-2 bg-white border border-gray-200 rounded hover:border-[#0F8B6E] hover:text-[#0F8B6E] transition-all group">
                                    <div className="flex items-center gap-2">
                                        <FaHeadphones className="text-gray-400 group-hover:text-[#0F8B6E]" />
                                        <span className="text-xs font-bold">Audio (MP3)</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400">128kbps • 10MB</span>
                                </button>
                                <button className="w-full flex items-center justify-between p-2 bg-white border border-gray-200 rounded hover:border-[#0F8B6E] hover:text-[#0F8B6E] transition-all group">
                                    <div className="flex items-center gap-2">
                                        <FaFileAlt className="text-gray-400 group-hover:text-[#0F8B6E]" />
                                        <span className="text-xs font-bold">Transcript (PDF)</span>
                                    </div>
                                    <span className="text-[10px] text-gray-400">Text • 2MB</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>

            {/* Guidelines Section */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
                <h2 className="text-lg font-bold text-[#003E29] mb-4 flex items-center gap-2">
                    <FaUniversalAccess className="text-[#0F8B6E]" /> Accessibility Guidelines for Media
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[#0F8B6E] rounded-full mt-1.5 flex-shrink-0"></span>
                            Provide captions for all videos (YouTube CC or .vtt).
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[#0F8B6E] rounded-full mt-1.5 flex-shrink-0"></span>
                            Provide a transcript where possible. Briefly describe key visual content.
                        </li>
                    </ul>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[#0F8B6E] rounded-full mt-1.5 flex-shrink-0"></span>
                            Offer Indian Sign Language (ISL) interpretation where required.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-[#0F8B6E] rounded-full mt-1.5 flex-shrink-0"></span>
                            Avoid rapid flashing; playback must be operable by keyboard.
                        </li>
                    </ul>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-600 mb-3">
                        Encountered an issue with our media content?
                    </p>
                    <Link 
                        to="/accessibility-feedback" 
                        className="inline-flex items-center gap-2 text-[#0F8B6E] font-bold hover:underline text-sm"
                    >
                        Report via Accessibility Feedback Page <FaExternalLinkAlt className="text-xs" />
                    </Link>
                </div>
            </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
