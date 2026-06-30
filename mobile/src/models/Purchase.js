class Purchase {
  constructor(data = {}) {
    this.id = data.id || null;
    this.shopId = data.shopId || null;
    this.shopName = data.shopName || '';
    this.customerId = data.customerId || null;
    this.customerName = data.customerName || '';
    this.totalAmount = data.totalAmount || 0;
    this.status = data.status || 'PENDING';
    this.createdAt = data.createdAt || '';
    this.items = data.items || [];
  }

  canCancel() {
    return this.status !== 'PICKED_UP' && this.status !== 'CANCELLED';
  }
}

export default Purchase;
