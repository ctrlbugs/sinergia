import { useRef, useEffect, RefObject } from 'react';

interface SwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number; // Minimum distance for a swipe (default: 50px)
  preventScroll?: boolean; // Prevent default scroll behavior during swipe
}

export function useSwipe<T extends HTMLElement>(
  options: SwipeOptions
): RefObject<T | null> {
  const elementRef = useRef<T | null>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const currentX = useRef<number>(0);
  const initialX = useRef<number>(0);
  const threshold = options.threshold || 50;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      isDragging.current = true;
      currentX.current = 0;
      initialX.current = 0;
      
      // Don't preventDefault when touching interactive elements (buttons, links)
      // so that clicks/taps still fire on mobile
      const target = e.target as HTMLElement;
      if (options.preventScroll && !target.closest('button, a, [role="button"], input, [onclick]')) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      
      const touch = e.touches[0];
      touchEndX.current = touch.clientX;
      touchEndY.current = touch.clientY;
      
      const deltaX = touchEndX.current - touchStartX.current;
      const deltaY = touchEndY.current - touchStartY.current;
      
      // If horizontal swipe is dominant, prevent vertical scroll
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10 && options.preventScroll) {
        e.preventDefault();
      }
      
      // Visual feedback during drag (subtle)
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        currentX.current = deltaX;
        // Apply subtle visual feedback to the grid inside, not the wrapper
        const grid = element.querySelector('.why-grid, .features-grid, .trending-news-grid') as HTMLElement;
        if (grid) {
          const currentTransform = window.getComputedStyle(grid).transform;
          const match = currentTransform.match(/translateX\(([^)]+)\)/);
          const baseX = match ? parseFloat(match[1]) : 0;
          grid.style.transition = 'none';
          grid.style.transform = `translateX(${baseX + deltaX * 0.5}px)`;
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      
      // Reset transform on grid
      const grid = element?.querySelector('.why-grid, .features-grid, .trending-news-grid') as HTMLElement;
      if (grid) {
        grid.style.transition = '';
        // Don't reset transform - let the component handle it
      }
      
      const deltaX = touchEndX.current - touchStartX.current;
      const deltaY = touchEndY.current - touchStartY.current;
      
      // Check if it's a horizontal swipe (more horizontal than vertical)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && options.onSwipeRight) {
          // Swiped right
          options.onSwipeRight();
        } else if (deltaX < 0 && options.onSwipeLeft) {
          // Swiped left
          options.onSwipeLeft();
        }
      }
      
      // Reset values
      touchStartX.current = 0;
      touchStartY.current = 0;
      touchEndX.current = 0;
      touchEndY.current = 0;
      currentX.current = 0;
    };

    // Mouse events for desktop drag support
    const handleMouseDown = (e: MouseEvent) => {
      touchStartX.current = e.clientX;
      touchStartY.current = e.clientY;
      isDragging.current = true;
      currentX.current = 0;
      initialX.current = 0;
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      
      touchEndX.current = e.clientX;
      touchEndY.current = e.clientY;
      
      const deltaX = touchEndX.current - touchStartX.current;
      
      // Visual feedback during drag
      if (Math.abs(deltaX) > 5) {
        currentX.current = deltaX;
        const grid = element?.querySelector('.why-grid, .features-grid, .trending-news-grid') as HTMLElement;
        if (grid) {
          const currentTransform = window.getComputedStyle(grid).transform;
          const match = currentTransform.match(/translateX\(([^)]+)\)/);
          const baseX = match ? parseFloat(match[1]) : 0;
          grid.style.transition = 'none';
          grid.style.transform = `translateX(${baseX + deltaX * 0.5}px)`;
        }
      }
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      
      // Reset transform on grid
      const grid = element?.querySelector('.why-grid, .features-grid, .trending-news-grid') as HTMLElement;
      if (grid) {
        grid.style.transition = '';
        // Don't reset transform - let the component handle it
      }
      
      const deltaX = touchEndX.current - touchStartX.current;
      const deltaY = touchEndY.current - touchStartY.current;
      
      // Check if it's a horizontal swipe
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX > 0 && options.onSwipeRight) {
          options.onSwipeRight();
        } else if (deltaX < 0 && options.onSwipeLeft) {
          options.onSwipeLeft();
        }
      }
      
      // Reset values
      touchStartX.current = 0;
      touchStartY.current = 0;
      touchEndX.current = 0;
      touchEndY.current = 0;
      currentX.current = 0;
    };

    // Add touch event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: !options.preventScroll });
    element.addEventListener('touchmove', handleTouchMove, { passive: !options.preventScroll });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Add mouse event listeners for desktop drag
    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [options.onSwipeLeft, options.onSwipeRight, threshold, options.preventScroll]);

  return elementRef;
}

