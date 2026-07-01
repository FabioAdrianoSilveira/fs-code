import Cart from '../models/Cart';
import ShopService from '../services/ShopService';
import ProductService from '../services/ProductService';
import PurchaseService from '../services/PurchaseService';

class ShopkeeperController {
  constructor() {
    this.cart = new Cart();
  }

  async loadShop(ownerId) {
    return ShopService.getByOwner(ownerId);
  }

  async updateShop(ownerId, shopData) {
    return ShopService.updateShop(ownerId, shopData);
  }

  async deleteShop(ownerId) {
    await ShopService.deleteShop(ownerId);
  }

  async loadProducts(ownerId) {
    return ProductService.listByOwner(ownerId);
  }

  async createProduct(ownerId, productData) {
    return ProductService.create(ownerId, productData);
  }

  async updateProduct(ownerId, productId, productData) {
    return ProductService.update(ownerId, productId, productData);
  }

  async deleteProduct(ownerId, productId) {
    await ProductService.delete(ownerId, productId);
  }

  async loadSales(ownerId) {
    return PurchaseService.listShopSales(ownerId);
  }

  async confirmSale(ownerId, purchaseId) {
    return PurchaseService.confirmSale(ownerId, purchaseId);
  }
}

export default new ShopkeeperController();
