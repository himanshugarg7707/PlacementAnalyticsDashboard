// Authentic company logo vector rendering & brand colors
const BRAND_LOGOS = {
  Google: {
    bg: '#ffffff',
    color: '#4285F4',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
    ),
  },
  Microsoft: {
    bg: '#ffffff',
    color: '#00A4EF',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24">
        <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
        <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
        <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
        <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
      </svg>
    ),
  },
  Amazon: {
    bg: '#ffffff',
    color: '#FF9900',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF9900">
        <path d="M13.9 14.1c-1.8 1.3-4.4 2-6.6 2-3.1 0-5.9-1.2-8-3.1-.2-.2-.2-.4 0-.6.4-.3.9-.6 1.4-.8.2-.1.4 0 .6.1 1.7 1.5 4 2.4 6.5 2.4 1.9 0 4.1-.6 5.7-1.7.3-.2.6 0 .7.3.2.4.1.9-.3 1.4zm2-1.7c-.2-.3-.8-.1-1.3 0-.7.2-1.4.5-2.2.8-.2.1-.3.2-.2.4.1.2.2.3.4.2.7-.3 1.4-.6 2-.8.5-.2.9-.3 1.1-.3.3 0 .4.2.3.5l-.6 2.3c-.1.3 0 .5.2.6.2.1.4 0 .5-.2l.7-2.8c.1-.4 0-.6-.2-.7z"/>
        <path d="M12.7 7.7c-.2-1.3-.9-2.3-2.1-3-1.2-.7-2.8-.9-4.3-.6-1.5.3-2.8 1.1-3.6 2.2-.2.3-.2.6 0 .8.3.4.7.7 1.1 1 .2.2.5.1.7-.1.6-.8 1.5-1.4 2.5-1.6 1-.2 2.1 0 2.9.5.8.5 1.3 1.2 1.4 2.1v.2c-.8-.2-1.7-.3-2.6-.3-1.6 0-3.2.4-4.4 1.3-1.1.9-1.8 2.2-1.7 3.6.1 1.4.9 2.6 2.1 3.2 1.1.6 2.4.7 3.7.4 1.2-.3 2.2-1 2.9-1.9v1.4c0 .3.2.5.5.5h1.7c.3 0 .5-.2.5-.5V8.2c0-.2-.1-.4-.2-.5zm-2.4 5.3c-.5.8-1.3 1.3-2.2 1.5-.8.2-1.7.1-2.4-.3-.6-.4-1-1.1-1-1.8 0-.8.4-1.6 1.1-2.1.8-.6 1.8-.8 2.8-.8.6 0 1.2.1 1.7.2v3.3z"/>
      </svg>
    ),
  },
  Apple: {
    bg: '#000000',
    color: '#ffffff',
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-.99 1.74-.85 2.76 1.02.08 2-.51 2.58-1.26z"/>
      </svg>
    ),
  },
  'Goldman Sachs': {
    bg: '#7399C6',
    color: '#ffffff',
    text: 'GS',
  },
  Uber: {
    bg: '#000000',
    color: '#ffffff',
    text: 'Uber',
  },
  Adobe: {
    bg: '#FA0F00',
    color: '#ffffff',
    text: 'A',
  },
  Oracle: {
    bg: '#C74634',
    color: '#ffffff',
    text: 'ORCL',
  },
  Qualcomm: {
    bg: '#3253DC',
    color: '#ffffff',
    text: 'QCOM',
  },
  Cisco: {
    bg: '#1BA0D7',
    color: '#ffffff',
    text: 'CISCO',
  },
  Nvidia: {
    bg: '#76B900',
    color: '#000000',
    text: 'NVDA',
  },
  Flipkart: {
    bg: '#2874F0',
    color: '#FFE500',
    text: 'FK',
  },
  Atlassian: {
    bg: '#0052CC',
    color: '#ffffff',
    text: 'ATLS',
  },
  'DE Shaw': {
    bg: '#0A2540',
    color: '#00D4B2',
    text: 'DES',
  },
  'Morgan Stanley': {
    bg: '#002B49',
    color: '#ffffff',
    text: 'MS',
  },
  Samsung: {
    bg: '#1428A0',
    color: '#ffffff',
    text: 'SS',
  },
  Intel: {
    bg: '#0068B5',
    color: '#ffffff',
    text: 'INTC',
  },
  Walmart: {
    bg: '#0071DC',
    color: '#FFC220',
    text: 'WMT',
  },
  'Texas Instruments': {
    bg: '#CC0000',
    color: '#ffffff',
    text: 'TI',
  },
};

const SECTOR_GRADIENTS = {
  Technology: 'linear-gradient(135deg, #0284c7, #38bdf8)',
  'IT Services': 'linear-gradient(135deg, #0284c7, #06b6d4)',
  Finance: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  Consulting: 'linear-gradient(135deg, #8b5cf6, #c084fc)',
  'E-Commerce': 'linear-gradient(135deg, #f97316, #fb923c)',
  Semiconductor: 'linear-gradient(135deg, #10b981, #34d399)',
  Automobile: 'linear-gradient(135deg, #ef4444, #f87171)',
  'Oil & Gas': 'linear-gradient(135deg, #d97706, #f59e0b)',
  'Power & Energy': 'linear-gradient(135deg, #0d9488, #14b8a6)',
  Fintech: 'linear-gradient(135deg, #7c3aed, #a855f7)',
  Defence: 'linear-gradient(135deg, #475569, #64748b)',
  Engineering: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
  Construction: 'linear-gradient(135deg, #78716c, #a8a29e)',
  FMCG: 'linear-gradient(135deg, #db2777, #f472b6)',
  Logistics: 'linear-gradient(135deg, #65a30d, #a3e635)',
  EdTech: 'linear-gradient(135deg, #e11d48, #fb7185)',
  'Space & Research': 'linear-gradient(135deg, #2563eb, #60a5fa)',
  'Mining & Metals': 'linear-gradient(135deg, #52525b, #71717a)',
  Conglomerate: 'linear-gradient(135deg, #9333ea, #c084fc)',
};

export default function CompanyLogo({ company, size = 36 }) {
  const brand = BRAND_LOGOS[company.name];

  if (brand && brand.svg) {
    return (
      <div
        className="company-brand-logo-wrap"
        style={{
          width: size,
          height: size,
          background: brand.bg,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {brand.svg}
      </div>
    );
  }

  if (brand && brand.text) {
    return (
      <div
        className="company-brand-logo-wrap font-mono"
        style={{
          width: size,
          height: size,
          background: brand.bg,
          color: brand.color,
          fontSize: brand.text.length > 2 ? '10px' : '12px',
          fontWeight: 800,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {brand.text}
      </div>
    );
  }

  // Sector-based gradient fallback
  const fallbackGradient = SECTOR_GRADIENTS[company.sector] || 'linear-gradient(135deg, #0284c7, #38bdf8)';
  const initials = company.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="company-brand-logo-wrap font-mono"
      style={{
        width: size,
        height: size,
        background: fallbackGradient,
        color: '#ffffff',
        fontSize: initials.length > 2 ? '10px' : '12px',
        fontWeight: 800,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      {initials || company.name.charAt(0)}
    </div>
  );
}
