export const ServerLostConnectionEmail = (serverName: string, ip: string) => `
  <h2>CRITICAL: Connection Lost to Server ${serverName}</h2>
  <p>Server IP: ${ip}</p>
  <p>MasterDeploy is unable to reach this node via SSH.</p>
`;
