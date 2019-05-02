import { AsyncStorage } from "react-native";

export async function createStatement(statement, client) {
  const userToken = await AsyncStorage.getItem("userToken");
  client
    .request(
      `
      mutation insert_Statements($statement: String!, $email: String!) {
        insert_Statements(objects: { statement: $statement, email: $email }) {
          returning {
            statement
            email
          }
        }
      }
    `,
      {
        statement: statement,
        email: userToken
      }
    )
    .then(data => console.log(data));
}

export async function getStatementsForUser(client) {
  const userToken = await AsyncStorage.getItem("userToken");
  return client.request(
    `
       query ($email:String!){
            Statements(where: {
              email: {
                _eq: $email
              }
            }) {
              id
              statement
              yes
              no
            }
          }
      `,
    {
      email: userToken
    }
  );
}

export async function getStatementsForOthers(client) {
  const userToken = await AsyncStorage.getItem("userToken");
  return client.request(
    `
       query ($email:String!){
            Statements(where: {
              email: {
                _neq: $email
              }
            }) {
              id
              statement
              yes
              no
            }
          }
      `,
    {
      email: userToken
    }
  );
}

export async function getStatements(client) {
  const userToken = await AsyncStorage.getItem("userToken");
  return client.request(
    `
        query {
            Statements {
              id
              statement
              yes
              no
            }
          }`
  );
}

export async function voteNo(client, statementId) {
  client
    .request(
      `
      mutation update_Statements($id: Int!) {
        update_Statements(where: { id: { _eq: $id } }, _inc: { no: 1 }) {
          returning {
            id
            yes
          }
        }
      }
    `,
      { id: statementId }
    )
    .then(data => console.log(data));
}

export async function voteYes(client, statementId) {
  client
    .request(
      `
      mutation update_Statements($id: Int!) {
        update_Statements(where: { id: { _eq: $id } }, _inc: { yes: 1 }) {
          returning {
            id
            yes
          }
        }
      }
    `,
      { id: statementId }
    )
    .then(data => console.log(data));
}
