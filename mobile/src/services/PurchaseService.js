import Purchase from '../models/Purchase';
import ApiService from './ApiService';

class PurchaseService {
  async createPurchase(customerId, shopId, items) {
    const data = await ApiService.post(`/purchases/customer/${customerId}`, {
      shopId,
      items,
    });
    return new Purchase(data);
  }

  async listCustomerPurchases(customerId) {
    const data = await ApiService.get(`/purchases/customer/${customerId}`);
    return data.map((item) => new Purchase(item));
  }

  async cancelPurchase(customerId, purchaseId) {
    const data = await ApiService.put(
      `/purchases/customer/${customerId}/${purchaseId}/cancel`,
    );
    return new Purchase(data);
  }

  async listShopSales(ownerId) {
    const data = await ApiService.get(`/sales/owner/${ownerId}`);
    return data.map((item) => new Purchase(item));
  }

  async confirmSale(ownerId, purchaseId) {
    const data = await ApiService.put(
      `/sales/owner/${ownerId}/${purchaseId}/confirm`,
    );
    return new Purchase(data);
  }
}

export default new PurchaseService();
