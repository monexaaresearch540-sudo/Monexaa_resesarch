import React from 'react';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import MarketInsights from '../components/MarketInsights';
import LiveMarketDemo from '../components/livemarketdata';
import OurServices from '../components/OurServices';
import EconomicCalendar from '../components/EconomicCalendar';
import FAQ from '../components/FAQ';
import ComplaintData from '../components/ComplaintData';
import ContactForm from '../components/ContactForm';
import CertificationsSection from '../components/CertificationsSection';

// Home renders componentized Hero, LiveMarketDemo and MarketInsights components.
export default function Home() {
	return (
		<>
			<Seo
				title="Monexaa Research | SEBI Registered Research Analyst — Nifty, Bank Nifty, Options & Intraday Tips"
				description="Monexaa Research offers SEBI-registered research, high-accuracy trading signals, Nifty & Bank Nifty strategies, options tips, intraday and positional stock recommendations backed by technical and fundamental analysis."
				keywords="trading signals, SEBI research analyst, Nifty tips, Bank Nifty tips, intraday trading, positional trading, options tips, stock recommendations, technical analysis, market research, trading strategies"
				pathname="/"
			/>
			<Hero />

			<section className="max-w-4xl mx-auto my-6 text-gray-700 px-4">
				<p>
					Monexaa Research delivers actionable trading signals and stock market research for traders and investors. Our SEBI-registered analysts provide Nifty, Bank Nifty and options strategies, intraday calls, positional recommendations, and risk-managed trading plans using technical analysis, option Greeks, and fundamental screening.
				</p>
			</section>
			<LiveMarketDemo />
			{/* Services section moved slightly lower than the live market demo */}
			<OurServices />
			<MarketInsights />
			<EconomicCalendar />
			<FAQ />
			<ComplaintData />
			<ContactForm />
			<CertificationsSection />
		</>
	);
}
