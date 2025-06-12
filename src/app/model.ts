export interface RawUser {
  userId: number;
  username: string;
  roleId: number;
}

export interface EditUser {
  userId: number;
  username: string;
  password: string;
  roleId: number;
}

export interface User {
  id: number;
  name: string;
  role: 'Admin' | 'Manager' | 'Staff';
  status: 'Active';
}

export interface NewUser{
  username: string;
  password: string;
  roleId: number;
}
