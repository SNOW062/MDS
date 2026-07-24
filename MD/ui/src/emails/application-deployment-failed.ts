export const ApplicationDeploymentFailedEmail = (appName: string, serverName: string, error: string) => `
  <h2>Deployment Failed: ${appName}</h2>
  <p>Server: ${serverName}</p>
  <pre>${error}</pre>
`;
