// completed ui_infra_085
import { createStore } from './createStore';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface ToastState {
  toasts: Toast[];
}

const store = createStore<ToastState>({
  toasts: [],
});

export const useToastStore = store.useStore;
export const getToastState = store.getState;

export const toastActions = {
  addToast: (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, message, type, duration };

    store.setState((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (duration > 0) {
      setTimeout(() => {
        toastActions.removeToast(id);
      }, duration);
    }
  },

  removeToast: (id: string) => {
    store.setState((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  
  clearAll: () => {
    store.setState({ toasts: [] });
  }
};
