export const API_BASE_URL = 'http://localhost:5120/api';

export const API_ENDPOINTS = {
  products: `${API_BASE_URL}/Product`,
  productById: (id: number | string) => `${API_BASE_URL}/Product/${id}`,
  updateProduct: `${API_BASE_URL}/Product`,
  deleteProduct: (id: number | string) => `${API_BASE_URL}/Product/${id}`,
  updateStock: (id: number | string) => `${API_BASE_URL}/Product/${id}/stock`
};