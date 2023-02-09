// export const createMailQuery = `
// mutation {
//   introduceSession {
//       id,
//       expiresAt,
//       addresses {
//         address
//       }
//   }
// }
// `;
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
              rawSize,
              fromAddr,
              toAddr,
              downloadUrl,
              text,
              headerSubject,
              html
          }
      }
  }
  `;
  return sessionQuery;
}
