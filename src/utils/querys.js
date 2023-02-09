export const createMailQuery = `
mutation {
  introduceSession(input: {withAddress: true,
                           domainId: "RG9tYWluOjc"}) {
      id,
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
              fromAddr,
              toAddr,
              downloadUrl,
              text,
              headerSubject,
              html,
              receivedAt,
              headerFrom,
              sanitizedHtml
          }
      }
  }
  `;
  return sessionQuery;
}
