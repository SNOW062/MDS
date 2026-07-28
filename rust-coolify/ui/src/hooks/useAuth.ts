// completed ui_infra_094
import { useAuthStore, authActions } from '../stores/authStore';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const currentTeam = useAuthStore((state) => state.currentTeam);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return {
    user,
    token,
    currentTeam,
    isAuthenticated,
    login: authActions.login,
    logout: authActions.logout,
    setCurrentTeam: authActions.setCurrentTeam,
  };
}
