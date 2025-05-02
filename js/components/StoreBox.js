/**
 * Store Box Component
 * Renders information about a specific store's pricing
 */
export default class StoreBox {
  constructor(storeData) {
    this.store = storeData;
    this.element = null;
  }

  render() {
    const box = document.createElement('div');
    box.className = 'w-[230px] min-w-[230px] flex-shrink-0 bg-white border border-gray-200 rounded-lg p-0 overflow-hidden mr-2 store-box';
    box.setAttribute('data-store-name', this.store.name);
    
    // Check if this store has no data or price is 0
    const hasNoData = this.store.noData || 
                      this.store.price === "0₺" || 
                      this.store.price === "0€" || 
                      this.store.price === "0$" || 
                      this.store.price === "0" || 
                      this.store.price === "" ||
                      this.store.price === "0₺" ||
                      !this.store.price;
    
    if (hasNoData) {
      box.innerHTML = this._renderNoDataContent();
      box.setAttribute('data-no-data', 'true');
      box.classList.add('no-data-box'); // Sınıf ekleyelim
    } else {
      box.innerHTML = this._renderStoreContent();
      box.setAttribute('data-no-data', 'false');
      box.classList.add('has-data-box'); // Sınıf ekleyelim
    }
    
    this.element = box;
    
    // Add event listeners if needed
    this._addEventListeners();
    
    return this.element;
  }

  _renderNoDataContent() {
    const errorMessage = this.store.errorMessage || 'Fiyat bulunamadı';
    
    return `
      <div class="h-full min-h-32 flex">
        <!-- Left Section - Main Content -->
        <div class="w-[190px] p-2 flex flex-col justify-between">
          <!-- Store name -->
          <div class="text-base text-gray-600">${this.store.name}</div>
          
          <!-- Date with clock icon -->
          <div class="text-xs text-gray-500 flex items-center">
            <i class="fa-regular fa-clock text-blue-500 mr-1"></i>
            <span style="font-size: 6px;">${this.store.date}</span>
          </div>
          
          <!-- No Data Message -->
          <div class="text-center">
            <div class="text-base font-bold text-gray-500"></div>
          </div>
          
          <!-- Error Message -->
          <div class="flex items-center text-xs text-gray-800">
            <i class="fa-solid fa-circle-xmark text-red-500 mr-1"></i>
            <span>${errorMessage}</span>
          </div>
        </div>
        
        <!-- Right Section - Icons Column with different background -->
        <div class="w-[40px] flex flex-col items-center bg-[#f6f6f6]" style="border-left: 1px solid #dbdbdb;">
          <!-- Icons stacked at the top with proper spacing -->
          <div class="flex justify-center items-center pt-2 pb-1 w-full" style="border-bottom: 1px solid #dbdbdb;">
            <i class="fa-solid fa-camera text-blue-500 text-sm"></i>
          </div>
          
          <div class="flex justify-center items-center py-1">
            <i class="fa-solid fa-truck text-blue-500 text-sm"></i>
          </div>
          
          <div class="flex justify-center items-center py-1">
            <i class="fa-solid fa-tag text-blue-500 text-sm"></i>
          </div>
        </div>
      </div>
    `;
  }

  _renderStoreContent() {
    // Determine if this is the lowest price store
    const priceClass = this.store.isLowestPrice ? 'text-green-500' : 'text-gray-800';
    
    // Determine icon for seller
    let sellerIcon = 'fa-solid fa-store';
    
    if (this.store.sellerIcon) {
      sellerIcon = this.store.sellerIcon;
    } else if (this.store.name === this.store.seller) {
      sellerIcon = 'fa-solid fa-store';
    } else if (this.store.seller && this.store.seller.toLowerCase().includes('amazon')) {
      sellerIcon = 'fa-brands fa-amazon';
    } else if (this.store.seller && this.store.seller.toLowerCase().includes('sipariş')) {
      sellerIcon = 'fa-solid fa-globe';
    }
    
    // Build seller info if available
    let sellerInfo = '&nbsp;';
    if (this.store.seller) {
      sellerInfo = `
        <div class="flex items-center text-xs text-gray-800">
          <i class="${sellerIcon} text-blue-500 mr-1"></i>
          <span>${this.store.seller}</span>
        </div>
      `;
    }
    
    // Determine if we have store count or outlet info
    const hasStoreCount = this.store.storeCount && parseInt(this.store.storeCount) > 0;
    const hasOutletInfo = this.store.isOutlet && this.store.isOutlet.trim() !== '';
    
    // Build bottom right section
    let bottomRightSection = '';
    
    if (hasStoreCount) {
      bottomRightSection = `
        <div class="flex flex-col items-center justify-center pb-2 cursor-pointer store-number-container">
          <div class="text-gray-500 font-medium flex items-center">
            <span class="text-[10px] mr-1">${this.store.storeCount}</span>
            <i class="fa-solid fa-chevron-down text-[10px] text-gray-500"></i>
          </div>
        </div>
      `;
    } else if (hasOutletInfo) {
      bottomRightSection = `
        <div class="flex flex-col items-center justify-center pb-2">
          <div class="text-red-500 font-medium text-[10px]">
            ${this.store.isOutlet}
          </div>
        </div>
      `;
    }
    
    return `
      <div class="h-full min-h-32 flex">
        <!-- Left Section - Main Content -->
        <div class="w-[190px] p-2 flex flex-col justify-between">
          <!-- Store name -->
          <div class="text-base text-gray-600">${this.store.name}</div>
          
          <!-- Date with clock icon -->
          <div class="text-xs text-gray-500 flex items-center">
            <i class="fa-regular fa-clock text-blue-500 mr-1"></i>
            <span style="font-size: 6px;">${this.store.date}</span>
          </div>
          
          <!-- Price -->
          <div>
            <div class="text-base font-bold ${priceClass}">${this.store.price}</div>
          </div>
          
          <!-- Seller Info -->
          ${sellerInfo}
        </div>
        
        <!-- Right Section - Icons Column with different background -->
        <div class="w-[40px] flex flex-col items-center justify-between bg-[#f6f6f6]" style="border-left: 1px solid #dbdbdb;">
          <!-- Top section with icons -->
          <div class="w-full flex flex-col items-center">
            <!-- Camera icon at top -->
            <div class="flex justify-center items-center pt-2 pb-1 w-full" style="border-bottom: 1px solid #dbdbdb;">
              <i class="fa-solid fa-camera text-blue-500 text-sm"></i>
            </div>
            
            ${this.store.hasShipping ? `
              <div class="flex justify-center items-center py-1">
                <i class="fa-solid fa-truck text-blue-500 text-sm"></i>
              </div>
            ` : ''}
            
            ${this.store.hasTag ? `
              <div class="flex justify-center items-center py-1">
                <i class="fa-solid fa-tag text-blue-500 text-sm"></i>
              </div>
            ` : ''}
          </div>
          
          <!-- Store count with dropdown at bottom or outlet info -->
          ${bottomRightSection}
        </div>
      </div>
    `;
  }

  _addEventListeners() {
    // Add after elements are rendered
    setTimeout(() => {
      if (this.element && this.store.storeCount) {
        const storeNumberContainer = this.element.querySelector('.store-number-container');
        if (storeNumberContainer) {
          storeNumberContainer.addEventListener('click', () => {
            // Here you could implement dropdown functionality or additional information display
          });
        }
      }
    }, 0);
  }
}