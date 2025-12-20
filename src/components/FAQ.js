import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const items = [
    {
      q: 'What services does Monexaa Research provide?',
      a: 'Monexaa Research provides expert stock market advisory services including Stock Options, Rapid Index, Stock Futures, Option BTST, Cash Positional, and various combo packages for equity and derivatives trading. Visit our services pages to learn more about each offering and choose the plan that suits your trading style.'
    },
    {
      q: 'How accurate are Monexaa Research stock tips?',
      a: 'Monexaa Research provides data-driven stock market tips backed by technical and fundamental analysis. Our experienced research team aims for high accuracy, though market investments always carry inherent risks. Past performance does not guarantee future results. We recommend proper risk management and position sizing.'
    },
    {
      q: 'How do I subscribe to Monexaa Research services?',
      a: 'You can subscribe by visiting our services pages, selecting your preferred plan, and contacting us via phone at +91 62326 78136, WhatsApp, or email at support@monexaaresearch.com. Our team will guide you through the subscription process and help you get started with our advisory services.'
    },
    {
      q: 'What is the duration of subscription plans?',
      a: 'Monexaa Research offers flexible subscription plans including monthly, quarterly, half-yearly, and annual packages to suit different trading needs and budgets. Longer duration plans often come with better value. Contact our support team to discuss the best option for your requirements.'
    },
    {
      q: 'Do you provide free trial for your services?',
      a: 'Please contact our support team at +91 62326 78136 or support@monexaaresearch.com to inquire about current trial offers and promotional packages. We periodically offer trials to help new clients experience our service quality before committing to a subscription.'
    },
    {
      q: 'Is the information on this site investment advice?',
      a: 'No. The information provided is for educational and informational purposes only and does not constitute investment advice, recommendation, or an offer to buy or sell any financial instruments. Always consult a licensed financial advisor before making investment decisions.'
    },
    {
      q: 'How do you handle client complaints and grievance redressal?',
      a: 'We follow SEBI guidelines for grievance redressal. Clients can raise complaints via our grievance redressal page or contact us directly. We maintain a documented process to track, escalate and resolve complaints within prescribed timelines as per regulatory requirements.'
    },
    {
      q: 'What are the risks of trading?',
      a: 'Trading in equities, derivatives, commodities or currencies involves the risk of loss. Past performance is not indicative of future results. You may lose part or all of your capital. Make sure you understand the risks and trade only with capital you can afford to lose. Read our risk disclosure and investor handbook for detailed information.'
    },
    {
      q: 'Do you perform KYC and AML checks?',
      a: 'Yes. We comply with KYC (Know Your Customer) and AML (Anti Money Laundering) regulations as mandated by SEBI and other authorities. Clients must provide valid identity and address proof before account activation. Visit our KYC documents page for more information.'
    },
    {
      q: 'Where can I find SEBI resources and investor protections?',
      a: 'For official information, investor education materials and complaint procedures, visit the SEBI website: https://www.sebi.gov.in. You may also refer to the SCORES portal for filing grievances. Check our investor handbook and investor charter pages for additional resources.'
    }
  ];

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section style={styles.container} aria-labelledby="faq-heading">
      <dl style={styles.list}>
        {items.map((it, i) => (
          <div key={i} style={styles.item}>
            <dt>
              <button
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
                onClick={() => toggle(i)}
                style={styles.q}
              >
                <span>{it.q}</span>
                <span style={styles.caret}>{openIndex === i ? '−' : '+'}</span>
              </button>
            </dt>

            <dd
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-heading`}
              style={{ ...styles.a, display: openIndex === i ? 'block' : 'none', margin: 0 }}
            >
              {it.a}
            </dd>
          </div>
        ))}
      </dl>

      <div style={styles.footer}>
        <strong>Risk Disclosure:</strong> Trading and investments involve risk. Read all product documents and disclosures carefully before investing. Visit our <a href="/disclaimer" style={styles.link}>Disclaimer</a> and <a href="/disclosure" style={styles.link}>Disclosure</a> pages for detailed information.
        <div style={{ marginTop: 8 }}>
          <strong>Grievance / Support:</strong> For complaints, visit our <a href="/grievance-redressal" style={styles.link}>Grievance Redressal</a> page or contact us at <a href="mailto:support@monexaaresearch.com" style={styles.link}>support@monexaaresearch.com</a> or call our helpline at <a href="tel:+916232678136" style={styles.phone}>+91 6232678136</a>.
        </div>

        <div style={{ marginTop: 12, background: 'transparent', color: '#334455' }}>
          <strong>Compliance:</strong>
          <div style={{ marginTop: 6 }}>
            This website is for informational purposes only and does not allege that any person or entity is violating SEBI rules. Monexaa Research complies with all applicable laws and regulations, including SEBI guidelines. Learn more about our <a href="/anti-money-laundering" style={styles.link}>Anti-Money Laundering</a> policies and <a href="/kyc-document" style={styles.link}>KYC requirements</a>.
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  container: {
    padding: 'clamp(16px, 5vw, 24px)',
    maxWidth: 1100,
    margin: '18px auto',
    background: 'transparent'
  },
  list: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  item: {
    borderRadius: 10,
    border: '1px solid #e6eef0',
    overflow: 'hidden',
    background: '#FFFFFF'
  },
  q: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 15,
    color: '#223344'
  },
  caret: {
    marginLeft: 12,
    fontSize: 20
  },
  a: {
    padding: '12px 16px',
    color: '#334455',
    lineHeight: 1.5,
    background: '#fff'
  },
  footer: {
    marginTop: 12,
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid #e6eef0',
    background: '#fff',
    color: '#334455'
  },
  link: { color: '#0F8B6E', textDecoration: 'none', fontWeight: 700 },
  phone: { fontWeight: 800 }
};
