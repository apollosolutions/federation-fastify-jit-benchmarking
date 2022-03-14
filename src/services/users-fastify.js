const { ApolloServer, gql } = require("apollo-server-fastify");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const app = require("fastify")();

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

(async function () {
  await server.start();
  app.register(server.createHandler());
  await app.listen(4011);
  console.log(`🚀 Users server ready at http://localhost:4011`);
})();
