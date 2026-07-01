import AuthService from '../services/AuthService';

class AuthController {
  async login(email, password) {
    return AuthService.login(email, password);
  }

  async registerShopkeeper(form) {
    return AuthService.registerShopkeeper(form);
  }

  async registerCustomer(form) {
    return AuthService.registerCustomer(form);
  }

  async updateProfile(userId, form) {
    return AuthService.updateUser(userId, form);
  }

  async deleteAccount(userId) {
    await AuthService.deleteUser(userId);
  }

  async getSession() {
    return AuthService.getSession();
  }

  async logout() {
    await AuthService.clearSession();
  }
}

export default new AuthController();
