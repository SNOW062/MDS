// completed ui_infra_086
import { createStore } from './createStore';

export interface DeploymentProgress {
  uuid: string;
  applicationUuid: string;
  status: 'queued' | 'in_progress' | 'success' | 'failed' | 'cancelled';
  progress: number; // percentage 0-100
  currentStep?: string;
  logs?: string[];
  startedAt?: string;
}

export interface DeployState {
  deployments: Record<string, DeploymentProgress>;
}

const store = createStore<DeployState>({
  deployments: {},
});

export const useDeployStore = store.useStore;
export const getDeployState = store.getState;

export const deployActions = {
  addDeployment: (appUuid: string, deployment: DeploymentProgress) => {
    store.setState((state) => ({
      deployments: {
        ...state.deployments,
        [appUuid]: deployment,
      },
    }));
  },

  updateDeployment: (appUuid: string, updates: Partial<DeploymentProgress>) => {
    store.setState((state) => {
      const existing = state.deployments[appUuid];
      if (!existing) return {};
      return {
        deployments: {
          ...state.deployments,
          [appUuid]: {
            ...existing,
            ...updates,
          },
        },
      };
    });
  },

  appendLogs: (appUuid: string, newLogLine: string) => {
    store.setState((state) => {
      const existing = state.deployments[appUuid];
      if (!existing) return {};
      const logs = existing.logs ? [...existing.logs, newLogLine] : [newLogLine];
      return {
        deployments: {
          ...state.deployments,
          [appUuid]: {
            ...existing,
            logs,
          },
        },
      };
    });
  },

  removeDeployment: (appUuid: string) => {
    store.setState((state) => {
      const newDeployments = { ...state.deployments };
      delete newDeployments[appUuid];
      return { deployments: newDeployments };
    });
  },
};
