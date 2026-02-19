'use client';

import { useEffect } from 'react';

export default function FadeInObserver() {
  useEffect(() => {
    // Fade in animation on scroll - matches original HTML behavior
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Function to observe all fade-in elements
    const observeFadeInElements = () => {
      const fadeInElements = document.querySelectorAll('.fade-in:not(.visible)');
      fadeInElements.forEach((el) => {
        observer.observe(el);
      });
    };

    // Initial observation - run after a short delay to ensure DOM is ready
    const timeout1 = setTimeout(() => {
      observeFadeInElements();
    }, 50);

    // Also run after components mount
    const timeout2 = setTimeout(() => {
      observeFadeInElements();
    }, 200);

    // Observe dynamically added elements
    const mutationObserver = new MutationObserver(() => {
      observeFadeInElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}

