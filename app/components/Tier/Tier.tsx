'use client';

const tiers = [
  {
    name: 'Foundation Tier',
    profitMargin: 'Normal',
    icon: 'foundation',
    description: 'Perfect for beginners looking to start their investment journey with Sinergia Negotium. Get access to essential features and normal profit margins.',
  },
  {
    name: 'Ascend Tier',
    profitMargin: 'High',
    icon: 'trending_up',
    description: 'Our most popular tier for serious investors. Enjoy high profit margins and premium features designed for optimal returns.',
    popular: true,
  },
  {
    name: 'Pinnacle Tier',
    profitMargin: '25% monthly',
    icon: 'stars',
    description: 'The ultimate tier for maximum returns. Experience super-fast processing and exceptional profit margins with our premium investment tier.',
    superFast: true,
  },
];

export default function Tier() {
  return (
    <section className="tier-section" id="tiers">
      <div className="section-container">
        <div className="section-header fade-in">
          <div className="section-badge">Investment Tiers</div>
          <h2 className="section-title">Choose Your Investment Tier</h2>
          <p className="section-subtitle">
            Select the tier that best fits your investment goals and start earning with Sinergia Negotium.
          </p>
        </div>
        <div className="tier-grid">
          {tiers.map((tier, index) => (
            <div key={index} className={`tier-card ${tier.popular ? 'popular' : ''} fade-in`}>
              {tier.popular && <div className="tier-badge">Most Popular</div>}
              <div className="tier-icon">
                <span className="material-icons">{tier.icon}</span>
              </div>
              <h3 className="tier-name">{tier.name}</h3>
              <p className="tier-description">{tier.description}</p>
              <div className="tier-profit">
                <div className="tier-profit-label">Profit Margin</div>
                <div className={`tier-profit-value ${tier.profitMargin === 'High' ? 'high' : ''} ${tier.superFast ? 'super-fast' : ''}`}>
                  {tier.superFast ? (
                    <>
                      <div style={{ lineHeight: '1.2' }}>25% Monthly</div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, marginTop: '0.25rem', opacity: 0.9 }}>Super Fast</div>
                    </>
                  ) : (
                    tier.profitMargin
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
