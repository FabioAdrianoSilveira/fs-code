class User {
  constructor(data = {}) {
    this.userId = data.userId || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.role = data.role || null;
    this.shopId = data.shopId || null;
  }

  isShopkeeper() {
    return this.role === 'SHOPKEEPER';
  }

  isCustomer() {
    return this.role === 'CUSTOMER';
  }
}

export default User;
