export const BackupSuccessEmail = (dbName: string, size: string) => `
  <h2>Database Backup Successful: ${dbName}</h2>
  <p>Archive Size: ${size}</p>
`;
