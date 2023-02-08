export const createMailQuery = `
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

export function sessionQuery(sessionId) {
  const sessionQuery = `
  query {
      session(id: "${sessionId}") {
          mails{
              rawSize,
              fromAddr,
              toAddr,
              downloadUrl,
              text,
              headerSubject
          }
      }
  }
  `;
  return sessionQuery;
}

