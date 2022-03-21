const { ApolloGateway, IntrospectAndCompose } = require("@apollo/gateway");
const { ApolloServer } = require("apollo-server-fastify");
const app = require("fastify")();

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      {
        name: 'users',
        url: 'http://localhost:4031/graphql',
      },
      {
        name: 'reviews',
        url: 'http://localhost:4032/graphql',
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
  await app.listen(4030);
  console.log(`🚀 Fastify-jit gateway ready at http://localhost:4030`);
})();
