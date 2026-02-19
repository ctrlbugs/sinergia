'use client';

import { useEffect, useRef } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is the purpose of the e-Procurement Portal?',
    answer:
      'The e-Procurement Portal is designed to digitize and streamline procurement processes, ensuring transparency, efficiency, compliance, and improved oversight across all procurement activities.',
  },
  {
    question: 'Who can use the portal?',
    answer:
      'The platform is designed for procurement administrators, internal departments, vendors, contractors, evaluators, and authorized oversight bodies involved in procurement processes.',
  },
  {
    question: 'What procurement activities are covered on the platform?',
    answer:
      'The portal supports end-to-end procurement activities including tender publication, vendor registration, bid submission, bid evaluation, contract award, and performance monitoring.',
  },
  {
    question: 'How does the portal improve transparency?',
    answer:
      'All procurement activities are logged with secure audit trails, timestamped actions, and role-based access controls to ensure accountability and traceability.',
  },
  {
    question: 'Is vendor registration mandatory?',
    answer:
      'Yes. Vendors must complete a structured registration and verification process before participating in bids or tenders to ensure compliance and eligibility.',
  },
  {
    question: 'How secure is the platform?',
    answer:
      'The portal is built with secure system architecture, encrypted data transmission, controlled access levels, and continuous monitoring to protect sensitive procurement data.',
  },
  {
    question: 'Can bids be submitted online?',
    answer:
      'Yes. Vendors can securely submit bids electronically within the specified deadline, eliminating manual paperwork and reducing administrative delays.',
  },
  {
    question: 'Does the portal support compliance and audit requirements?',
    answer:
      'Absolutely. The system maintains comprehensive digital records to support compliance reviews, internal audits, and regulatory oversight.',
  },
  {
    question: 'What are the benefits of digitizing procurement?',
    answer:
      'Digitization reduces processing time, minimizes manual errors, enhances transparency, improves vendor participation, and strengthens governance.',
  },
  {
    question: 'Is training or support available for users?',
    answer:
      'Yes. User guidance materials and technical support are provided to ensure smooth onboarding and effective utilization of the platform.',
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
