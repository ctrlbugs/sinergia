'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return context;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <ContactModalContent isOpen={isOpen} onClose={closeModal} />
    </ContactModalContext.Provider>
  );
}

function ContactModalContent({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to API
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
        <button className="contact-modal-close" onClick={onClose} aria-label="Close">
          <span className="material-icons">close</span>
        </button>

        <div className="contact-modal-header">
          <h2 id="contact-modal-title">📩 Engage Our Procurement Advisory Team</h2>
        </div>

        <form className="contact-modal-form" onSubmit={handleSubmit}>
          {/* Section 1: Organization Information */}
          <fieldset className="contact-modal-section">
            <legend>Organization Information</legend>
            <div className="contact-modal-grid">
              <div className="contact-modal-field contact-modal-field-full">
                <label htmlFor="orgName">Organization Name <span className="required">*</span></label>
                <input id="orgName" name="orgName" type="text" required placeholder="Enter organization name" />
              </div>
              <div className="contact-modal-field">
                <label htmlFor="industrySector">Industry Sector</label>
                <select id="industrySector" name="industrySector">
                  <option value="">Select sector</option>
                  <option value="oil-gas">Oil & Gas</option>
                  <option value="government">Government / Public Sector</option>
                  <option value="energy">Energy & Utilities</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="financial">Financial Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="contact-modal-field">
                <label htmlFor="orgType">Organization Type</label>
                <select id="orgType" name="orgType">
                  <option value="">Select type</option>
                  <option value="government">Government Agency</option>
                  <option value="multinational">Multinational Corporation</option>
                  <option value="private">Private Enterprise</option>
                  <option value="joint-venture">Joint Venture</option>
                  <option value="contractor">Contractor / Operator</option>
                </select>
              </div>
              <div className="contact-modal-field contact-modal-field-full">
                <label htmlFor="country">Country / Region</label>
                <input id="country" name="country" type="text" placeholder="e.g. Nigeria, West Africa" />
              </div>
            </div>
          </fieldset>

          {/* Section 2: Contact Information */}
          <fieldset className="contact-modal-section">
            <legend>Contact Information</legend>
            <div className="contact-modal-grid">
              <div className="contact-modal-field">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <input id="fullName" name="fullName" type="text" required placeholder="Your full name" />
              </div>
              <div className="contact-modal-field">
                <label htmlFor="jobTitle">Job Title / Role</label>
                <input id="jobTitle" name="jobTitle" type="text" placeholder="e.g. Procurement Manager" />
              </div>
              <div className="contact-modal-field">
                <label htmlFor="email">Corporate Email Address <span className="required">*</span></label>
                <input id="email" name="email" type="email" required placeholder="name@company.com" />
              </div>
              <div className="contact-modal-field">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" placeholder="+234 000 000 0000" />
              </div>
              <div className="contact-modal-field contact-modal-field-full">
                <label>Preferred Contact Method</label>
                <div className="contact-modal-radio-group">
                  <label className="contact-modal-radio"><input type="radio" name="contactMethod" value="email" defaultChecked /> Email</label>
                  <label className="contact-modal-radio"><input type="radio" name="contactMethod" value="phone" /> Phone</label>
                  <label className="contact-modal-radio"><input type="radio" name="contactMethod" value="virtual" /> Virtual Meeting</label>
                  <label className="contact-modal-radio"><input type="radio" name="contactMethod" value="onsite" /> On-Site Consultation</label>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Section 3: Procurement Requirements */}
          <fieldset className="contact-modal-section">
            <legend>Procurement Requirements</legend>
            <div className="contact-modal-grid">
              <div className="contact-modal-field contact-modal-field-full">
                <label htmlFor="procurementCategory">Procurement Category</label>
                <select id="procurementCategory" name="procurementCategory">
                  <option value="">Select category</option>
                  <option value="capital">Capital Projects</option>
                  <option value="equipment">Equipment & Materials</option>
                  <option value="epc">EPC Contracts</option>
                  <option value="consultancy">Consultancy Services</option>
                  <option value="it">IT & Digital Solutions</option>
                  <option value="operations">Operations & Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="contact-modal-field contact-modal-field-full">
                <label htmlFor="description">Brief Description of What You Intend to Procure</label>
                <textarea id="description" name="description" rows={5} placeholder="Tell us about your procurement objectives, scope, regulatory considerations, and expected outcomes."></textarea>
              </div>
            </div>
          </fieldset>

          {/* Section 4: Compliance & Oversight Needs */}
          <fieldset className="contact-modal-section">
            <legend>Compliance & Oversight Needs</legend>
            <div className="contact-modal-field contact-modal-field-full">
              <label>Do you require full procurement management or advisory support only?</label>
              <div className="contact-modal-radio-group contact-modal-radio-stack">
                <label className="contact-modal-radio"><input type="radio" name="supportType" value="full" /> Full Oversight & Management</label>
                <label className="contact-modal-radio"><input type="radio" name="supportType" value="advisory" /> Advisory & Evaluation Only</label>
                <label className="contact-modal-radio"><input type="radio" name="supportType" value="portal" /> E-Procurement Portal Setup</label>
                <label className="contact-modal-radio"><input type="radio" name="supportType" value="compliance" /> Compliance Review & Audit Support</label>
              </div>
            </div>
          </fieldset>

          <div className="contact-modal-actions">
            <button type="submit" className="btn btn-primary contact-modal-submit">
              Request Procurement Consultation
            </button>
            <p className="contact-modal-subtext">
              Our team will review your submission and respond within 24–48 business hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
