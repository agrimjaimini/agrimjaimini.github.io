// Simple analytics utility for portfolio tracking
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // In a real app, you'd send this to your analytics service
  console.log('Analytics Event:', eventName, properties);
  
  // Example: Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
};

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page });
};

export const trackProjectView = (projectName: string) => {
  trackEvent('project_view', { project_name: projectName });
};

export const trackContactForm = (method: string) => {
  trackEvent('contact_form', { method });
};

export const trackThemeChange = (theme: string) => {
  trackEvent('theme_change', { theme });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', { depth });
};

// Performance monitoring
export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
    };
  }
  return null;
}; 