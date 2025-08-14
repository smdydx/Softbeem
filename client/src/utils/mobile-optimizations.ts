
// Mobile performance and UX optimizations
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Prevent iOS zoom on input focus
export const preventIOSZoom = () => {
  if (isIOS()) {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
    }
  }
};

// Set CSS custom properties for viewport units
export const setViewportUnits = () => {
  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--vw', `${vw}px`);
};

// Initialize mobile optimizations
export const initMobileOptimizations = () => {
  setViewportUnits();
  preventIOSZoom();
  
  // Update viewport units on resize
  const updateViewport = throttle(setViewportUnits, 100);
  window.addEventListener('resize', updateViewport);
  
  // Handle orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportUnits, 100);
  });
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', updateViewport);
  };
};
