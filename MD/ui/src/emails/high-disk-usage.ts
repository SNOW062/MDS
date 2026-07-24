export const HighDiskUsageEmail = (serverName: string, percentage: number) => `
  <h2>WARNING: High Disk Usage on Server ${serverName}</h2>
  <p>Disk Usage Has Reached <strong>${percentage}%</strong></p>
  <p>Please run Docker Prune or clear old logs to prevent server lockup.</p>
`;
