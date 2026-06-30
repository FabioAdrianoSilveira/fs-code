import ApiConfig from '../config/ApiConfig';

class ApiService {
  async request(path, options = {}) {
    const url = `${ApiConfig.BASE_URL}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 204) {
      return null;
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisicao');
    }

    return data;
  }

  get(path, headers) {
    return this.request(path, { method: 'GET', headers });
  }

  post(path, body, headers) {
    return this.request(path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
  }

  put(path, body, headers) {
    return this.request(path, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
    });
  }

  delete(path, headers) {
    return this.request(path, { method: 'DELETE', headers });
  }
}

export default new ApiService();
