export const BackupFailedEmail = (dbName: string, error: string) => `
  <h2>Database Backup Failed: ${dbName}</h2>
  <p>Error details:</p>
  <pre>${error}</pre>
`;
