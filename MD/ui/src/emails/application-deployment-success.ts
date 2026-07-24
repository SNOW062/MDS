export const ApplicationDeploymentSuccessEmail = (appName: string, url: string) => `
  <h2>Deployment Successful: ${appName}</h2>
  <p>Your application is live at <a href="${url}">${url}</a></p>
`;
