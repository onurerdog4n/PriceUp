/**
 * Product Information Box Component
 * Renders the main product information display
 */
export default class ProductInfoBox {
  constructor(productData) {
    this.product = productData;
    this.element = null;
  }

  render() {
    const box = document.createElement('div');
    box.className = 'w-[300px] min-w-[300px] flex-shrink-0 bg-white border border-gray-200 rounded-lg p-0 overflow-hidden mr-2';
    
    // Format stock display
    const stockDisplay = this.product.stock || 'N/A';
    
    // Use product image or fallback
    const productImage = this.product.screenshot || "https://i0.wp.com/www.pt.com.tr/wp-content/uploads/2024/08/MacBook_Air_UzayGrisi.webp?w=500&quality=80&ssl=1";
    
    box.innerHTML = `
      <div class="flex h-full min-h-32">
        <!-- Left Section (1X) - Fixed width that won't expand -->
        <div class="w-[40px] min-w-[40px] max-w-[40px] flex-none flex flex-col justify-between bg-[#F6F6F6] h-full overflow-hidden">
          <div class="flex justify-center items-center p-2" style="height: 33.33%;">
            <i class="fa-solid fa-camera text-blue-500 text-xl"></i>
          </div>
          <div class="flex flex-col items-center justify-center p-2 border-t border-b" style="height: 33.33%;">
            <div class="text-[9px] text-gray-500">Trend</div>
            <div class="text-blue-500">
              <i class="fa-solid fa-arrow-trend-up text-xl"></i>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center p-2" style="height: 33.33%;">
            <div class="text-[9px] text-gray-500">Stock</div>
            <div class="text-xs font-bold text-gray-700 truncate w-full text-center max-w-[40px]">${stockDisplay}</div>
          </div>
        </div>
        
        <!-- Middle Section (4X) - Divided into upper and lower parts -->
        <div class="w-[160px] flex flex-col h-full" style="border-left: 1px solid #e5e7eb;">
          <!-- Upper part for product name - Exactly aligned with trend section -->
          <div style="height: 66.67%; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #e5e7eb; padding: 4px 8px;">
            <div style="font-size: 9px; line-height: 1rem; color: #707070; text-align: center;">${this.product.name}</div>
          </div>
          
          <!-- Lower part divided into two columns -->
          <div class="flex" style="height: 33.33%; background-color: #F6F6F6;">
            <!-- Left brand column -->
            <div class="w-1/2 flex items-center justify-start border-r" style="padding: 8px;">
              <div class="text-xs text-gray-500">${this.product.brand}</div>
            </div>
            
            <!-- Right model column -->
            <div class="w-1/2 flex items-center justify-end" style="padding: 8px;">
              <div style="font-size: 9px; line-height: 1rem; color: #707070; text-align: center;">${this.product.sku}</div>
            </div>
          </div>
        </div>
        
        <!-- Right Section (3X) - Divided into upper and lower parts -->
        <div class="w-[100px] flex flex-col h-full" style="border-left: 1px solid #e5e7eb;">
          <!-- Upper part for product image -->
          <div style="height: 66.67%; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #e5e7eb; padding: 4px;">
            <img src="${productImage}" alt="Product" class="h-16 w-auto object-contain">
          </div>
          
          <!-- Lower part for price and date -->
          <div style="height: 33.33%; background-color: #F6F6F6; padding: 4px 8px; display: flex; flex-direction: column; justify-content: center;">
            <div class="text-center font-bold" style="font-size: 12px; color: #191919;">${this.product.web_price || this.product.price}</div>
            <div class="text-gray-500 text-center flex items-center justify-center">
              <i class="fa-regular fa-clock text-blue-500 mr-1" style="font-size: 6px;"></i>
              <span style="font-size: 6px;">${this.product.date}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    this.element = box;
    return this.element;
  }
}
