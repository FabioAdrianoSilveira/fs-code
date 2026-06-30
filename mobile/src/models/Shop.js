class Shop {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.description = data.description || '';
    this.address = data.address || '';
    this.ownerId = data.ownerId || null;
    this.favorite = data.favorite || false;
  }
}

export default Shop;
