// completed ui_infra_073
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/Layout';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import TwoFactorPage from '../pages/auth/TwoFactorPage';
import OnboardingPage from '../pages/OnboardingPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import ProjectDetailPage from '../pages/projects/ProjectDetailPage';
import EnvironmentDetailPage from '../pages/projects/EnvironmentDetailPage';
import ApplicationDetailPage from '../pages/projects/ApplicationDetailPage';
import ServersPage from '../pages/servers/ServersPage';
import ServerDetailPage from '../pages/servers/ServerDetailPage';
import ServerConfigurePage from '../pages/servers/ServerConfigurePage';
import DatabasesPage from '../pages/databases/DatabasesPage';
import DatabaseDetailPage from '../pages/databases/DatabaseDetailPage';
import ServicesPage from '../pages/services/ServicesPage';
import ServiceDetailPage from '../pages/services/ServiceDetailPage';
import TeamsPage from '../pages/teams/TeamsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import StoragePage from '../pages/storage/StoragePage';
import SecurityPage from '../pages/security/SecurityPage';
import ApiTokensPage from '../pages/security/ApiTokensPage';
import SshKeysPage from '../pages/security/SshKeysPage';
import AppGeneralPage from '../pages/application/AppGeneralPage';
import AppEnvVarsPage from '../pages/application/AppEnvVarsPage';
import AppAdvancedPage from '../pages/application/AppAdvancedPage';
import AppDeploymentsPage from '../pages/application/AppDeploymentsPage';
import DeploymentLogPage from '../pages/application/DeploymentLogPage';
import AppLogsPage from '../pages/application/AppLogsPage';
import AppRollbackPage from '../pages/application/AppRollbackPage';
import AppPreviewsPage from '../pages/application/AppPreviewsPage';
import DbConfigPage from '../pages/database/DbConfigPage';
import DbBackupsPage from '../pages/database/DbBackupsPage';
import DbLogsPage from '../pages/database/DbLogsPage';
import CreateServerPage from '../pages/server/CreateServerPage';
import ServerProxyPage from '../pages/server/ServerProxyPage';
import ServerChartsPage from '../pages/server/ServerChartsPage';
import TerminalPage from '../pages/server/TerminalPage';
import ServerSecurityPage from '../pages/server/ServerSecurityPage';
import ServerResourcesPage from '../pages/server/ServerResourcesPage';
import ServerLogDrainsPage from '../pages/server/ServerLogDrainsPage';
import ServerPrivateKeyPage from '../pages/server/ServerPrivateKeyPage';
import ServerCaCertificatePage from '../pages/server/ServerCaCertificatePage';
import NotificationsPage from '../pages/notifications/NotificationsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import AdminPage from '../pages/admin/AdminPage';
import SourcesPage from '../pages/sources/SourcesPage';

// Protected layout wrapper (Coolify: token/istifadəçi yoxdursa ilk dəfə /register-ə yönləndirilir)
const AppLayout = () => {
  const token = localStorage.getItem('md_token');
  if (!token) {
    return <Navigate to="/register" replace />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const router = createBrowserRouter([
  // Auth routes
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/two-factor', element: <TwoFactorPage /> },
  
  // Onboarding
  { path: '/onboarding', element: <OnboardingPage /> },

  // App workspace routes (wrapped in layout)
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      
      // Projects & environments
      { path: '/projects', element: <ProjectsPage /> },
      { path: '/project/:uuid', element: <ProjectDetailPage /> },
      { path: '/projects/:uuid/:env_uuid', element: <EnvironmentDetailPage /> },
      { path: '/projects/:uuid/:env_uuid/app/:app_uuid', element: <ApplicationDetailPage /> },
      
      // Nested Application settings
      { path: '/projects/:uuid/:env_uuid/app/:app_uuid/general', element: <AppGeneralPage /> },
      { path: '/projects/:uuid/:env_uuid/app/:app_uuid/envs', element: <AppEnvVarsPage /> },
      { path: '/projects/:uuid/:env_uuid/app/:app_uuid/advanced', element: <AppAdvancedPage /> },
      { path: '/projects/:uuid/:env_uuid/app/:app_uuid/deployments', element: <AppDeploymentsPage /> },
      { path: '/projects/:uuid/:env_uuid/app/:app_uuid/deployment/:deploy_uuid', element: <DeploymentLogPage /> },
      { path: '/projects/:uuid/:env_uuid/app/:app_uuid/logs', element: <AppLogsPage /> },
      { path: '/projects/:uuid/:env_uuid/app/:app_uuid/rollback', element: <AppRollbackPage /> },
      { path: '/projects/:uuid/:env_uuid/app/:app_uuid/previews', element: <AppPreviewsPage /> },

      // Nested Databases settings
      { path: '/projects/:uuid/:env_uuid/db/:db_uuid/configuration', element: <DbConfigPage /> },
      { path: '/projects/:uuid/:env_uuid/db/:db_uuid/backups', element: <DbBackupsPage /> },
      { path: '/projects/:uuid/:env_uuid/db/:db_uuid/logs', element: <DbLogsPage /> },
      
      // Service stack
      { path: '/projects/:uuid/:env_uuid/service/:s_uuid', element: <ServiceDetailPage /> },

      // Servers
      { path: '/servers', element: <ServersPage /> },
      { path: '/servers/new', element: <CreateServerPage /> },
      { path: '/server/:uuid', element: <ServerDetailPage /> },
      { path: '/server/:uuid/configure', element: <ServerConfigurePage /> },
      { path: '/server/:uuid/proxy', element: <ServerProxyPage /> },
      { path: '/server/:uuid/terminal', element: <TerminalPage /> },
      { path: '/server/:uuid/charts', element: <ServerChartsPage /> },
      { path: '/server/:uuid/security', element: <ServerSecurityPage /> },
      { path: '/server/:uuid/resources', element: <ServerResourcesPage /> },
      { path: '/server/:uuid/private-key', element: <ServerPrivateKeyPage /> },
      { path: '/server/:uuid/ca-certificate', element: <ServerCaCertificatePage /> },
      { path: '/server/:uuid/log-drains', element: <ServerLogDrainsPage /> },

      // Databases general
      { path: '/databases', element: <DatabasesPage /> },
      { path: '/database/:db_uuid', element: <DatabaseDetailPage /> },

      // Services general
      { path: '/services', element: <ServicesPage /> },

      // Security (SSH Keys / API tokens)
      {
        path: '/security',
        element: <SecurityPage />,
        children: [
          { path: 'api-tokens', element: <ApiTokensPage /> },
          { path: 'private-keys', element: <SshKeysPage /> }
        ]
      },

      // Other routes
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/settings', element: <SettingsPage /> },
      { path: '/storages', element: <StoragePage /> },
      { path: '/team', element: <TeamsPage /> },
      { path: '/profile', element: <ProfilePage /> },
      { path: '/admin', element: <AdminPage /> },
      { path: '/sources', element: <SourcesPage /> }
    ]
  },

  // Fallback redirect to dashboard
  { path: '*', element: <Navigate to="/" replace /> }
]);
