const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'users',
        url: 'http://localhost:4001/graphql',
      },
      {
        name: 'reviews',
        url: 'http://localhost:4002/graphql',
      },
    ],
  })
});

const server = new ApolloServer({
  gateway,
  subscriptions: false
});

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Gateway ready at ${url}`);
});
