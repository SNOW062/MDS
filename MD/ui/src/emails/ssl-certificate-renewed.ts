export const SslCertificateRenewedEmail = (domain: string) => `
  <h2>SSL Certificate Renewed for ${domain}</h2>
  <p>Your SSL certificate has been successfully renewed via Let's Encrypt / Traefik.</p>
`;
