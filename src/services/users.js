const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const users = [{ id: "1", username: "@ada" }];

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    username: String
  }

  type Query {
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    user(root, { id }) {
      return users.find(el => el.id === id);
    }
  },
  User: {
    __resolveReference({ id }) {
      return users.find(el => el.id === id);
    }
  }
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

server.listen(4001).then(({ url }) => {
  console.log(`🚀 Users server ready at ${url}`);
});
