export interface EmailTemplatePayload {
  to: string;
  subject: string;
  appName?: string;
  serverName?: string;
  errorMessage?: string;
  dashboardUrl?: string;
}

export const generateDeploymentFailedEmail = (data: EmailTemplatePayload): string => {
  return `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #0f0f11; color: #ffffff; font-family: sans-serif; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #18181b; padding: 30px; border-radius: 12px; border: 1px solid #27272a;">
          <h2 style="color: #ef4444;">Deployment Failed for ${data.appName || 'Application'}</h2>
          <p style="color: #a1a1aa; font-size: 14px;">The deployment process encountered an error on server <strong>${data.serverName || 'localhost'}</strong>.</p>
          <div style="background: #000; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 12px; color: #f87171;">
            ${data.errorMessage || 'Build process exited with non-zero exit status.'}
          </div>
          <p style="margin-top: 20px;">
            <a href="${data.dashboardUrl || '#'}" style="background: #ea580c; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-size: 12px; font-weight: bold;">View Deployment Logs</a>
          </p>
        </div>
      </body>
    </html>
  `;
};
