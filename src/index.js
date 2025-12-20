import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
// Use project logo as favicon (imported so bundler provides a URL)
import logoFavicon from './assest/logo/logo2-removebg-preview.png';

// Generate an SVG data-URI that draws a circular background and overlays the provided logo image URL
function makeSvgDataUri(embeddedImageDataUrl, size = 512, bg1 = '#ffffff', bg2 = '#ffffff') {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>
    <defs>
      <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
        <stop offset='0%' stop-color='${bg1}'/>
        <stop offset='100%' stop-color='${bg2}'/>
      </linearGradient>
    </defs>
    <rect width='100%' height='100%' fill='transparent'/>
    <circle cx='${size/2}' cy='${size/2}' r='${Math.floor(size/2 - size*0.03)}' fill='url(#g)' />
    <!-- Larger centered logo: 80% of the circle with 10% margin -->
    <image href='${embeddedImageDataUrl}' x='${Math.floor(size*0.10)}' y='${Math.floor(size*0.10)}' width='${Math.floor(size*0.80)}' height='${Math.floor(size*0.80)}' preserveAspectRatio='xMidYMid meet' />
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Insert multiple favicon links using SVG data URIs so browsers show a circular background behind the logo
async function setFaviconsWithCircle(logoUrl) {
  try {
    // fetch the PNG and convert to base64 so we can embed it in the SVG (avoids external references/CORS issues)
    const res = await fetch(logoUrl);
    const blob = await res.blob();
    const reader = new FileReader();
    const base64 = await new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    const embeddedImageDataUrl = base64; // data:image/png;base64,...

    document.querySelectorAll("link[rel*='icon'], link[rel='shortcut icon']").forEach(n => n.remove());
    const sizes = [16, 32, 192, 512];
    sizes.forEach(sz => {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      link.sizes = `${sz}x${sz}`;
      link.href = makeSvgDataUri(embeddedImageDataUrl, sz);
      document.getElementsByTagName('head')[0].appendChild(link);
    });
    const shortcut = document.createElement('link');
    shortcut.rel = 'shortcut icon';
    shortcut.href = makeSvgDataUri(embeddedImageDataUrl, 64);
    document.getElementsByTagName('head')[0].appendChild(shortcut);
  } catch (e) {
    // fallback: set simple link to the png
    try {
      document.querySelectorAll("link[rel*='icon'], link[rel='shortcut icon']").forEach(n => n.remove());
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = logoUrl;
      document.getElementsByTagName('head')[0].appendChild(link);
    } catch (err) {
      // silent
    }
  }
}

setFaviconsWithCircle(logoFavicon);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
