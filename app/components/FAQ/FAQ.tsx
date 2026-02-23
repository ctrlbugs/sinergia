'use client';

import { useEffect, useRef } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What role does Sinergia Negotium play in the procurement process?',
    answer:
      'We serve as an independent procurement advisory and oversight partner, managing tender processes, bid evaluations, and compliance monitoring on behalf of oil & gas operators, government institutions, and private enterprises.',
  },
  {
    question: 'Do you only provide a portal, or full procurement management?',
    answer:
      'We provide full procurement lifecycle management — from planning and tender structuring to bid evaluation, award recommendations, and ongoing oversight.',
  },
  {
    question: 'Which sectors do you serve?',
    answer:
      'We primarily serve oil & gas companies, government agencies, and private sector organizations requiring structured, compliant, and transparent procurement systems.',
  },
  {
    question: 'How do you ensure transparency and fairness?',
    answer:
      'All procurement activities are managed under structured governance frameworks, documented evaluation criteria, and independent oversight protocols to ensure fairness and audit readiness.',
  },
  {
    question: 'Do you conduct independent bid evaluations?',
    answer:
      'Yes. We manage and coordinate objective bid evaluation processes aligned with regulatory standards and industry best practices.',
  },
  {
    question: 'How do you ensure regulatory compliance?',
    answer:
      'Our procurement frameworks are designed to align with industry regulations, public sector procurement standards, and corporate governance policies.',
  },
  {
    question: 'Can vendors participate through your system?',
    answer:
      'Yes. Approved vendors can register, access tenders, and submit bids electronically within a structured and monitored procurement environment.',
  },
  {
    question: 'Is your platform secure?',
    answer:
      'Yes. The system operates with controlled access, encrypted data handling, and audit trails to protect sensitive procurement information.',
  },
  {
    question: 'Do you support audit and reporting requirements?',
    answer:
      'Absolutely. We maintain comprehensive documentation and generate audit-ready reports to support internal reviews and regulatory oversight.',
  },
  {
    question: 'How can an organization engage your services?',
    answer:
      'Organizations can initiate engagement through a formal consultation, after which we structure a procurement oversight framework tailored to their operational and regulatory needs.',
  },
];

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize FAQ accordion - exactly matching original implementation
    const container = containerRef.current;
    if (!container) return;

    const handleFAQClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const question = target.closest('.faq-question');
      if (!question) return;
      
      const item = question.closest('.faq-item') as HTMLElement;
      if (!item) return;
      
      const faqItems = container.querySelectorAll('.faq-item');
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach((faqItem) => {
        faqItem.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    };

    // Use event delegation on the container
    container.addEventListener('click', handleFAQClick);

    // Cleanup function
    return () => {
      container.removeEventListener('click', handleFAQClick);
    };
  }, []);

  return (
    <section className="faq-section" id="faq">
      <div className="section-container">
        <div className="section-header fade-in">
          <div className="section-badge">FAQ</div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about the e-Procurement Portal and our platform.
          </p>
        </div>
        <div className="faq-container" ref={containerRef}>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item fade-in">
              <div className="faq-question">
                <span>{faq.question}</span>
                <span className="faq-icon">
                  <span className="material-icons">expand_more</span>
                </span>
              </div>
              <div className="faq-answer">
                <div className="faq-answer-content">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
