import { buildSchema } from 'graphql';

export default buildSchema(`

type User {
  _id: ID!
  username: String!
  name: String!
  contactno: String!
  site: String!
  email: String!
  userlevel: String!
  accountstatus: String!
  updatedBy: String!
  dateUpdated: String!
  token: String!
}

input UserInput {
  username: String!
  password: String!
  confirm: String!
  name: String!
  contactno: String!
  site: String!
  email: String!
  userlevel: String!
  accountstatus: String!
  updatedBy: String!
  dateUpdated: String!
}

type RootQuery {
  login(username: String!, password: String!): User
  verifyToken(token: String!): User
}

type RootMutation {
  createUser(userInput: UserInput): User
}

schema {
  query: RootQuery
  mutation: RootMutation
}

`)