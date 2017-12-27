const { makeExecutableSchema } = require("graphql-tools");
const { getTeamById, getTeamRoster } = require("./data");

const typeDefs = `
type Team {
  roster: [Player]
}

type Player {
  id: String!
  name: String!
  number: String
  position: String
  height: String
  weight: String
  birth: String
  age: Int
  years: String
  school: String
}

type Query {
  team(id: String!): Team
}

schema {
  query: Query
}
`;

const resolvers = {
  Query: {
    team: (obj, { id }) => getTeamById(id)
  },
  Team: {
    roster: team => getTeamRoster(team.id)
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
