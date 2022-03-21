const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServerPluginInlineTraceDisabled } = require("apollo-server-core");

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

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  plugins: [ApolloServerPluginInlineTraceDisabled()]
});

server.listen(4002).then(({ url }) => {
  console.log(`🚀 Reviews server ready at ${url}`);
});
