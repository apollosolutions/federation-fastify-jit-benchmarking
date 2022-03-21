const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServerPluginInlineTraceDisabled } = require("apollo-server-core");

const { executor } = require("../executor");

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

/**
 * Switching executor allows for three different modes based on customizable logic:
 *
 * "Hot Path": Use graphql-jit compiled function
 * "Warm Path": Use pre-parsed query if unable to use graphql-jit
 * "Cold Path": Use normal Apollo Server execution, allowing for reporting and plugin execution
 */

const schema = buildSubgraphSchema([{ typeDefs, resolvers }]);
const server = new ApolloServer({
  schema,
  executor: executor(schema),
  experimental_approximateDocumentStoreMiB: 120, // increase document cache
  plugins: [ApolloServerPluginInlineTraceDisabled()]
});

server.listen(4021).then(({ url }) => {
  console.log(`🚀 Users server ready at ${url}`);
});
