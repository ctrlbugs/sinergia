'use client';

const steps = [
  {
    number: 1,
    icon: 'person_add',
    title: 'Plan',
    description:
      'We assess your objectives, compliance requirements, and project scope to design a structured procurement strategy.',
  },
  {
    number: 2,
    icon: 'search',
    title: 'Oversee',
    description:
      'We manage tender publication, vendor coordination, and independent bid evaluation with full transparency.',
  },
  {
    number: 3,
    icon: 'send',
    title: 'Deliver',
    description:
      'We provide award recommendations, compliance documentation, and ongoing procurement oversight.',
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
          Register your organization, access structured procurement opportunities, and engage with confidence through a secure and compliant system.
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
