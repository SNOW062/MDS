// completed ui_infra_096
import { toastActions } from '../stores/toastStore';

export function useToast() {
  return {
    success: (message: string, duration?: number) => {
      toastActions.addToast(message, 'success', duration);
    },
    error: (message: string, duration?: number) => {
      toastActions.addToast(message, 'error', duration);
    },
    warning: (message: string, duration?: number) => {
      toastActions.addToast(message, 'warning', duration);
    },
    info: (message: string, duration?: number) => {
      toastActions.addToast(message, 'info', duration);
    },
    remove: (id: string) => {
      toastActions.removeToast(id);
    },
    clear: () => {
      toastActions.clearAll();
    }
  };
}
