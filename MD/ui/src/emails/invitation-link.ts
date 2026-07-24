export const InvitationLinkEmail = (teamName: string, inviteUrl: string) => `
  <h2>You are invited to join team: ${teamName}</h2>
  <p>Click the link below to accept your invitation:</p>
  <p><a href="${inviteUrl}">${inviteUrl}</a></p>
`;
