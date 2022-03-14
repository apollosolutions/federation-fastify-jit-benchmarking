const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server");

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'users',
        url: 'http://localhost:4021/graphql',
      },
      {
        name: 'reviews',
        url: 'http://localhost:4022/graphql',
      },
    ],
  })
});

const server = new ApolloServer({
  gateway,
  subscriptions: false
});

server.listen(4020).then(({ url }) => {
  console.log(`🚀 JIT Gateway ready at ${url}`);
});
