class Product {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || '';
    this.price = data.price || 0;
    this.stock = data.stock || 0;
    this.expirationDate = data.expirationDate || '';
    this.shopId = data.shopId || null;
    this.shopName = data.shopName || '';
  }
}

export default Product;
