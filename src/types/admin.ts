/** Administrator account as exposed to the client — never includes a password. */
export interface AdminUser {
  id: string;
  username: string;
  name: string;
  /** ISO timestamp. */
  createdAt: string;
  /** ISO timestamp, absent until the account's first sign-in. */
  lastLoginAt?: string;
}

/** Response from `POST /api/admin/login`. */
export interface AdminLoginResponse {
  user?: AdminUser;
  message?: string;
}
