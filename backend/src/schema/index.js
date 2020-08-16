const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Note {
    _id: ID!
    title: String!
    text: String!
    userID: ID
    date: String!
  }

  type AuthUser {
    _id: ID!
    token: String
  }

  type RootQuery {
    notes(userID: ID): [Note]!
  }

  type RootMutation {
    createNote(title: String, text: String, userID: ID): Note
    updateNote(title: String, text: String, id: ID): Note
    deleteNote(id: ID, userID: ID): Note
    loginUser(email: String, password: String): AuthUser
    createUser(username: String, email: String, password: String): AuthUser
    getTokenUser(token: String): AuthUser
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
