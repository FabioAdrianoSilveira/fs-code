import Cart from '../models/Cart';
import ShopService from '../services/ShopService';
import ProductService from '../services/ProductService';
import PurchaseService from '../services/PurchaseService';
import SearchService from '../services/SearchService';
import FavoriteService from '../services/FavoriteService';

class CustomerController {
  constructor() {
    this.cart = new Cart();
  }

  async search(keyword) {
    return SearchService.search(keyword);
  }

  async loadShop(shopId, customerId) {
    return ShopService.getById(shopId, customerId);
  }

  async loadShopProducts(shopId) {
    return ProductService.listByShop(shopId);
  }

  async toggleFavorite(customerId, shop, isFavorite) {
    if (isFavorite) {
      await FavoriteService.removeFavorite(customerId, shop.id);
      return false;
    }
    await FavoriteService.addFavorite(customerId, shop.id);
    return true;
  }

  async loadFavorites(customerId) {
    return FavoriteService.listFavorites(customerId);
  }

  addToCart(shopId, product, quantity) {
    this.cart.setShop(shopId);
    this.cart.addItem(product, quantity);
    return this.cart;
  }

  getCart() {
    return this.cart;
  }

  clearCart() {
    this.cart.clear();
  }

  async checkout(customerId) {
    const purchase = await PurchaseService.createPurchase(
      customerId,
      this.cart.shopId,
      this.cart.toRequestItems(),
    );
    this.cart.clear();
    return purchase;
  }

  async loadPurchases(customerId) {
    return PurchaseService.listCustomerPurchases(customerId);
  }

  async cancelPurchase(customerId, purchaseId) {
    return PurchaseService.cancelPurchase(customerId, purchaseId);
  }
}

export default new CustomerController();
