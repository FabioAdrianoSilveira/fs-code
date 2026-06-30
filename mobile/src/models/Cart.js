class Cart {
  constructor() {
    this.shopId = null;
    this.items = [];
  }

  setShop(shopId) {
    if (this.shopId && this.shopId !== shopId) {
      this.clear();
    }
    this.shopId = shopId;
  }

  addItem(product, quantity) {
    const existing = this.items.find((item) => item.product.id === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  isEmpty() {
    return this.items.length === 0;
  }

  toRequestItems() {
    return this.items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
  }

  clear() {
    this.shopId = null;
    this.items = [];
  }
}

export default Cart;
