'use client';

const steps = [
  {
    number: 1,
    icon: 'person_add',
    title: 'Register',
    description:
      'Create your account and complete verification.',
  },
  {
    number: 2,
    icon: 'search',
    title: 'Explore',
    description:
      'Access tenders and review bidding documents.',
  },
  {
    number: 3,
    icon: 'send',
    title: 'Submit',
    description:
      'Send your bid online and track its progress in real time.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="section-container">
        <div className="section-header fade-in">
          <div className="section-badge">GET STARTED</div>
          <h2 className="section-title">Your Gateway to Smarter Procurement</h2>
          <p className="section-subtitle">
            Register, explore tenders, and participate with confidence through a trusted digital system.
          </p>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card fade-in">
              <div className="step-icon-wrapper">
                <div className="step-number">{step.number}</div>
                <div className="step-icon-circle">
                  <span className="material-icons">{step.icon}</span>
                </div>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="step-arrow">
                  <span className="material-icons">arrow_forward</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
