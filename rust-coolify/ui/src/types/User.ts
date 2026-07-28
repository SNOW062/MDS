// completed ui_infra_092
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  two_factor_confirmed_at: string | null;
  force_password_reset: boolean;
  marketing_emails: boolean;
  pending_email: string | null;
  email_change_code: string | null;
  email_change_code_expires_at: string | null;
  created_at: string;
  updated_at: string;
}
