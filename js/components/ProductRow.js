/**
 * Product Row Component
 * Container for all boxes in a single product row
 */
import ProductInfoBox from './ProductInfoBox.js';
import SkuLowestBox from './SkuLowestBox.js';
import StoreBox from './StoreBox.js';

export default class ProductRow {
  constructor(productData) {
    this.product = productData;
    this.fixedElement = null;
    this.scrollableElement = null;
  }

  render() {
    // This method now returns no element, but sets up the fixed and scrollable parts
    this.renderFixedPart();
    this.renderScrollablePart();
  }

  renderFixedPart() {
    // Check if this product already exists in the fixed container
    const existingFixedRow = document.querySelector(`#fixed-products-container [data-product-id="${this.product.id}"]`);
    if (existingFixedRow) {
      return;
    }
    
    const fixedRow = document.createElement('div');
    fixedRow.className = 'flex mb-1';
    fixedRow.dataset.productId = this.product.id;
    
    // Add product info box
    const productInfoBox = new ProductInfoBox(this.product);
    fixedRow.appendChild(productInfoBox.render());
    
    // Add SKU lowest box
    const skuLowestBox = new SkuLowestBox(this.product.skuLowest);
    fixedRow.appendChild(skuLowestBox.render());
    
    this.fixedElement = fixedRow;
    
    // Add to the fixed container
    const fixedContainer = document.getElementById('fixed-products-container');
    if (fixedContainer) {
      fixedContainer.appendChild(fixedRow);
    }
  }

  renderScrollablePart() {
    // Remove existing scrollable row for this product if it exists
    const existingScrollableRow = document.querySelector(`#scrollable-products-container [data-product-id="${this.product.id}"]`);
    if (existingScrollableRow) {
      existingScrollableRow.remove();
    }
    
    const scrollableRow = document.createElement('div');
    scrollableRow.className = 'flex mb-1';
    scrollableRow.dataset.productId = this.product.id;
    
    // Add store boxes
    this.product.stores.forEach(store => {
      const storeBox = new StoreBox(store);
      const storeElement = storeBox.render();
      
      // Add data attribute for store name to enable proper sorting
      storeElement.setAttribute('data-store-name', store.name);
      storeElement.classList.add('store-box'); // Add class for drag handle
      
      scrollableRow.appendChild(storeElement);
    });
    
    this.scrollableElement = scrollableRow;
    
    // Add to the scrollable container
    const scrollableContainer = document.getElementById('scrollable-products-container');
    if (scrollableContainer) {
      scrollableContainer.appendChild(scrollableRow);
    }
  }
}
