/**
 * SKU Lowest Box Component
 * Renders information about the lowest price for a SKU
 */
export default class SkuLowestBox {
  constructor(skuData) {
    this.skuData = skuData;
    this.element = null;
  }

  render() {
    const box = document.createElement('div');
    box.className = 'w-[230px] min-w-[230px] flex-shrink-0 bg-white border border-gray-200 rounded-lg p-0 overflow-hidden mr-2';
    
    // Determine color and icon based on trend
    let trendColor = 'text-gray-500';
    let trendIcon = 'fa-minus';
    
    if (this.skuData.trend === 'up') {
      trendColor = 'text-green-500';
      trendIcon = 'fa-arrow-up';
    } else if (this.skuData.trend === 'down') {
      trendColor = 'text-red-500';
      trendIcon = 'fa-arrow-down';
    } else if (this.skuData.trend === 'best') {
      trendColor = 'text-blue-500';
      trendIcon = 'fa-trophy';
    }
    
    // Determine if we need to hide seller info
    const showSeller = !(this.skuData.seller === 'Raysonel' && this.skuData.store === 'Trendyol');
    const sellerDisplay = showSeller ? `
      <div class="flex items-center text-gray-600 text-xs mt-1">
        <i class="fa-solid fa-medal text-blue-500 mr-2"></i>
        <span>${this.skuData.seller}</span>
      </div>
    ` : `
      <div class="flex items-center text-gray-600 text-xs mt-1" style="visibility: hidden;">
        <i class="fa-solid fa-medal text-blue-500 mr-2"></i>
        <span>&nbsp;</span>
      </div>
    `;
    
    box.innerHTML = `
      <div class="h-full min-h-32 flex">
        <!-- Left Section - Main Content -->
        <div class="w-[190px] p-2 flex flex-col justify-between">
          <!-- Store name -->
          <div class="text-base text-gray-600">${this.skuData.store}</div>
          
          <!-- Date with clock icon -->
          <div class="text-xs text-gray-500 flex items-center">
            <i class="fa-regular fa-clock text-blue-500 mr-1"></i>
            <span style="font-size: 6px;">${this.skuData.date}</span>
          </div>
          
          <!-- Price and Performance -->
          <div class="text-center mt-2">
            <div class="text-2xl font-bold ${trendColor}">${this.skuData.price}</div>
            <div class="flex items-center justify-center ${trendColor} text-sm">
              <div>Performans</div>
              <div class="mx-1">${this.skuData.performance}</div>
              <i class="fa-solid ${trendIcon}"></i>
            </div>
          </div>
          
          <!-- Seller with medal icon -->
          ${sellerDisplay}
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
    
    this.element = box;
    return this.element;
  }
}
