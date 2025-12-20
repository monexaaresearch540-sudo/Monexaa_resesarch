import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaSpinner,
  FaList,
  FaThLarge,
  FaBolt,
  FaChartBar,
  FaEye,
  FaRedoAlt,
  FaTimes
} from 'react-icons/fa';

// ==========================================
// CONFIGURATION & CONSTANTS
// ==========================================

const API_KEY = "a75cd5c17277b76a94b3a426f7966eaf";
const BASE_URL = "https://api.mediastack.com/v1/news";

const CATEGORIES = [
  { name: "business", label: "Business" },
  { name: "technology", label: "Tech" },
  { name: "general", label: "General" },
  { name: "science", label: "Science" },
  { name: "health", label: "Health" },
  { name: "sports", label: "Sports" },
  { name: "entertainment", label: "Entertainment" }
];

const POPULAR_TAGS = [
  "StockMarket", "Nifty50", "Sensex", "BankNifty", "IPO", "Crypto", "Economy", "Forex", "Gold", "Oil", "Results", "RBI"
];

const MOCK_MARKET_INDICES = [
  { name: "NIFTY 50", value: "24,852.15", change: "+125.30", percent: "+0.51%", isUp: true },
  { name: "SENSEX", value: "81,345.60", change: "+350.25", percent: "+0.43%", isUp: true },
  { name: "BANK NIFTY", value: "52,100.40", change: "-85.10", percent: "-0.16%", isUp: false },
  { name: "USD/INR", value: "83.45", change: "+0.05", percent: "+0.06%", isUp: true },
];

const MOCK_NEWS = [
  {
    title: "Sensex, Nifty hit fresh record highs on global cues",
    description: "Indian equity benchmarks Sensex and Nifty 50 settled at fresh record closing highs on Friday, tracking gains in global peers.",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Monexaa Bureau",
    category: "business",
    url: "#"
  },
  {
    title: "RBI keeps repo rate unchanged at 6.5% for eighth consecutive time",
    description: "The Reserve Bank of India's Monetary Policy Committee (MPC) decided to keep the policy repo rate unchanged at 6.5 per cent.",
    image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Monexaa Bureau",
    category: "economy",
    url: "#"
  },
  {
    title: "Tech giants rally as AI adoption accelerates across industries",
    description: "Major technology stocks saw significant gains today as new reports indicate faster-than-expected adoption of artificial intelligence solutions.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Tech Daily",
    category: "technology",
    url: "#"
  },
  {
    title: "Gold prices surge amidst geopolitical tensions",
    description: "Safe-haven demand has pushed gold prices to a near-term high as investors react to ongoing geopolitical uncertainties.",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Commodity Watch",
    category: "business",
    url: "#"
  },
  {
    title: "Green energy sector sees record investment in Q3",
    description: "Renewable energy companies are reporting record inflows of capital as governments worldwide push for faster decarbonization.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Green Future",
    category: "business",
    url: "#"
  }
];

// ==========================================
// HELPER COMPONENTS
// ==========================================

const NewsTicker = ({ posts }) => {
  return (
    <div className="bg-[#003E29] text-white py-2 overflow-hidden relative flex items-center border-b border-[#0F8B6E]/30">
      <div className="bg-[#0F8B6E] px-3 py-1 text-[10px] font-bold uppercase tracking-wider ml-2 rounded-sm z-10 shadow-lg flex items-center gap-1">
        <FaBolt className="text-yellow-300" /> Breaking
      </div>
      <div className="whitespace-nowrap animate-marquee flex items-center gap-8 px-4">
        {posts.slice(0, 10).map((post, idx) => (
          <span key={idx} className="text-xs font-medium flex items-center gap-2 text-green-50/90 hover:text-white cursor-pointer transition-colors">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
            {post.title}
          </span>
        ))}
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

const SkeletonCard = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm flex gap-4 animate-pulse">
        <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm animate-pulse">
      <div className="h-40 bg-gray-200 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded w-full mt-2"></div>
      </div>
    </div>
  );
};

const MarketSentimentWidget = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
      <h4 className="text-sm font-bold text-[#003E29] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
        <FaChartBar className="text-[#0F8B6E]" /> Market Sentiment
      </h4>
      <div className="relative pt-4 pb-2">
        <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full w-full"></div>
        <div className="absolute top-2 left-[65%] transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#003E29]"></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-wide">
          <span>Bearish</span>
          <span>Neutral</span>
          <span className="text-[#0F8B6E]">Bullish</span>
        </div>
      </div>
      <p className="text-xs text-center text-gray-600 mt-2 font-medium">
        Market sentiment is currently <span className="text-[#0F8B6E] font-bold">Bullish</span> driven by positive global cues.
      </p>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const MarketNews = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Refs for scrolling
  const topRef = useRef(null);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Fetch News Function
  const fetchNews = async (isBackgroundRefresh = false) => {
    if (!isBackgroundRefresh) setLoading(true);
    setError(null);
    
    try {
      let url = `${BASE_URL}?access_key=${API_KEY}&languages=en&limit=${activeCategory === 'all' ? 100 : 20}`;
      
      if (activeCategory !== 'all') {
        url += `&categories=${activeCategory}`;
      }

      const response = await fetch(url);
      
      // Handle Rate Limiting (429) or other server errors
      if (response.status === 429 || !response.ok) {
        console.warn(`API Error ${response.status}: Switching to mock data.`);
        setPosts(MOCK_NEWS);
        setError("Live updates unavailable (High Traffic). Showing latest highlights.");
        setLastUpdated(new Date());
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.data) {
        // Filter out posts without images or titles to improve UI quality
        const validPosts = data.data.filter(post => post.title && post.description);
        setPosts(validPosts.length > 0 ? validPosts : MOCK_NEWS);
        setLastUpdated(new Date());
      } else {
         if (data.error) {
           console.error("API Error:", data.error);
           // Fallback to mock data on API error
           setPosts(MOCK_NEWS);
           if (data.error.code === 'usage_limit_reached') {
             setError("Daily news limit reached. Showing highlights.");
           } else {
             setError("Unable to fetch live news. Showing highlights.");
           }
         } else {
           setPosts(MOCK_NEWS);
         }
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
      // Fallback to mock data on network error
      setPosts(MOCK_NEWS);
      if (!isBackgroundRefresh) setError("Network issue. Showing offline news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // Auto-refresh every hour
    const intervalId = setInterval(() => fetchNews(true), 3600000);
    return () => clearInterval(intervalId);
  }, [activeCategory]);

  // Filter Logic
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Pagination Logic
  const postsPerPage = viewMode === 'list' ? 10 : 9;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper: Format Date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Helper: Estimate Reading Time
  const getReadingTime = (text) => {
    if (!text) return '1 min read';
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return `${time} min read`;
  };

  return (
    <div className="w-full bg-transparent min-h-screen font-sans text-gray-800">
      <Helmet>
        <title>Live Market News | Monexaa Research - Real-Time Stock Market Updates</title>
        <meta name="description" content="Stay updated with live stock market news, Nifty & Bank Nifty analysis, Sensex trends, and global market updates. Get real-time financial insights from Monexaa Research." />
        <meta name="keywords" content="Live Stock Market News, Nifty News, Bank Nifty Updates, Sensex Today, Share Market Live, Indian Stock Market News, Financial News India, IPO News, Stock Market Trends, Monexaa Research News" />
        <link rel="canonical" href="https://monexaaresearch.com/market-news" />
      </Helmet>

      {/* News Ticker */}
      {!loading && posts.length > 0 && <NewsTicker posts={posts} />}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6" ref={topRef}>
        
        {/* Header Section - Compact */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#003E29] tracking-tight flex items-center gap-2">
              Market<span className="text-[#0F8B6E]">News</span>
              <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold animate-pulse">Live</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
              Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 group">
              <input 
                type="text" 
                placeholder="Search headlines..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-[#0F8B6E] focus:ring-1 focus:ring-[#0F8B6E] outline-none transition-all bg-white/80 backdrop-blur-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#0F8B6E] transition-colors text-xs" />
            </div>
            
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-[#0F8B6E] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                title="Grid View"
              >
                <FaThLarge className="text-sm" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-[#0F8B6E] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                title="List View"
              >
                <FaList className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Market Indices Strip (Mock) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {MOCK_MARKET_INDICES.map((index, idx) => (
            <div key={idx} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex flex-col">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{index.name}</span>
              <div className="flex items-end justify-between mt-1">
                <span className="text-sm font-bold text-gray-800">{index.value}</span>
                <span className={`text-xs font-bold ${index.isUp ? 'text-green-600' : 'text-red-600'}`}>
                  {index.change} ({index.percent})
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar - Categories & Filters */}
          <div className="lg:col-span-2 space-y-6 hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4">
              <div className="p-3 bg-gray-50 border-b border-gray-100 font-bold text-xs text-gray-500 uppercase tracking-wider">
                Categories
              </div>
              <div className="p-2">
                <button 
                  onClick={() => {setActiveCategory('all'); setCurrentPage(1);}}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors mb-1 flex items-center justify-between ${activeCategory === 'all' ? 'bg-[#0F8B6E]/10 text-[#0F8B6E]' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  All News <span className="bg-white px-1.5 py-0.5 rounded text-[10px] shadow-sm border border-gray-100">All</span>
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.name}
                    onClick={() => {setActiveCategory(cat.name); setCurrentPage(1);}}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors mb-1 flex items-center justify-between ${activeCategory === cat.name ? 'bg-[#0F8B6E]/10 text-[#0F8B6E] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-3 bg-gray-50 border-b border-gray-100 font-bold text-xs text-gray-500 uppercase tracking-wider">
                Trending Tags
              </div>
              <div className="p-3 flex flex-wrap gap-1.5">
                {POPULAR_TAGS.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-medium rounded border border-gray-100 hover:border-[#0F8B6E] hover:text-[#0F8B6E] cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-7">
            
            {/* Featured Post (Compact) */}
            {activeCategory === 'all' && !searchTerm && currentPage === 1 && posts.length > 0 && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group relative"
              >
                <div className="flex flex-col sm:flex-row h-auto sm:h-64">
                  <div className="sm:w-5/12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 sm:hidden"></div>
                    <img 
                      src={posts[0].image || "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=800&q=80"} 
                      alt={posts[0].title}
                      className="w-full h-48 sm:h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=800&q=80"}}
                    />
                    <span className="absolute top-3 left-3 bg-[#0F8B6E] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg z-20">
                      TOP STORY
                    </span>
                  </div>
                  <div className="sm:w-7/12 p-5 flex flex-col justify-center relative">
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wide mb-2">
                      <span className="text-[#0F8B6E]">{posts[0].category}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{formatDate(posts[0].published_at)}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-[#003E29] mb-2 leading-tight group-hover:text-[#0F8B6E] transition-colors line-clamp-2">
                      {posts[0].title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {posts[0].description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                        <FaUser className="text-gray-300" /> {posts[0].author || "Monexaa Desk"}
                      </span>
                      <a 
                        href={posts[0].url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold bg-green-50 text-[#0F8B6E] px-3 py-1.5 rounded hover:bg-[#0F8B6E] hover:text-white transition-colors flex items-center gap-1"
                      >
                        Read <FaArrowRight className="text-[8px]" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* News Grid/List */}
            {loading ? (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} viewMode={viewMode} />)}
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white rounded-xl border border-red-100">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3 text-red-400">
                  <FaBolt className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">Oops! Something went wrong</h3>
                <p className="text-sm text-gray-500 mb-4">{error}</p>
                <button 
                  onClick={() => fetchNews()}
                  className="px-4 py-2 bg-[#0F8B6E] text-white text-sm font-bold rounded-lg hover:bg-[#0b6b54] transition-colors flex items-center gap-2 mx-auto"
                >
                  <FaRedoAlt /> Try Again
                </button>
              </div>
            ) : currentPosts.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
              >
                <AnimatePresence mode='wait'>
                  {currentPosts.map((post, index) => (
                    <motion.div 
                      key={`${post.title}-${index}`}
                      variants={itemVariants}
                      layout
                      className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group ${viewMode === 'list' ? 'flex flex-row h-32' : 'flex flex-col h-full'}`}
                    >
                      {/* Image Section */}
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-32 sm:w-48 h-full flex-shrink-0' : 'h-40 w-full'}`}>
                        <img 
                          src={post.image || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"} 
                          alt={post.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"}}
                        />
                        {viewMode === 'grid' && (
                          <div className="absolute top-2 left-2">
                            <span className="bg-white/90 backdrop-blur-sm text-[#003E29] text-[9px] font-bold px-1.5 py-0.5 rounded border border-gray-100 shadow-sm">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className={`flex flex-col justify-between ${viewMode === 'list' ? 'p-3 w-full' : 'p-4 flex-1'}`}>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                              <FaRegClock className="text-[#0F8B6E]" /> {formatDate(post.published_at)}
                            </span>
                            {viewMode === 'list' && (
                              <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase font-bold">
                                {post.category}
                              </span>
                            )}
                          </div>
                          
                          <h3 className={`font-bold text-[#003E29] leading-tight group-hover:text-[#0F8B6E] transition-colors line-clamp-2 ${viewMode === 'list' ? 'text-sm mb-1' : 'text-sm mb-2'}`}>
                            <a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
                          </h3>
                          
                          {viewMode === 'grid' && (
                            <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                              {post.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                          <span className="text-[10px] text-gray-400 font-medium truncate max-w-[100px]">
                            {post.source}
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="text-gray-400 hover:text-[#0F8B6E] transition-colors" title="Share">
                              <FaShareAlt className="text-xs" />
                            </button>
                            <a 
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] font-bold text-[#0F8B6E] hover:underline"
                            >
                              Read
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-gray-200 border-dashed">
                <FaSearch className="text-3xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-600">No news found</h3>
                <p className="text-xs text-gray-400 mb-4">Try adjusting your search or filters</p>
                <button 
                  onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
                  className="text-xs font-bold text-[#0F8B6E] hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredPosts.length > postsPerPage && (
              <div className="flex justify-center mt-8 gap-1.5">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0F8B6E] hover:text-white hover:border-[#0F8B6E] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                >
                  &lt;
                </button>
                
                {/* Simplified Pagination for Mobile */}
                <span className="flex items-center px-3 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded">
                  Page {currentPage} of {totalPages}
                </span>

                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 rounded border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#0F8B6E] hover:text-white hover:border-[#0F8B6E] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Market Sentiment */}
            <MarketSentimentWidget />

            {/* Newsletter (Compact) */}
            <div className="bg-[#003E29] p-5 rounded-xl shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#0F8B6E] rounded-full opacity-20 blur-xl"></div>
              <h4 className="text-sm font-bold mb-2 flex items-center gap-2 relative z-10">
                <FaEnvelope className="text-[#0F8B6E]" /> Market Insights
              </h4>
              <p className="text-xs text-green-100 mb-3 relative z-10 leading-relaxed opacity-80">
                Daily briefing on Nifty, Bank Nifty & Stocks.
              </p>
              <form className="space-y-2 relative z-10" onSubmit={(e) => { e.preventDefault(); navigate('/contact-us'); }}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 text-white text-xs placeholder-green-200/50 focus:bg-white/20 outline-none"
                />
                <button className="w-full bg-[#0F8B6E] hover:bg-[#0b6b54] text-white text-xs font-bold py-2 rounded shadow-md transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Most Read (Mock) */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-sm font-bold text-[#003E29] mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
                <FaFire className="text-orange-500" /> Most Read
              </h4>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 group cursor-pointer">
                    <span className="text-2xl font-bold text-gray-200 group-hover:text-[#0F8B6E] transition-colors">0{i}</span>
                    <div>
                      <h5 className="text-xs font-bold text-gray-700 group-hover:text-[#0F8B6E] transition-colors line-clamp-2 mb-1">
                        Sensex crosses 80,000 mark for the first time in history
                      </h5>
                      <span className="text-[10px] text-gray-400">2 hours ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-sm font-bold text-[#003E29] mb-3">Follow Us</h4>
              <div className="flex justify-between">
                <a href="#" className="w-8 h-8 rounded bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all"><FaFacebookF className="text-xs" /></a>
                <a href="#" className="w-8 h-8 rounded bg-[#1DA1F2]/10 text-[#1DA1F2] flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-all"><FaTwitter className="text-xs" /></a>
                <a href="#" className="w-8 h-8 rounded bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all"><FaLinkedinIn className="text-xs" /></a>
                <a href="#" className="w-8 h-8 rounded bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all"><FaWhatsapp className="text-xs" /></a>
              </div>
            </div>

          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-[10px] text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Disclaimer: Monexaa Research is a SEBI Registered Research Analyst. The news and information provided here is for educational purposes only. 
            Market data is delayed by at least 15 minutes. Please consult your financial advisor before investing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarketNews;
