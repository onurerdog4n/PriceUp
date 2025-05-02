/**
 * Main Application
 * Initializes the product comparison widget
 */
import { setupScrolling } from './utils/scrolling.js';
import ProductRow from './components/ProductRow.js';

export default class ProductComparisonWidget {
  constructor() {
    this.data = []; // Start with empty data
    this.filteredData = []; // Filtered data based on user filters
    this.storeOrder = []; // Will be populated from API
    this.storeLogos = {}; // Will be populated from API with store logos
    this.storeIds = {}; // Will store the mapping of store names to IDs
    this.page = 1;
    this.lastPage = 1;
    this.loading = false;
    this.apiWork = 0; // Flag to prevent multiple API calls
    this.apiUrl = 'http://128.251.133.20:8080/api/product-attribute-summary/comparison-data';
    this.productsPerPage = 10; // Default products per page
    
    // Filter values
    this.filters = {
      brand: '', // Brand filter
      onlyData: false // Only show stores with data
    };
  }

  initialize() {
    // Check if there's a saved order in localStorage
    const savedOrder = localStorage.getItem('storeOrder');
    if (savedOrder) {
      try {
        this.storeOrder = JSON.parse(savedOrder);
      } catch (error) {
        console.error('Error parsing saved store order:', error);
      }
    }
    
    // Check if there are saved logos in localStorage
    const savedLogos = localStorage.getItem('storeLogos');
    if (savedLogos) {
      try {
        this.storeLogos = JSON.parse(savedLogos);
      } catch (error) {
        console.error('Error parsing saved store logos:', error);
      }
    }
    
    // Check if there are saved store IDs in localStorage
    const savedStoreIds = localStorage.getItem('storeIds');
    if (savedStoreIds) {
      try {
        this.storeIds = JSON.parse(savedStoreIds);
      } catch (error) {
        console.error('Error parsing saved store IDs:', error);
      }
    }
    
    // Set up event listeners for filters
    this.setupFilters();
    
    // Set up scrolling behavior
    setupScrolling();
    
    // Set up infinite scrolling with Intersection Observer
    this.setupInfiniteScroll();
    
    // Load initial data
    this.fetchProducts(this.page);
    
    // Setup drag and drop will be called after data is loaded
  }

  setupFilters() {
    // Brand filter input
    const brandFilterInput = document.getElementById('brand-filter');
    if (brandFilterInput) {
      brandFilterInput.addEventListener('input', (e) => {
        this.filters.brand = e.target.value.trim().toLowerCase();
        this.applyFilters();
      });
    }
    
    // Only Data filter toggle
    const onlyDataFilter = document.getElementById('only-data-filter');
    const toggleKnob = document.getElementById('toggle-knob');
    
    if (onlyDataFilter && toggleKnob) {
      onlyDataFilter.addEventListener('change', (e) => {
        this.filters.onlyData = e.target.checked;
        
        // Toggle styling for the switch
        if (e.target.checked) {
          toggleKnob.classList.add('translate-x-5');
          toggleKnob.parentElement.classList.add('bg-blue-500');
        } else {
          toggleKnob.classList.remove('translate-x-5');
          toggleKnob.parentElement.classList.remove('bg-blue-500');
        }
        
        this.applyFilters();
      });
    }
    
    // Reset filters button
    const resetFiltersBtn = document.getElementById('reset-filters');
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        // Reset brand filter
        if (brandFilterInput) {
          brandFilterInput.value = '';
          this.filters.brand = '';
        }
        
        // Reset only data filter
        if (onlyDataFilter) {
          onlyDataFilter.checked = false;
          this.filters.onlyData = false;
          toggleKnob.classList.remove('translate-x-5');
          toggleKnob.parentElement.classList.remove('bg-blue-500');
        }
        
        this.applyFilters();
      });
    }
  }

// app.js içindeki applyFilters metodunu güncelliyoruz

  applyFilters() {
    console.log("Filtreler uygulanıyor:", this.filters);
    
    // Tüm ürünleri kontrol et
    this.data.forEach(product => {
      // Marka ve SKU filtresi uygulanıyor mu?
      let shouldShowProduct = true;
      
      if (this.filters.brand) {
        // Brand ve SKU'da arama yap
        const brandMatch = product.brand.toLowerCase().indexOf(this.filters.brand.toLowerCase()) !== -1;
        const skuMatch = product.sku.toLowerCase().indexOf(this.filters.brand.toLowerCase()) !== -1;
        
        // Her ikisinden birinde eşleşme varsa göster
        shouldShowProduct = brandMatch || skuMatch;
      }
      
      // İlgili DOM elemanlarını bul
      const productRow = document.querySelector(`#fixed-products-container > div[data-product-id="${product.id}"]`);
      const storeRow = document.querySelector(`#scrollable-products-container > div[data-product-id="${product.id}"]`);
      
      if (!productRow || !storeRow) return; // Eleman bulunamadıysa atla
      
      // Ürün görünürlüğünü ayarla
      if (shouldShowProduct) {
        productRow.style.display = '';
        storeRow.style.display = '';
        
        // "Sadece Verisi Olanlar" filtresi uygulanıyor mu?
        if (this.filters.onlyData) {
          // Her mağaza kutusunda NO DATA kontrolü yap
          const storeBoxes = storeRow.querySelectorAll('.store-box');
          
          storeBoxes.forEach(storeBox => {
            // Önce data-no-data özelliğini kontrol et
            let hasNoData = storeBox.getAttribute('data-no-data') === 'true';
            
            // Eğer bu özellik yoksa, içeriğe bakarak kontrol et
            if (!hasNoData) {
              // NO DATA metnini ara
              const noDataElement = storeBox.querySelector('.text-gray-500');
              if (noDataElement && noDataElement.textContent.includes('NO DATA')) {
                hasNoData = true;
              }
              
              // Fiyat yok veya 0 da kontrol et
              const priceElement = storeBox.querySelector('.text-base.font-bold');
              if (priceElement) {
                const priceText = priceElement.textContent.trim();
                if (priceText === 'NO DATA' || priceText === '0₺' || priceText === '0' || priceText === '') {
                  hasNoData = true;
                }
              }
            }
            
            // Görünürlüğü ayarla
            if (hasNoData) {
              storeBox.style.display = 'none';
            } else {
              storeBox.style.display = '';
            }
          });
        } else {
          // Tüm mağaza kutularını göster
          const storeBoxes = storeRow.querySelectorAll('.store-box');
          storeBoxes.forEach(box => {
            box.style.display = '';
          });
        }
      } else {
        // Ürün filtrelere uymuyorsa gizle
        productRow.style.display = 'none';
        storeRow.style.display = 'none';
      }
    });
    
    // Filtre uygulandığını göster
    const filterContainer = document.querySelector('.mb-4.flex.items-center.justify-between');
    if (filterContainer) {
      if (this.filters.brand || this.filters.onlyData) {
        filterContainer.classList.add('bg-blue-50');
        filterContainer.classList.remove('bg-white');
      } else {
        filterContainer.classList.remove('bg-blue-50');
        filterContainer.classList.add('bg-white');
      }
    }
    
    console.log("Filtreler uygulandı");
  }
  setupDragAndDrop() {
    // Import the setupDragAndDrop function from scrolling.js
    import('./utils/scrolling.js').then(module => {
      const { setupDragAndDrop } = module;
      setupDragAndDrop(this);
    }).catch(error => {
      console.error('Error setting up drag and drop:', error);
    });
  }

  setupInfiniteScroll() {
    // Create a loading indicator element
    this.loadingIndicator = document.createElement('div');
    this.loadingIndicator.className = 'text-center p-4 hidden';
    this.loadingIndicator.innerHTML = `
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <p class="mt-2 text-gray-600">Loading more products...</p>
    `;
    document.querySelector('.container').appendChild(this.loadingIndicator);
    
    // Create a sentinel element to observe
    this.sentinel = document.createElement('div');
    this.sentinel.id = 'infinite-scroll-sentinel';
    this.sentinel.className = 'load-more-trigger';
    this.sentinel.style.height = '20px';
    this.sentinel.style.width = '100%';
    this.sentinel.style.marginTop = '20px';
    this.sentinel.style.marginBottom = '20px';
    this.sentinel.style.flex = '1';
    
    // Add the sentinel to the DOM
    document.querySelector('.loadProduct').appendChild(this.sentinel);
    
    // Create and configure the Intersection Observer
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: null, // Use viewport as root
      rootMargin: '0px 0px 200px 0px', // Trigger earlier
      threshold: 0.1 // Trigger when at least 10% is visible
    });
    
    // Start observing the sentinel
    this.observer.observe(this.sentinel);
    
    // Check immediately if sentinel is visible (for large screens)
    setTimeout(() => {
      this.checkSentinelVisibility();
    }, 500);
  }
  
  // New method to handle intersection events
  handleIntersection(entries) {
    const entry = entries[0];
    
    if (entry.isIntersecting && this.apiWork === 0 && this.page < this.lastPage) {
      this.apiWork = 1; // Set flag to prevent multiple calls
      this.page++;
      this.fetchProducts(this.page);
    }
  }
  
  // New method to manually check if sentinel is visible
  checkSentinelVisibility() {
    if (!this.sentinel) return;
    
    const rect = this.sentinel.getBoundingClientRect();
    const isVisible = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    
    
    if (isVisible && this.apiWork === 0 && this.page < this.lastPage) {
      this.apiWork = 1;
      this.page++;
      this.fetchProducts(this.page);
    }
  }

  async fetchProducts(page) {
    if (this.loading) return;
    
    this.loading = true;
    this.showLoadingIndicator();
    
    try {
      const url = `${this.apiUrl}?limit=${this.productsPerPage}&page=${page}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Update pagination info
      this.lastPage = data.pagination.last_page;
      this.productsPerPage = data.pagination.per_page || this.productsPerPage;
      
      // Update store order and logos from API response
      if (page === 1 && data.storeOrder) {
        // Reset store data
        this.storeOrder = [];
        this.storeLogos = {};
        this.storeIds = {}; // Reset store IDs
        
        // Process the storeOrder data from API
        if (Array.isArray(data.storeOrder)) {
          // If storeOrder is an array of objects with id, name, logo
          data.storeOrder.forEach(store => {
            if (store && store.name) {
              this.storeOrder.push(store.name);
              
              // Save logo if provided
              if (store.logo) {
                this.storeLogos[store.name] = store.logo;
              }
              
              // Save ID if provided
              if (store.id) {
                this.storeIds[store.name] = store.id;
              }
            }
          });
        } else if (typeof data.storeOrder === 'object') {
          // If storeOrder is an object with store names as keys
          Object.keys(data.storeOrder).forEach(storeKey => {
            const store = data.storeOrder[storeKey];
            if (store && store.name) {
              this.storeOrder.push(store.name);
              
              // Save logo if provided
              if (store.logo) {
                this.storeLogos[store.name] = store.logo;
              }
              
              // Save ID if provided
              if (store.id) {
                this.storeIds[store.name] = store.id;
              }
            }
          });
        }
        
        
        // Save to localStorage for future use
        // localStorage.setItem('storeOrder', JSON.stringify(this.storeOrder));
        localStorage.setItem('storeLogos', JSON.stringify(this.storeLogos));
        localStorage.setItem('storeIds', JSON.stringify(this.storeIds));
        
        // Render store headers with the new order
        this.renderStoreHeaders();
      }
      
      // Process the new products - check different possible property names
      let newProducts = [];
      if (data.productsData) {
        newProducts = data.productsData;
      } else if (data.products) {
        newProducts = data.products;
      } else if (data.data) {
        newProducts = data.data;
      } else {
        console.error('Could not find products data in API response:', data);
        this.showErrorMessage('API response format is unexpected. Please check console for details.');
        return;
      }
      
      
      // Update data
      if (page === 1) {
        this.data = newProducts;
        this.render(); // Full render for first page
      } else {
        // Add new products to existing data
        this.data = [...this.data, ...newProducts];
        
        // Ensure all products have all stores (even if as NO DATA)
        this.ensureAllStoresExist();
        
        // Render only the new products
        this.renderNewProducts(newProducts);
      }
      
      // Set up drag and drop on first load
      if (page === 1) {
        setTimeout(() => {
          this.setupDragAndDrop();
        }, 500); // Delay to ensure DOM is ready
      }
      
      // Apply any active filters to the new content
      setTimeout(() => {
        this.applyFilters();
      }, 100);
      
      // Reposition the sentinel after adding new content
      this.repositionSentinel();
      
      // Check if sentinel is visible after adding new content
      setTimeout(() => {
        this.checkSentinelVisibility();
      }, 500);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      this.showErrorMessage('Failed to load products. Please try again later.');
    } finally {
      this.loading = false;
      this.apiWork = 0; // Reset API work flag
      this.hideLoadingIndicator();
    }
  }

  // New method to ensure all products have all stores
  ensureAllStoresExist() {
    // For each product, ensure it has all stores in storeOrder
    this.data.forEach(product => {
      // Create a map of existing stores for quick lookup
      const existingStores = {};
      product.stores.forEach(store => {
        existingStores[store.name] = store;
      });
      
      // Create a new array with all stores in the correct order
      const completeStores = [];
      
      this.storeOrder.forEach(storeName => {
        if (existingStores[storeName]) {
          // Store exists, add it to the array
          completeStores.push(existingStores[storeName]);
        } else {
          // Store doesn't exist, create a NO DATA store
          completeStores.push({
            name: storeName,
            price: "",
            date: product.date || new Date().toLocaleDateString(),
            noData: true,
            errorMessage: "Veri bulunamadı",
            hasUrl: false
          });
        }
      });
      
      // Replace the product's stores with the complete list
      product.stores = completeStores;
    });
  }

  // Reposition the sentinel element to the bottom of the content
  repositionSentinel() {
    if (this.sentinel && this.sentinel.parentNode) {
      // Remove from current position
      this.sentinel.parentNode.removeChild(this.sentinel);
      
      // Add to the end of the flex container
      document.querySelector('.loadProduct').appendChild(this.sentinel);
      
      // Re-observe the sentinel after repositioning
      if (this.observer) {
        this.observer.observe(this.sentinel);
      }
    }
  }

  showLoadingIndicator() {
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.remove('hidden');
    }
  }

  hideLoadingIndicator() {
    if (this.loadingIndicator) {
      this.loadingIndicator.classList.add('hidden');
    }
  }

  showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed bottom-4 right-4 flex items-center';
    errorDiv.innerHTML = `
      <i class="fa-solid fa-circle-exclamation mr-2"></i>
      <span>${message}</span>
      <button class="ml-4 text-red-700 hover:text-red-900">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;
    
    // Add click handler to close button
    errorDiv.querySelector('button').addEventListener('click', () => {
      errorDiv.remove();
    });
    
    // Auto-remove after 5 seconds
    document.body.appendChild(errorDiv);
    setTimeout(() => {
      if (document.body.contains(errorDiv)) {
        errorDiv.remove();
      }
    }, 5000);
  }

  setData(newData) {
    this.data = newData;
    this.render();
  }

  renderStoreHeaders() {
    const scrollableHeader = document.getElementById('scrollable-header');
    
    if (!scrollableHeader) {
      console.error('Scrollable header container not found');
      return;
    }
    
    // Clear any existing headers
    scrollableHeader.innerHTML = '';
    
    // Render store headers in the current order
    this.storeOrder.forEach(storeName => {
      const storeHeader = document.createElement('div');
      storeHeader.className = 'w-[230px] min-w-[230px] flex-shrink-0 flex items-center justify-center p-2 mr-2 store-header';
      storeHeader.setAttribute('data-store-name', storeName);
      
      // Add the store ID attribute
      // Get the store ID from the storeIds object or use a default
      const storeId = this.storeIds[storeName] || '1';
      storeHeader.setAttribute('data-store-id', storeId);
      
      // Add the drag handle
      const dragHandle = document.createElement('div');
      dragHandle.className = 'drag-handle';
      dragHandle.innerHTML = '<i class="fa-solid fa-grip-lines"></i>';
      storeHeader.appendChild(dragHandle);
      
      // Add the store logo
      const logoUrl = this.storeLogos[storeName] || '';
      const logoImg = document.createElement('img');
      logoImg.src = logoUrl;
      logoImg.alt = storeName;
      logoImg.className = 'h-8';
      storeHeader.appendChild(logoImg);
      
      scrollableHeader.appendChild(storeHeader);
    });
  }

  render() {
    const fixedContainer = document.getElementById('fixed-products-container');
    const scrollableContainer = document.getElementById('scrollable-products-container');
    
    if (!fixedContainer || !scrollableContainer) {
      console.error('Container elements not found.');
      return;
    }
    
    // Clear only if this is the first page
    if (this.page === 1) {
      fixedContainer.innerHTML = '';
      scrollableContainer.innerHTML = '';
    }
    
    // Ensure all products have all stores (even if as NO DATA)
    this.ensureAllStoresExist();
    
    // Reorder stores in data according to current storeOrder
    this.reorderProductStores();
    
    // Render all products
    this.data.forEach(product => {
      const productRow = new ProductRow(product);
      productRow.render();
    });
  }

  // Render only the newly loaded products
  renderNewProducts(newProducts) {
    if (!newProducts || newProducts.length === 0) {
      return;
    }
    
    
    // Ensure all new products have all stores
    newProducts.forEach(product => {
      // Create a map of existing stores for quick lookup
      const existingStores = {};
      product.stores.forEach(store => {
        existingStores[store.name] = store;
      });
      
      // Create a new array with all stores in the correct order
      const completeStores = [];
      
      this.storeOrder.forEach(storeName => {
        if (existingStores[storeName]) {
          // Store exists, add it to the array
          completeStores.push(existingStores[storeName]);
        } else {
          // Store doesn't exist, create a NO DATA store
          completeStores.push({
            name: storeName,
            price: "",
            date: product.date || new Date().toLocaleDateString(),
            noData: true,
            errorMessage: "Veri bulunamadı",
            hasUrl: false
          });
        }
      });
      
      // Replace the product's stores with the complete list
      product.stores = completeStores;
    });
    
    // Reorder stores in new products according to current storeOrder
    newProducts.forEach(product => {
      // Create a mapping of store names to store objects
      const storeMap = {};
      product.stores.forEach(store => {
        storeMap[store.name] = store;
      });
      
      // Create a new array of stores in the current order
      const reorderedStores = [];
      this.storeOrder.forEach(storeName => {
        if (storeMap[storeName]) {
          reorderedStores.push(storeMap[storeName]);
        }
      });
      
      // Replace the stores array with the reordered one
      product.stores = reorderedStores;
    });
    
    // Render each new product
    newProducts.forEach(product => {
      const productRow = new ProductRow(product);
      productRow.render();
    });
  }

  // Reorder the stores in the product data to match the current storeOrder
  reorderProductStores() {
    this.data.forEach(product => {
      // Create a mapping of store names to store objects
      const storeMap = {};
      product.stores.forEach(store => {
        storeMap[store.name] = store;
      });
      
      // Create a new array of stores in the current order
      const reorderedStores = [];
      this.storeOrder.forEach(storeName => {
        if (storeMap[storeName]) {
          reorderedStores.push(storeMap[storeName]);
        }
      });
      
      // Replace the stores array with the reordered one
      product.stores = reorderedStores;
    });
  }

  // Used when store headers are reordered by drag & drop
  reorderStores(newOrderIds) {
    // Convert store IDs back to store names since that's what our data model uses
    const newOrderNames = [];
    
    // Map store IDs to store names using the store-header elements
    const storeHeaders = document.querySelectorAll('.store-header');
    storeHeaders.forEach(header => {
      const storeId = header.getAttribute('data-store-id');
      const storeName = header.getAttribute('data-store-name');
      
      // Add to our ordered list if it exists in the newOrderIds
      if (newOrderIds.includes(storeId)) {
        newOrderNames.push(storeName);
      }
    });
    
    // Only proceed if we have a valid order
    if (newOrderNames.length === 0 || newOrderNames.length !== this.storeOrder.length) {
      console.error('Invalid store order generated:', newOrderNames);
      return;
    }
    
    // Save the new order
    this.storeOrder = newOrderNames;
    localStorage.setItem('storeOrder', JSON.stringify(newOrderNames));
    
    // Reorder stores in all products
    this.reorderProductStores();
    
    // Clear and re-render the scrollable container
    const scrollableContainer = document.getElementById('scrollable-products-container');
    if (scrollableContainer) {
      scrollableContainer.innerHTML = '';
      
      // Re-render all products' scrollable parts
      this.data.forEach(product => {
        const productRow = new ProductRow(product);
        productRow.renderScrollablePart();
      });
      
      // Reapply filters
      setTimeout(() => {
        this.applyFilters();
      }, 100);
    }
  }
}