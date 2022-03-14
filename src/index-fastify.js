const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-fastify");
const app = require("fastify")();

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'users',
        url: 'http://localhost:4011/graphql',
      },
      {
        name: 'reviews',
        url: 'http://localhost:4012/graphql',
      },
    ],
  })
});

const server = new ApolloServer({
  gateway,
  subscriptions: false
});

(async function () {
  await server.start();
  app.register(server.createHandler());
  await app.listen(4010);
  console.log(`🚀 Fastify gateway ready at http://localhost:4010`);
})();
