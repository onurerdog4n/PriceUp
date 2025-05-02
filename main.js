import ProductComparisonWidget from './js/app.js';

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM fully loaded, initializing application');
  
  // Create and initialize the product comparison widget
  const app = new ProductComparisonWidget();
  app.initialize();
  // Expose app to window for debugging
  window.app = app;
});
