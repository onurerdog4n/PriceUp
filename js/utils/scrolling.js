/**
 * Scrolling Utilities
 * Handles synchronized scrolling and drag-and-drop functionality
 */

// Function to set up synchronized scrolling between containers
export function setupScrolling() {
  const storesScrollContainer = document.getElementById('stores-scroll-container');
  const scrollableHeader = document.getElementById('scrollable-header');
  
  if (!storesScrollContainer || !scrollableHeader) {
    console.error('Scrollable elements not found');
    return;
  }
  
  // Sync horizontal scrolling between header and content
  storesScrollContainer.addEventListener('scroll', () => {
    scrollableHeader.scrollLeft = storesScrollContainer.scrollLeft;
  });
  
  scrollableHeader.addEventListener('scroll', () => {
    storesScrollContainer.scrollLeft = scrollableHeader.scrollLeft;
  });
}

// Function to set up drag and drop for store headers
export function setupDragAndDrop(appInstance) {
  // Check if Sortable is already available globally
  if (typeof Sortable !== 'undefined') {
    initializeSortable(Sortable, appInstance);
  } else {
    // Dynamically import Sortable library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js';
    script.onload = () => {
      initializeSortable(window.Sortable, appInstance);
    };
    script.onerror = (error) => {
      console.error('Failed to load Sortable library:', error);
    };
    document.head.appendChild(script);
  }
}

function initializeSortable(Sortable, appInstance) {
  // Get the header container
  const headerContainer = document.getElementById('scrollable-header');
  
  if (!headerContainer) {
    console.error('Header container not found');
    return;
  }
  
  // Initialize Sortable on the header container
  const sortable = new Sortable(headerContainer, {
    animation: 150,
    handle: '.store-header', // Allow dragging the entire header
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    onStart: function(evt) {
      evt.item.classList.add('dragging');
    },
    onEnd: function(evt) {
      evt.item.classList.remove('dragging');
      
      // Get the new order of store IDs (not names)
      const newOrderIds = Array.from(headerContainer.querySelectorAll('.store-header'))
        .map(header => header.getAttribute('data-store-id'));
      
      // Call the app's reorderStores method with the new order
      appInstance.reorderStores(newOrderIds);
      
      // Send the new order to the API
      sendStoreOrderToAPI(newOrderIds);
    }
  });
}

// Function to send the new store order to the API
async function sendStoreOrderToAPI(storeOrder) {
  try {
    const apiUrl = 'http://128.251.133.20:8080/api/product-attribute-summary';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        store_order: storeOrder
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Show success message
    showNotification('Store order updated successfully', 'success');
    
  } catch (error) {
    console.error('Error sending store order to API:', error);
    showNotification('Failed to update store order', 'error');
  }
}

// Function to show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
    type === 'success' ? 'bg-green-100 text-green-800 border border-green-400' :
    type === 'error' ? 'bg-red-100 text-red-800 border border-red-400' :
    'bg-blue-100 text-blue-800 border border-blue-400'
  }`;
  
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fa-solid ${
        type === 'success' ? 'fa-check-circle' :
        type === 'error' ? 'fa-exclamation-circle' :
        'fa-info-circle'
      } mr-2"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 500);
  }, 3000);
}