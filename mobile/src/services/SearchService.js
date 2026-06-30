import Shop from '../models/Shop';
import Product from '../models/Product';
import ApiService from './ApiService';

class SearchService {
  async search(keyword) {
    const data = await ApiService.get(
      `/search?keyword=${encodeURIComponent(keyword)}`,
    );
    return {
      shops: (data.shops || []).map((item) => new Shop(item)),
      products: (data.products || []).map((item) => new Product(item)),
    };
  }
}

export default new SearchService();
