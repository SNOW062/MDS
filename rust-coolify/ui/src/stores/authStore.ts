// completed ui_infra_084
import { createStore } from './createStore';
import type { User } from '../types/User';

export interface Team {
  id: number;
  name: string;
  uuid: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  currentTeam: Team | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('md_token');
  const userStr = localStorage.getItem('md_user');
  const teamStr = localStorage.getItem('md_team');

  return {
    user: userStr ? JSON.parse(userStr) : null,
    token: token || null,
    currentTeam: teamStr ? JSON.parse(teamStr) : null,
    isAuthenticated: !!token,
  };
};

const store = createStore<AuthState>(getInitialState());

export const useAuthStore = store.useStore;
export const getAuthState = store.getState;

export const authActions = {
  login: (user: User, token: string, team: Team | null) => {
    localStorage.setItem('md_token', token);
    localStorage.setItem('md_user', JSON.stringify(user));
    if (team) {
      localStorage.setItem('md_team', JSON.stringify(team));
    } else {
      localStorage.removeItem('md_team');
    }

    store.setState({
      user,
      token,
      currentTeam: team,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('md_token');
    localStorage.removeItem('md_user');
    localStorage.removeItem('md_team');

    store.setState({
      user: null,
      token: null,
      currentTeam: null,
      isAuthenticated: false,
    });
  },

  setCurrentTeam: (team: Team) => {
    localStorage.setItem('md_team', JSON.stringify(team));
    store.setState({
      currentTeam: team,
    });
  },
};
