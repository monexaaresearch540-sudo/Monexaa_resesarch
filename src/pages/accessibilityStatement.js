import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  FaUniversalAccess, 
  FaCheckCircle, 
  FaLaptopCode, 
  FaRegComments, 
  FaShieldAlt,
  FaExternalLinkAlt,
  FaKeyboard,
  FaDesktop,
  FaVial,
  FaExclamationTriangle,
  FaVideo,
  FaClosedCaptioning,
  FaSignLanguage,
  FaSlidersH,
  FaDownload,
  FaFilePdf,
  FaFileCode,
  FaPrint,
  FaTable
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

export default function AccessibilityStatement() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-transparent font-sans text-gray-800">
      <Helmet>
        <title>Accessibility Statement | Monexaa Research</title>
        <meta name="description" content="Monexaa Research Accessibility Statement. Our commitment to WCAG 2.1 Level AA conformance and inclusive design." />
        <link rel="canonical" href="https://www.monexaaresearch.com/accessibility-statement" />
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
            <FaUniversalAccess className="text-3xl text-[#0F8B6E]" />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#003E29] mb-3 tracking-tight">
            Accessibility <span className="text-[#0F8B6E]">Statement</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Monexaa Research is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Easy Read Summary */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#003E29] mb-4 flex items-center gap-2">
                    <FaUniversalAccess className="text-[#0F8B6E]" /> Easy Read Summary
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                    This website should be easy to use for everyone. You can use the keyboard, change text size, and turn off animations. Videos have captions and transcripts. If you face any problem, you can tell us.
                </p>
            </motion.div>

            {/* Conformance Status */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#003E29] mb-4 flex items-center gap-2">
                    <FaCheckCircle className="text-[#0F8B6E]" /> Conformance Status
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Our target is <span className="font-bold">WCAG 2.1 Level AA conformance</span>. To achieve and maintain this, we regularly:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 ml-2 mb-6">
                    <li>Run automated accessibility scans</li>
                    <li>Conduct manual audits</li>
                    <li>Incorporate user feedback</li>
                </ul>

                <h3 className="text-lg font-bold text-[#003E29] mb-3 flex items-center gap-2">
                    <FaTable className="text-[#0F8B6E]" /> WCAG 2.1 AA Self-Audit (Summary)
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-gray-50 text-gray-700 font-bold">
                            <tr>
                                <th className="p-3 border-b">Criterion</th>
                                <th className="p-3 border-b">Description</th>
                                <th className="p-3 border-b">Status</th>
                                <th className="p-3 border-b">Last Check</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {[
                                { id: '1.3.1', desc: 'Info and Relationships', status: 'Compliant', date: 'December 06, 2025' },
                                { id: '1.4.3', desc: 'Contrast (Minimum)', status: 'Compliant', date: 'December 06, 2025' },
                                { id: '2.1.1', desc: 'Keyboard', status: 'Compliant', date: 'December 06, 2025' },
                                { id: '2.4.7', desc: 'Focus Visible', status: 'Compliant', date: 'December 06, 2025' },
                            ].map((row) => (
                                <tr key={row.id}>
                                    <td className="p-3 font-mono text-xs">{row.id}</td>
                                    <td className="p-3">{row.desc}</td>
                                    <td className="p-3 text-green-600 font-bold flex items-center gap-1">
                                        <FaCheckCircle className="text-xs" /> {row.status}
                                    </td>
                                    <td className="p-3 text-gray-500 text-xs">{row.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Implementation & Compatibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-[#003E29] mb-4 flex items-center gap-2">
                        <FaLaptopCode className="text-[#0F8B6E]" /> What We’ve Implemented
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2"><span className="text-[#0F8B6E] mt-1">●</span> Keyboard navigable interface and visible focus states</li>
                        <li className="flex items-start gap-2"><span className="text-[#0F8B6E] mt-1">●</span> Semantic HTML and appropriate ARIA labels</li>
                        <li className="flex items-start gap-2"><span className="text-[#0F8B6E] mt-1">●</span> Color contrast improvements and High Contrast mode</li>
                        <li className="flex items-start gap-2"><span className="text-[#0F8B6E] mt-1">●</span> Options to adjust text size and motion reduction</li>
                        <li className="flex items-start gap-2"><span className="text-[#0F8B6E] mt-1">●</span> Clear form labels, instructions, and error feedback</li>
                    </ul>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-[#003E29] mb-4 flex items-center gap-2">
                        <FaDesktop className="text-[#0F8B6E]" /> Compatibility
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                        The site is compatible with modern browsers (Chromium, Firefox, Safari) and leading screen readers (NVDA, JAWS, VoiceOver) on supported operating systems.
                    </p>
                    <h3 className="text-sm font-bold text-[#003E29] mb-2 flex items-center gap-2">
                        <FaKeyboard className="text-[#0F8B6E]" /> Quick Help: Keyboard & Landmarks
                    </h3>
                    <ul className="space-y-1 text-xs text-gray-600">
                        <li>• Use <b>Tab/Shift+Tab</b> to move between interactive elements.</li>
                        <li>• Use the <b>skip link</b> (visible on focus) to jump to main content.</li>
                        <li>• Regions: header, navigation, main, complementary, and contentinfo.</li>
                    </ul>
                </motion.div>
            </div>

            {/* Testing & Scan Results */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-[#003E29] mb-4 flex items-center gap-2">
                            <FaVial className="text-[#0F8B6E]" /> How We Test
                        </h2>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs" /> Automated scans (axe, eslint-plugin-jsx-a11y, pa11y)</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs" /> Keyboard-only walkthroughs of key user flows</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs" /> Screen reader spot checks (NVDA/VoiceOver)</li>
                            <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 text-xs" /> Regular improvements based on user feedback</li>
                        </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                        <h3 className="text-sm font-bold text-[#003E29] mb-3 uppercase tracking-wide">Latest Automated Scan (Snapshot)</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between border-b border-gray-200 pb-1">
                                <span className="text-gray-600">Critical</span>
                                <span className="font-bold text-green-600">0</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-1">
                                <span className="text-gray-600">Serious</span>
                                <span className="font-bold text-green-600">0</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-1">
                                <span className="text-gray-600">Moderate/Minor</span>
                                <span className="font-bold text-yellow-600">Few, under review</span>
                            </div>
                            <div className="flex justify-between pt-1">
                                <span className="text-gray-500 text-xs">Last run</span>
                                <span className="font-mono text-xs text-gray-700">December 06, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Limitations & Mitigation */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#003E29] mb-4 flex items-center gap-2">
                    <FaExclamationTriangle className="text-yellow-500" /> Known Limitations & Mitigation
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                    Some third‑party widgets or tools may be outside our direct control. Where possible, we provide alternative solutions or fallbacks.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
                    <h3 className="text-sm font-bold text-yellow-800 mb-1">Third-party Widget Mitigation</h3>
                    <p className="text-xs text-yellow-700 leading-relaxed">
                        Some third-party widgets (e.g., translation tools) inject iframes which can produce false-positive findings. To reduce scanner noise, we apply a defensive sanitation routine in the site footer that marks clearly decorative or auxiliary third-party frames as inert, adds ARIA hints, and sets descriptive titles.
                    </p>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
                    <li>Embedded maps and some analytics dashboards</li>
                    <li>External chat or survey widgets</li>
                </ul>
            </motion.div>

            {/* Media Accessibility */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#003E29] mb-4 flex items-center gap-2">
                    <FaVideo className="text-[#0F8B6E]" /> Media Accessibility
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                    For audio/video content we publish, we will provide synchronized captions, full transcripts, and Indian Sign Language (ISL) interpretation where appropriate.
                </p>

                {/* Video Player */}
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="bg-gray-100 p-2 border-b border-gray-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase">Featured Video</span>
                        <div className="flex gap-2">
                            <span className="bg-[#0F8B6E] text-white text-[10px] px-2 py-0.5 rounded font-bold">CC</span>
                            <span className="bg-[#0F8B6E] text-white text-[10px] px-2 py-0.5 rounded font-bold">Audio Description</span>
                        </div>
                    </div>
                    
                    <div className="relative pb-[56.25%] h-0 bg-black">
                        <iframe 
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/3f31oufqFSM?cc_load_policy=1" 
                            title="Web Accessibility Perspectives"
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="p-4 bg-white">
                        <h3 className="text-sm font-bold text-gray-800 mb-2">About Web Accessibility</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            This video from the W3C Web Accessibility Initiative (WAI) demonstrates how web accessibility is essential for people with disabilities and useful for everyone. It highlights the impact of accessibility on day-to-day digital interaction.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Controls & Downloads */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#003E29] text-white rounded-xl shadow-lg p-6">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <FaSlidersH className="text-[#0F8B6E]" /> Controls for You
                    </h2>
                    <p className="text-sm text-green-100 mb-4">
                        Use the Accessibility Menu (floating button) to change text size, contrast, line spacing, motion, and more.
                    </p>
                    <div className="bg-[#0F8B6E]/20 rounded p-3 text-xs text-green-200 font-mono">
                        Shortcut: Press "/" or Ctrl/⌘+K to jump directly to site search.
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-[#003E29] mb-4 flex items-center gap-2">
                        <FaDownload className="text-[#0F8B6E]" /> Download & Print
                    </h2>
                    <div className="space-y-3">
                        <button onClick={handlePrint} className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                            <span className="text-sm font-medium text-gray-700">Save as PDF (Print)</span>
                            <FaPrint className="text-gray-400 group-hover:text-[#0F8B6E]" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                            <span className="text-sm font-medium text-gray-700">Download HTML Version</span>
                            <FaFileCode className="text-gray-400 group-hover:text-[#0F8B6E]" />
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
                            <span className="text-sm font-medium text-gray-700">Download JSON Conformance</span>
                            <FaFilePdf className="text-gray-400 group-hover:text-[#0F8B6E]" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Feedback Footer */}
            <motion.div variants={fadeInUp} className="bg-green-50 rounded-xl border border-green-100 p-8 text-center">
                <FaRegComments className="text-4xl text-[#0F8B6E] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#003E29] mb-2">Feedback and Contact</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                    If you encounter any accessibility issues or need content in an alternative format, please tell us. We typically respond within 5 business days.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                        to="/accessibility-feedback" 
                        className="bg-[#003E29] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0F8B6E] transition-all shadow-md flex items-center gap-2"
                    >
                        Open Feedback Form <FaExternalLinkAlt className="text-xs" />
                    </Link>
                    <a 
                        href="mailto:support@Monexaaresearch.com" 
                        className="bg-white text-[#003E29] border border-[#003E29] px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-all flex items-center gap-2"
                    >
                        support@Monexaaresearch.com
                    </a>
                </div>
                <div className="mt-8 pt-6 border-t border-green-200 text-xs text-gray-500">
                    Standards and references: WCAG 2.1 • WAI • SEBI digital accessibility guidance
                    <br/>
                    Last updated: December 06, 2025
                </div>
            </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
