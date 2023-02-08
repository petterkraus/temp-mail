export const mutation = `
mutation {
  introduceSession {
      id,
      expiresAt,
      addresses {
        address
      }
  }
}
`;

