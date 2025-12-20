import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaUser, 
  FaCalendarAlt, 
  FaTag, 
  FaChevronRight, 
  FaRegClock,
  FaShareAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaArrowRight,
  FaLeaf,
  FaFire,
  FaChartLine,
  FaNewspaper,
  FaEnvelope,
  FaLock,
  FaSpinner
} from 'react-icons/fa';

// ==========================================
// CONFIGURATION
// ==========================================

const CATEGORIES = [
  { name: "business", label: "Business" },
  { name: "technology", label: "Technology" },
  { name: "general", label: "General" },
  { name: "science", label: "Science" },
  { name: "health", label: "Health" }
];

const POPULAR_TAGS = [
  "StockMarket", "Finance", "Investing", "Nifty50", "Economy", "BankNifty", "Business", "Sensex"
];

// ==========================================
// MAIN COMPONENT
// ==========================================

const Blogs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation Variants
  const fadeIn = {
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

  useEffect(() => {
    const fetchNews = async (isBackgroundRefresh = false) => {
      if (!isBackgroundRefresh) {
        setLoading(true);
      }
      setError(null);
      try {
        let url = `https://api.mediastack.com/v1/news?access_key=a75cd5c17277b76a94b3a426f7966eaf&languages=en&limit=${activeCategory === 'all' ? 100 : 20}`;
        if (activeCategory !== 'all') {
          url += `&categories=${activeCategory}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.data) {
          setPosts(data.data);
        } else {
           // Fallback or empty
           if (!isBackgroundRefresh) setPosts([]);
           if (data.error) console.error("API Error:", data.error);
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
        if (!isBackgroundRefresh) setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    // Auto-refresh every hour (3600000 ms) to keep news updated with market
    const intervalId = setInterval(() => {
      fetchNews(true);
    }, 3600000);

    return () => clearInterval(intervalId);
  }, [activeCategory]);

  // Filter Logic (Client side search on fetched data)
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Pagination Logic
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-transparent">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="text-4xl text-[#0F8B6E] animate-spin" />
          <p className="text-gray-600 font-medium">Loading latest market insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-transparent min-h-screen font-sans">
      <Helmet>
        <title>Stock Market Blogs | Monexaa Research - Expert Trading Insights & Analysis</title>
        <meta name="description" content="Read the latest stock market blogs, Nifty & Bank Nifty analysis, and trading strategies. Gain expert financial knowledge and market insights from Monexaa Research." />
        <meta name="keywords" content="Stock Market Blogs, Share Market Articles, Trading Strategies Blog, Nifty Analysis, Bank Nifty Prediction, Investment Tips, Financial Education, Stock Market Trends, Monexaa Research Blog, Technical Analysis Articles" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.monexaaresearch.com/blogs" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Stock Market Blogs | Monexaa Research - Expert Trading Insights" />
        <meta property="og:description" content="Get daily stock market updates, trading tips, and investment strategies. Stay ahead with Monexaa Research." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content="https://www.monexaaresearch.com/blogs" />
        <meta property="og:site_name" content="Monexaa Research" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Stock Market News & Trading Insights | Monexaa Research" />
        <meta name="twitter:description" content="Get daily stock market updates, trading tips, and investment strategies. Stay ahead with Monexaa Research." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12"
      >
        {/* ==========================================
            HEADER SECTION
           ========================================== */}
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-[#0F8B6E] text-xs font-bold tracking-wider uppercase mb-3">
              Monexaa Official Blog
            </span>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#003E29] mb-3 md:mb-4 tracking-tight">
            Monexaa <span className="text-[#0F8B6E] relative">
              Blogs
              <svg className="absolute w-full h-2 bottom-0 left-0 text-green-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg font-medium max-w-3xl mx-auto leading-relaxed px-2">
            Your ultimate destination for <strong className="text-[#0F8B6E]">Stock Market News</strong>, <strong className="text-[#0F8B6E]">Intraday Trading Tips</strong>, and <strong className="text-[#0F8B6E]">Nifty/Bank Nifty Analysis</strong>. Empower your investment journey with expert strategies and real-time market updates.
          </p>
        </div>

        {/* ==========================================
            FEATURED POST SECTION (First item from API)
           ========================================== */}
        {activeCategory === 'all' && !searchTerm && currentPage === 1 && posts.length > 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-56 sm:h-64 lg:h-auto relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <img 
                    src={posts[0].image || "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=1000&q=80"} 
                    alt={posts[0].title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=1000&q=80"}}
                  />
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <span className="bg-[#0F8B6E] text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1 shadow-lg">
                      <FaFire className="text-yellow-300" /> Featured
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-[#003E29] text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full uppercase tracking-wide shadow-lg">
                      {posts[0].category}
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-8 md:p-12 flex flex-col justify-center relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <FaNewspaper className="text-6xl md:text-9xl text-[#0F8B6E]" />
                  </div>
                  
                  <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-3 md:mb-4 relative z-10">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><FaCalendarAlt className="text-[#0F8B6E]" /> {formatDate(posts[0].published_at)}</span>
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded"><FaRegClock className="text-[#0F8B6E]" /> 5 min read</span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#003E29] mb-3 md:mb-4 hover:text-[#0F8B6E] transition-colors cursor-pointer relative z-10 leading-tight">
                    {posts[0].title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-lg relative z-10 line-clamp-3 md:line-clamp-none">
                    {posts[0].description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto relative z-10 pt-4 md:pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#0F8B6E] to-[#003E29] rounded-full flex items-center justify-center text-white shadow-md">
                        <FaUser className="text-sm md:text-lg" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#003E29]">{posts[0].author || "Monexaa Team"}</p>
                        <p className="text-xs text-gray-500 font-medium">Source: {posts[0].source}</p>
                      </div>
                    </div>
                    <a 
                      href={posts[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-2 text-[#0F8B6E] font-bold hover:text-[#003E29] transition-colors bg-green-50 px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-green-100 text-sm md:text-base"
                    >
                      Read Article <FaArrowRight className="transform group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ==========================================
              MAIN CONTENT COLUMN
             ========================================== */}
          <div className="lg:col-span-2">
            
            {/* Mobile Search Bar */}
            <div className="lg:hidden mb-8">
               <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#0F8B6E] focus:ring-2 focus:ring-[#0F8B6E]/20 outline-none transition-all shadow-sm group-hover:shadow-md"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#0F8B6E] transition-colors" />
                </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <h3 className="text-xl font-bold text-[#003E29] flex items-center gap-2">
                <FaLeaf className="text-[#0F8B6E]" /> 
                {searchTerm ? 'Search Results' : activeCategory === 'all' ? 'Latest Articles' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Articles`}
              </h3>
              <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredPosts.length} Posts
              </span>
            </div>

            {/* Blog Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid gap-8"
            >
              {currentPosts.length > 0 ? (
                currentPosts.map((post, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group h-auto md:h-64"
                  >
                    <div className="md:w-2/5 h-48 sm:h-56 md:h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                      <img 
                        src={post.image || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80"} 
                        alt={post.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1000&q=80"}}
                      />
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-white/95 backdrop-blur-sm text-[#003E29] text-[10px] sm:text-xs font-bold px-2 py-1 rounded shadow-sm border border-gray-100">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 md:w-3/5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 md:mb-3">
                          <span className="flex items-center gap-1"><FaCalendarAlt className="text-[#0F8B6E]" /> {formatDate(post.published_at)}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span className="flex items-center gap-1"><FaRegClock className="text-[#0F8B6E]" /> 5 min read</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-[#003E29] mb-2 hover:text-[#0F8B6E] transition-colors cursor-pointer line-clamp-2 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 md:mb-4 line-clamp-2 leading-relaxed">
                          {post.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-3 md:pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-600 border border-gray-200">
                            <FaUser />
                          </div>
                          <span className="text-xs font-bold text-gray-700 truncate max-w-[100px]">{post.author || "Monexaa Team"}</span>
                        </div>
                        <a 
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0F8B6E] text-sm font-bold hover:underline flex items-center gap-1 group/link"
                        >
                          Read More <FaChevronRight className="text-xs transform group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <FaSearch className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No articles found</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">We couldn't find any articles matching your search or category selection.</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
                    className="mt-6 px-6 py-2 bg-[#0F8B6E] text-white rounded-lg font-bold hover:bg-[#0b6b54] transition-colors shadow-md"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </motion.div>

            {/* Pagination */}
            {filteredPosts.length > postsPerPage && (
              <div className="flex justify-center mt-12 gap-2">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#0F8B6E] hover:text-white hover:border-[#0F8B6E] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600"
                >
                  &lt;
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                      currentPage === i + 1 
                        ? 'bg-[#0F8B6E] text-white shadow-md transform scale-105' 
                        : 'border border-gray-300 text-gray-600 hover:bg-[#0F8B6E] hover:text-white hover:border-[#0F8B6E]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#0F8B6E] hover:text-white hover:border-[#0F8B6E] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600"
                >
                  &gt;
                </button>
              </div>
            )}

            {/* SEBI Disclaimer Section */}
            <div className="mt-16 p-6 bg-gray-100 rounded-xl border border-gray-200 text-xs text-gray-500 leading-relaxed">
              <h5 className="font-bold text-gray-700 mb-2 uppercase tracking-wide">Disclaimer</h5>
              <p>
                Investment in securities market are subject to market risks. Read all the related documents carefully before investing. 
                The content provided on this blog is for educational and informational purposes only and should not be construed as investment advice. 
                Monexaa Research does not guarantee the accuracy or completeness of the information provided. 
                Past performance is not indicative of future returns. Please consult your financial advisor before making any investment decisions.
                Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
              </p>
            </div>
          </div>

          {/* ==========================================
              SIDEBAR COLUMN
             ========================================== */}
          <div className="lg:col-span-1 space-y-6 lg:space-y-8">
            
            {/* Search Widget (Desktop) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hidden lg:block sticky top-4 z-30">
              <h4 className="text-lg font-bold text-[#003E29] mb-4 flex items-center gap-2">
                <FaSearch className="text-[#0F8B6E] text-sm" /> Search
              </h4>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#0F8B6E] focus:ring-2 focus:ring-[#0F8B6E]/20 outline-none transition-all group-hover:border-gray-400"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#0F8B6E] transition-colors" />
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-lg font-bold text-[#003E29] mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                <FaChartLine className="text-[#0F8B6E]" /> Categories
              </h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {setActiveCategory('all'); setCurrentPage(1);}}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${activeCategory === 'all' ? 'bg-green-50 text-[#0F8B6E] font-bold shadow-sm translate-x-1' : 'text-gray-600 hover:bg-gray-50 hover:translate-x-1'}`}
                  >
                    <span className="flex items-center gap-2"><span className={`w-1.5 h-1.5 rounded-full ${activeCategory === 'all' ? 'bg-[#0F8B6E]' : 'bg-gray-300'}`}></span> All Articles</span>
                  </button>
                </li>
                {CATEGORIES.map((cat) => (
                  <li key={cat.name}>
                    <button 
                      onClick={() => {setActiveCategory(cat.name); setCurrentPage(1);}}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${activeCategory === cat.name ? 'bg-green-50 text-[#0F8B6E] font-bold shadow-sm translate-x-1' : 'text-gray-600 hover:bg-gray-50 hover:translate-x-1'}`}
                    >
                      <span className="flex items-center gap-2"><span className={`w-1.5 h-1.5 rounded-full ${activeCategory === cat.name ? 'bg-[#0F8B6E]' : 'bg-gray-300'}`}></span> {cat.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Newsletter Widget */}
            <div className="bg-[#003E29] p-6 rounded-xl shadow-lg text-white relative overflow-hidden group">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-[#0F8B6E] rounded-full opacity-20 blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-[#0F8B6E] rounded-full opacity-20 blur-xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              
              <h4 className="text-xl font-bold mb-2 relative z-10 flex items-center gap-2">
                <FaEnvelope className="text-[#0F8B6E]" /> Subscribe
              </h4>
              <p className="text-green-100 text-sm mb-4 relative z-10 leading-relaxed">
                Get the latest market insights, trading tips, and exclusive reports delivered directly to your inbox.
              </p>
              
              <form className="space-y-3 relative z-10" onSubmit={(e) => { e.preventDefault(); navigate('/contact-us'); }}>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-200/70 focus:bg-white/20 focus:border-white/40 outline-none transition-all"
                  />
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-200/70" />
                </div>
                <button className="w-full bg-[#0F8B6E] hover:bg-[#0b6b54] text-white font-bold py-2.5 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                  Subscribe Now
                </button>
              </form>
              <p className="text-[10px] text-green-200/60 mt-3 text-center flex items-center justify-center gap-1">
                <FaLock className="text-[8px]" /> No spam, unsubscribe anytime.
              </p>
            </div>

            {/* Popular Tags Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-lg font-bold text-[#003E29] mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                <FaTag className="text-[#0F8B6E]" /> Popular Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map(tag => (
                  <button 
                    key={tag}
                    className="px-3 py-1.5 bg-gray-50 hover:bg-[#0F8B6E] hover:text-white text-gray-600 text-xs font-medium rounded-full transition-all duration-300 flex items-center gap-1 border border-gray-100 hover:border-[#0F8B6E]"
                  >
                    # {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Share Widget */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
              <h4 className="text-lg font-bold text-[#003E29] mb-4 flex items-center justify-center gap-2">
                <FaShareAlt className="text-[#0F8B6E]" /> Follow Us
              </h4>
              <p className="text-xs text-gray-500 mb-4">Join our community of 50k+ traders</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300">
                  <FaFacebookF />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300">
                  <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300">
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Advertisement / Promo Banner (Mock) */}
            <div className="rounded-xl overflow-hidden shadow-md relative group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=600&q=80" 
                alt="Promo" 
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003E29] to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="bg-[#0F8B6E] text-xs font-bold px-2 py-1 rounded mb-2 inline-block">Premium Research</span>
                <h4 className="text-xl font-bold mb-2">Join Elite Research Club</h4>
                <p className="text-sm text-green-100 mb-3">Get exclusive research reports and market insights.</p>
                <button className="text-sm font-bold underline hover:text-[#0F8B6E] transition-colors">Learn More</button>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Blogs;
