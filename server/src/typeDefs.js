const { gql } = require("apollo-server");

const typeDefs = gql`
  type Coordinate {
    id: ID!
    name: String
    latitude: Float!
    longitude: Float!
  }
  type Query {
    allCoordinates: [Coordinate]
    getCoordinate(id: ID!): Coordinate
  }
  type Mutation {
    addCoordinate(name: String, latitude: Float!, longitude: Float!): Coordinate!
    editCoordinate(
      id: ID!
      name: String
      latitude: Float!
      longitude: Float!
    ): Int!
  }
`;

module.exports = typeDefs;
