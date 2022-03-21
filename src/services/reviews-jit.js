const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServerPluginInlineTraceDisabled } = require("apollo-server-core");

const { executor } = require("../executor");

const reviews = [{ id: "1", userID: "1", content: "Hello, world!" }];

const typeDefs = gql`
  type Review @key(fields: "id") {
    id: ID!
    user: User
    content: String
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  type Query {
    review(id: ID!): Review
  }
`;

const resolvers = {
  Query: {
    review(root, { id }) {
      return reviews.find(el => el.id === id);
    }
  },
  Review: {
    user({ userID }) {
      return { __typename: "User", id: userID };
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

server.listen(4022).then(({ url }) => {
  console.log(`🚀 Reviews server ready at ${url}`);
});
