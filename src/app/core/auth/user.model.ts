import { Role } from './auth.types';

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
}
