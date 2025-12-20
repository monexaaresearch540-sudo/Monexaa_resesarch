import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaFont, FaTextHeight, FaBold, FaAdjust, FaPalette, 
  FaMousePointer, FaLink, FaVolumeUp, FaRedo, FaCheck, 
  FaAlignLeft, FaAlignRight, FaEye, FaWalking, FaUniversalAccess
} from 'react-icons/fa';
import { MdSpaceBar, MdFormatLineSpacing } from 'react-icons/md';

const AccessibilityMenu = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : {
      textSize: 100,
      letterSpacing: 0,
      lineHeight: 1.5,
      fontWeight: 400,
      contrast: 'default', // default, dark, light
      saturation: 'normal', // normal, high, low
      display: 'default', // default, monochrome
      textAlign: 'default', // default, left, right
      dyslexicFont: false,
      stopAnimations: false,

      bigCursor: false,
      highlightLinks: false,
      textToSpeech: false,
      readingGuide: false
    };
  });

  // Apply settings to document
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));

    const root = document.documentElement;
    const body = document.body;

    // Text Size
    root.style.fontSize = `${settings.textSize}%`;

    // Letter Spacing
    body.style.letterSpacing = `${settings.letterSpacing}px`;

    // Line Height
    body.style.lineHeight = settings.lineHeight;

    // Font Weight
    // This is tricky as it depends on available fonts, but we can try setting a style
    const styleId = 'accessibility-style';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    let css = `
      body * {
        font-weight: ${settings.fontWeight} !important;
        ${settings.textAlign !== 'left' ? `text-align: ${settings.textAlign} !important;` : ''}
      }
      ${settings.dyslexicFont ? `
        body, body * {
          font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif !important;
        }
      ` : ''}
      ${settings.highlightLinks ? `
        a {
          text-decoration: underline !important;
          background-color: yellow !important;
          color: black !important;
        }
      ` : ''}
      ${settings.stopAnimations ? `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      ` : ''}
      ${settings.bigCursor ? `
        body, a, button, input, select, textarea {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewport="0 0 48 48" style="fill:black;stroke:white;stroke-width:2px;"><path d="M10 10 L30 30 L20 30 L25 40 L20 42 L15 32 L10 36 Z" /></svg>'), auto !important;
        }
      ` : ''}
      ${settings.readingGuide ? `
        body::after {
          content: '';
          position: fixed;
          top: 50%;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: red;
          z-index: 99999;
          pointer-events: none;
          transform: translateY(-50%);
        }
      ` : ''}
    `;
    
    styleTag.innerHTML = css;

    // Filters (Contrast, Saturation, Monochrome)
    let filterString = '';
    
    if (settings.contrast === 'dark') {
      root.style.filter = 'invert(1) hue-rotate(180deg)';
      // Note: This is a simple dark mode hack.
    } else if (settings.contrast === 'light') {
      root.style.filter = 'brightness(1.2)';
    } else {
      root.style.filter = 'none';
    }

    // Saturation
    if (settings.saturation === 'high') {
      filterString += ' saturate(200%)';
    } else if (settings.saturation === 'low') {
      filterString += ' saturate(50%)';
    }

    // Monochrome
    if (settings.display === 'monochrome') {
      filterString += ' grayscale(100%)';
    }

    // Apply filters to body to avoid double application if root has filters
    // But root filter for dark mode affects everything. 
    // Let's combine them on root if possible, or body.
    // If we used invert on root, other filters should probably be there too.
    
    if (settings.contrast !== 'dark' && settings.contrast !== 'light') {
        root.style.filter = filterString;
    } else {
        // If we already have a filter from contrast, append others?
        // Invert is tricky with other filters.
        // For simplicity, let's keep contrast separate or handle carefully.
        // If dark mode is active (invert), grayscale works on the inverted colors.
        if (settings.contrast === 'dark') {
             root.style.filter = `invert(1) hue-rotate(180deg) ${filterString}`;
        } else if (settings.contrast === 'light') {
             root.style.filter = `brightness(1.2) ${filterString}`;
        } else {
             root.style.filter = filterString;
        }
    }

  }, [settings]);

  // Text to Speech Effect
  useEffect(() => {
    if (!settings.textToSpeech) {
      window.speechSynthesis.cancel();
      return;
    }

    const handleMouseOver = (e) => {
      const target = e.target;
      // Get text content, ignoring children's text if possible to avoid duplication?
      // Actually, `innerText` usually works well.
      const text = target.innerText || target.textContent;
      
      if (text && text.trim().length > 0) {
        // Simple debounce or just cancel previous
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text.trim());
        
        // Language detection
        const hasHindi = /[\u0900-\u097F]/.test(text);
        utterance.lang = hasHindi ? 'hi-IN' : 'en-US';
        
        window.speechSynthesis.speak(utterance);
        
        // Optional: Visual feedback
        target.classList.add('tts-highlight');
      }
    };

    const handleMouseOut = (e) => {
       e.target.classList.remove('tts-highlight');
       window.speechSynthesis.cancel();
    };

    document.body.addEventListener('mouseover', handleMouseOver);
    document.body.addEventListener('mouseout', handleMouseOut);

    // Add style for highlight
    const styleId = 'tts-style';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      styleTag.innerHTML = `
        .tts-highlight {
          outline: 2px solid #2563eb !important;
          background-color: rgba(37, 99, 235, 0.1) !important;
        }
      `;
      document.head.appendChild(styleTag);
    }

    return () => {
      document.body.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseout', handleMouseOut);
      window.speechSynthesis.cancel();
      const tag = document.getElementById(styleId);
      if(tag) tag.remove();
    };
  }, [settings.textToSpeech]);

  const resetSettings = () => {
    setSettings({
      textSize: 100,
      letterSpacing: 0,
      lineHeight: 1.5,
      fontWeight: 400,
      contrast: 'default',
      saturation: 'normal',
      display: 'default',
      textAlign: 'left',
      dyslexicFont: false,
      stopAnimations: false,
      bigCursor: false,
      highlightLinks: false,
      textToSpeech: false,
      readingGuide: false
    });
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
        {/* Backdrop */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[9999] backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-[85vw] sm:w-[400px] bg-white shadow-2xl z-[10000] overflow-y-auto text-gray-800 rounded-l-2xl"
        >
          <div className="p-4 border-b flex justify-between items-center bg-gray-50 sticky top-0 z-10 shadow-sm">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
              <FaUniversalAccess className="text-blue-600" /> Accessibility
            </h2>
            <div className="flex gap-2">
                <button 
                    onClick={resetSettings}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 px-3 py-1.5 rounded-full border border-gray-300 hover:border-blue-600 transition-colors bg-white shadow-sm"
                >
                    <FaRedo size={12} /> Reset
                </button>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-red-500"
                >
                    <FaTimes size={20} />
                </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-5 sm:space-y-8 pb-24">
            
            {/* Text Size */}
            <section>
              <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-gray-700 text-sm sm:text-base"><FaFont className="text-blue-500" /> Text size</h3>
              <div className="bg-gray-100 p-2 rounded-xl flex items-center justify-between shadow-inner">
                <button 
                    onClick={() => updateSetting('textSize', Math.max(70, settings.textSize - 10))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm hover:bg-blue-50 text-base sm:text-lg font-bold text-gray-700 active:scale-95 transition-transform"
                    aria-label="Decrease text size"
                >A-</button>
                <span className="font-bold text-blue-600 text-base sm:text-lg">{settings.textSize}%</span>
                <button 
                    onClick={() => updateSetting('textSize', Math.min(200, settings.textSize + 10))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm hover:bg-blue-50 text-base sm:text-lg font-bold text-gray-700 active:scale-95 transition-transform"
                    aria-label="Increase text size"
                >A+</button>
              </div>
            </section>

            {/* Letter Spacing */}
            <section>
              <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-gray-700 text-sm sm:text-base"><MdSpaceBar className="text-blue-500" /> Letter spacing</h3>
              <div className="bg-gray-100 p-2 rounded-xl flex items-center justify-between shadow-inner">
                <button 
                    onClick={() => updateSetting('letterSpacing', Math.max(-2, settings.letterSpacing - 1))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm hover:bg-blue-50 font-bold text-gray-700 active:scale-95 transition-transform"
                    aria-label="Decrease letter spacing"
                >-</button>
                <span className="font-bold text-blue-600 text-base sm:text-lg">{settings.letterSpacing}px</span>
                <button 
                    onClick={() => updateSetting('letterSpacing', Math.min(10, settings.letterSpacing + 1))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm hover:bg-blue-50 font-bold text-gray-700 active:scale-95 transition-transform"
                    aria-label="Increase letter spacing"
                >+</button>
              </div>
            </section>

            {/* Line Height */}
            <section>
              <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-gray-700 text-sm sm:text-base"><MdFormatLineSpacing className="text-blue-500" /> Line height</h3>
              <div className="bg-gray-100 p-2 rounded-xl flex items-center justify-between shadow-inner">
                <button 
                    onClick={() => updateSetting('lineHeight', Math.max(1, settings.lineHeight - 0.1))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm hover:bg-blue-50 font-bold text-gray-700 active:scale-95 transition-transform"
                    aria-label="Decrease line height"
                >-</button>
                <span className="font-bold text-blue-600 text-base sm:text-lg">{settings.lineHeight.toFixed(1)}</span>
                <button 
                    onClick={() => updateSetting('lineHeight', Math.min(3, settings.lineHeight + 0.1))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm hover:bg-blue-50 font-bold text-gray-700 active:scale-95 transition-transform"
                    aria-label="Increase line height"
                >+</button>
              </div>
            </section>

            {/* Font Weight */}
            <section>
              <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-gray-700 text-sm sm:text-base"><FaBold className="text-blue-500" /> Font weight</h3>
              <div className="bg-gray-100 p-2 rounded-xl flex items-center justify-between shadow-inner">
                <button 
                    onClick={() => updateSetting('fontWeight', Math.max(100, settings.fontWeight - 100))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm hover:bg-blue-50 font-bold text-gray-700 active:scale-95 transition-transform"
                    aria-label="Decrease font weight"
                >-</button>
                <span className="font-bold text-blue-600 text-base sm:text-lg">{settings.fontWeight}</span>
                <button 
                    onClick={() => updateSetting('fontWeight', Math.min(900, settings.fontWeight + 100))}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg shadow-sm hover:bg-blue-50 font-bold text-gray-700 active:scale-95 transition-transform"
                    aria-label="Increase font weight"
                >+</button>
              </div>
            </section>

            {/* Contrast */}
            <section>
              <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-gray-700 text-sm sm:text-base"><FaAdjust className="text-blue-500" /> Contrast</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {['default', 'dark', 'light'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => updateSetting('contrast', mode)}
                    className={`p-2 sm:p-3 rounded-xl border-2 transition-all capitalize font-medium text-sm sm:text-base ${
                      settings.contrast === mode 
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md transform scale-105' 
                        : 'border-gray-200 hover:border-blue-300 bg-white text-gray-600'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </section>

            {/* Saturation */}
            <section>
              <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-gray-700 text-sm sm:text-base"><FaPalette className="text-blue-500" /> Saturation</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {['normal', 'high', 'low'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => updateSetting('saturation', mode)}
                    className={`p-2 sm:p-3 rounded-xl border-2 transition-all capitalize font-medium text-sm sm:text-base ${
                      settings.saturation === mode 
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md transform scale-105' 
                        : 'border-gray-200 hover:border-blue-300 bg-white text-gray-600'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </section>

            {/* Display */}
            <section>
              <h3 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-gray-700 text-sm sm:text-base"><FaEye className="text-blue-500" /> Display</h3>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                 <button
                    onClick={() => updateSetting('display', settings.display === 'monochrome' ? 'default' : 'monochrome')}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-medium text-sm sm:text-base ${
                      settings.display === 'monochrome'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300 bg-white text-gray-600'
                    }`}
                  >
                    Monochrome
                  </button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2 sm:mt-3">
                 <button
                    onClick={() => updateSetting('textAlign', 'left')}
                    className={`p-2 sm:p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-medium text-sm sm:text-base ${
                      settings.textAlign === 'left'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300 bg-white text-gray-600'
                    }`}
                  >
                    <FaAlignLeft /> Align Left
                  </button>
                  <button
                    onClick={() => updateSetting('textAlign', 'right')}
                    className={`p-2 sm:p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 font-medium text-sm sm:text-base ${
                      settings.textAlign === 'right'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
                        : 'border-gray-200 hover:border-blue-300 bg-white text-gray-600'
                    }`}
                  >
                    <FaAlignRight /> Align Right
                  </button>
              </div>
            </section>

            {/* Toggles */}
            <section className="space-y-2 sm:space-y-3">
                <h3 className="font-semibold mb-2 sm:mb-3 text-gray-700 text-sm sm:text-base">More Options</h3>
                
                {[
                    { key: 'readingGuide', label: 'Reading Guide', icon: <FaTextHeight /> },
                    { key: 'dyslexicFont', label: 'Dyslexic Font', icon: <FaFont /> },
                    { key: 'stopAnimations', label: 'Stop Animations', icon: <FaWalking /> },
                    { key: 'bigCursor', label: 'Big Cursor', icon: <FaMousePointer /> },
                    { key: 'highlightLinks', label: 'Highlight Links', icon: <FaLink /> },
                    { key: 'textToSpeech', label: 'Text to Speech', icon: <FaVolumeUp /> },
                ].map(item => (
                    <button
                        key={item.key}
                        onClick={() => updateSetting(item.key, !settings[item.key])}
                        className={`w-full p-3 sm:p-4 rounded-xl border-2 flex items-center justify-between transition-all shadow-sm ${
                            settings[item.key]
                            ? 'border-blue-600 bg-blue-50 text-blue-700 transform scale-[1.02]' 
                            : 'border-gray-200 hover:border-blue-300 bg-white text-gray-700'
                        }`}
                    >
                        <span className="flex items-center gap-3 font-medium text-base sm:text-lg">
                            <span className="text-blue-500 bg-blue-100 p-2 rounded-lg">{item.icon}</span> {item.label}
                        </span>
                        {settings[item.key] && <FaCheck className="text-blue-600 text-lg sm:text-xl" />}
                    </button>
                ))}
            </section>

            <button 
                onClick={onClose}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-colors text-lg active:scale-95 transform"
            >
                Done
            </button>

          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccessibilityMenu;
