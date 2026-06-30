import Shop from '../models/Shop';
import ApiService from './ApiService';

class ShopService {
  async getByOwner(ownerId) {
    const data = await ApiService.get(`/shops/owner/${ownerId}`);
    return new Shop(data);
  }

  async getById(shopId, userId) {
    const headers = userId ? { 'X-User-Id': String(userId) } : {};
    const data = await ApiService.get(`/shops/${shopId}`, headers);
    return new Shop(data);
  }

  async updateShop(ownerId, shopData) {
    const data = await ApiService.put(`/shops/owner/${ownerId}`, shopData);
    return new Shop(data);
  }

  async deleteShop(ownerId) {
    await ApiService.delete(`/shops/owner/${ownerId}`);
  }
}

export default new ShopService();
