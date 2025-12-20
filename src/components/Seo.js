import React from 'react';
import { Helmet } from 'react-helmet-async';

const site = {
  name: 'Monexaa Research',
  url: 'https://www.monexaa.com',
  logo: 'https://www.monexaa.com/assest/logo/logo2.png',
  twitter: '@monexaa',
};

export default function Seo({ title, description, pathname = '/', image, keywords }) {
  const url = `${site.url.replace(/\/$/, '')}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  const metaImage = image || site.logo;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': title || site.name,
    'description': description,
    'url': url,
    'publisher': {
      '@type': 'Organization',
      'name': site.name,
      'logo': { '@type': 'ImageObject', 'url': site.logo }
    }
  };

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title || site.name} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site.twitter} />
      <meta name="twitter:title" content={title || site.name} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
