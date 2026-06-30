import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../models/User';
import ApiService from './ApiService';

const STORAGE_KEY = '@foodsaver:user';

class AuthService {
  async registerShopkeeper(data) {
    const response = await ApiService.post('/auth/register/shopkeeper', data);
    const user = new User(response);
    await this.saveSession(user);
    return user;
  }

  async registerCustomer(data) {
    const response = await ApiService.post('/auth/register/customer', data);
    const user = new User(response);
    await this.saveSession(user);
    return user;
  }

  async login(email, password) {
    const response = await ApiService.post('/auth/login', { email, password });
    const user = new User(response);
    await this.saveSession(user);
    return user;
  }

  async updateUser(userId, data) {
    const response = await ApiService.put(`/auth/users/${userId}`, data);
    const stored = await this.getSession();
    const user = new User({
      userId: response.id,
      name: response.name,
      email: response.email,
      role: response.role,
      shopId: stored ? stored.shopId : null,
    });
    await this.saveSession(user);
    return user;
  }

  async deleteUser(userId) {
    await ApiService.delete(`/auth/users/${userId}`);
    await this.clearSession();
  }

  async saveSession(user) {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  async getSession() {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return new User(JSON.parse(raw));
  }

  async clearSession() {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export default new AuthService();
