import { environment } from "../environment";

export const API_ENDPOINTS = {
  products: `${environment.apiUrl}/Product`,
  productById: (id: number | string) => `${environment.apiUrl}/Product/${id}`,
  updateProduct: `${environment.apiUrl}/Product`,
  deleteProduct: (id: number | string) => `${environment.apiUrl}/Product/${id}`,
  updateStock: (id: number | string) => `${environment.apiUrl}/Product/${id}/stock`,
  userLogin: `${environment.apiUrl}/Auth/login`,
  userRegister: `${environment.apiUrl}/Auth/signup`,
  users: `${environment.apiUrl}/User`,
  userById: (id: number | string) => `${environment.apiUrl}/User/${id}`,
  updateUser: (id: number | string) => `${environment.apiUrl}/User/${id}`,  
  createUser: `${environment.apiUrl}/User`,
  deleteUser: (id: number | string) => `${environment.apiUrl}/User/${id}`,
  activityLogs: `${environment.apiUrl}/ActivityLog`,
  getOrders: `${environment.apiUrl}/Order`,
  orderById: (id: number | string) => `${environment.apiUrl}/Order/${id}`,
  createOrder: `${environment.apiUrl}/Order`,
  getRecentOrders: `${environment.apiUrl}/Order/getRecentOrders`,
  updateOrderStatus: (id: number | string) => `${environment.apiUrl}/Order/${id}/status`,
  getCurrentUser: `${environment.apiUrl}/User/getCurrentUser`,
};