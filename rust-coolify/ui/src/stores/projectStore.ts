// completed ui_infra_087
import { createStore } from './createStore';
import type { Project, Environment } from '../types/Project';

export interface ProjectState {
  projects: Project[];
  activeProject: Project | null;
  activeEnvironment: Environment | null;
  isLoading: boolean;
}

const store = createStore<ProjectState>({
  projects: [],
  activeProject: null,
  activeEnvironment: null,
  isLoading: false,
});

export const useProjectStore = store.useStore;
export const getProjectState = store.getState;

export const projectActions = {
  setProjects: (projects: Project[]) => {
    store.setState({ projects });
  },

  setActiveProject: (project: Project | null) => {
    store.setState({
      activeProject: project,
      // Reset active environment if the active project is closed or changed
      activeEnvironment: null,
    });
  },

  setActiveEnvironment: (environment: Environment | null) => {
    store.setState({ activeEnvironment: environment });
  },

  setLoading: (isLoading: boolean) => {
    store.setState({ isLoading });
  },
};
