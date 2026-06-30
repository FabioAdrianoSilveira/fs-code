import Product from '../models/Product';
import ApiService from './ApiService';

class ProductService {
  async listByShop(shopId) {
    const data = await ApiService.get(`/shops/${shopId}/products`);
    return data.map((item) => new Product(item));
  }

  async listByOwner(ownerId) {
    const data = await ApiService.get(`/products/owner/${ownerId}`);
    return data.map((item) => new Product(item));
  }

  async create(ownerId, productData) {
    const data = await ApiService.post(
      `/products/owner/${ownerId}`,
      productData,
    );
    return new Product(data);
  }

  async update(ownerId, productId, productData) {
    const data = await ApiService.put(
      `/products/owner/${ownerId}/${productId}`,
      productData,
    );
    return new Product(data);
  }

  async delete(ownerId, productId) {
    await ApiService.delete(`/products/owner/${ownerId}/${productId}`);
  }
}

export default new ProductService();
