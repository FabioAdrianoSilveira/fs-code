import Shop from '../models/Shop';
import ApiService from './ApiService';

class FavoriteService {
  async listFavorites(customerId) {
    const data = await ApiService.get(`/favorites/customer/${customerId}`);
    return data.map((item) => new Shop(item));
  }

  async addFavorite(customerId, shopId) {
    const data = await ApiService.post(
      `/favorites/customer/${customerId}/shop/${shopId}`,
    );
    return new Shop(data);
  }

  async removeFavorite(customerId, shopId) {
    await ApiService.delete(
      `/favorites/customer/${customerId}/shop/${shopId}`,
    );
  }
}

export default new FavoriteService();
