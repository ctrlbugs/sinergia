'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Logos from images/Partners
const partnerLogos = [
  { src: '/images/Partners/Aradel.png', alt: 'Aradel' },
  { src: '/images/Partners/Chevron.png', alt: 'Chevron' },
  { src: '/images/Partners/exxon.png', alt: 'Exxon' },
  { src: '/images/Partners/Heir.png', alt: 'Heir' },
  { src: '/images/Partners/Mrs.png', alt: 'Mrs' },
  { src: '/images/Partners/oando.png', alt: 'Oando' },
  { src: '/images/Partners/Oiltest.png', alt: 'Oiltest' },
  { src: '/images/Partners/Petrolex.png', alt: 'Petrolex' },
  { src: '/images/Partners/seplat.png', alt: 'Seplat' },
];

export default function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const duplicateRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const basePosition = useRef(0);
  const animationIdRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const scrollSpeed = 0.5;
    let position = 0;

    const animate = () => {
      if (!isPausedRef.current && trackRef.current && duplicateRef.current) {
        position += scrollSpeed;
        const trackWidth = trackRef.current.scrollWidth;

        if (position >= trackWidth) {
          position = 0;
        }

        basePosition.current = position;
        trackRef.current.style.transform = `translateX(-${position}px)`;
        duplicateRef.current.style.transform = `translateX(-${position}px)`;
      }
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleTouchStart = (e: TouchEvent) => {
      isPausedRef.current = true;
      setIsDragging(true);
      dragStartX.current = e.touches[0].clientX;
      dragCurrentX.current = dragStartX.current;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      dragCurrentX.current = e.touches[0].clientX;
      const deltaX = dragCurrentX.current - dragStartX.current;

      if (trackRef.current && duplicateRef.current) {
        trackRef.current.style.transform = `translateX(-${basePosition.current + deltaX}px)`;
        duplicateRef.current.style.transform = `translateX(-${basePosition.current + deltaX}px)`;
        trackRef.current.style.transition = 'none';
        duplicateRef.current.style.transition = 'none';
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      const deltaX = dragCurrentX.current - dragStartX.current;
      basePosition.current += deltaX;

      if (trackRef.current && duplicateRef.current) {
        trackRef.current.style.transition = '';
        duplicateRef.current.style.transition = '';
      }

      setTimeout(() => {
        isPausedRef.current = false;
      }, 100);
    };

    const handleMouseDown = (e: MouseEvent) => {
      isPausedRef.current = true;
      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragCurrentX.current = dragStartX.current;
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      dragCurrentX.current = e.clientX;
      const deltaX = dragCurrentX.current - dragStartX.current;

      if (trackRef.current && duplicateRef.current) {
        trackRef.current.style.transform = `translateX(-${basePosition.current + deltaX}px)`;
        duplicateRef.current.style.transform = `translateX(-${basePosition.current + deltaX}px)`;
        trackRef.current.style.transition = 'none';
        duplicateRef.current.style.transition = 'none';
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const deltaX = dragCurrentX.current - dragStartX.current;
      basePosition.current += deltaX;

      if (trackRef.current && duplicateRef.current) {
        trackRef.current.style.transition = '';
        duplicateRef.current.style.transition = '';
      }

      setTimeout(() => {
        isPausedRef.current = false;
      }, 100);
    };

    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', handleTouchMove, { passive: true });
    wrapper.addEventListener('touchend', handleTouchEnd);
    wrapper.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchmove', handleTouchMove);
      wrapper.removeEventListener('touchend', handleTouchEnd);
      wrapper.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="partners-section fade-in">
      <div className="partners-container">
        <div className="partners-carousel-container">
          <div className="partners-carousel">
            <div
              className="partners-carousel-wrapper"
              ref={wrapperRef}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
              <div className="partners-carousel-track" ref={trackRef}>
                {partnerLogos.map((logo, index) => (
                  <div key={`original-${index}`} className="partners-logo-item">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={80}
                      height={40}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
              <div className="partners-carousel-track duplicate" ref={duplicateRef}>
                {partnerLogos.map((logo, index) => (
                  <div key={`duplicate-${index}`} className="partners-logo-item">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={80}
                      height={40}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
