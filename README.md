# Federation Performance Benchmarking with Fastify and GraphQL JIT

**The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.**


------

This project presents four different Apollo Federation configurations:

1. Apollo Server with no optimizations (uses Express under the hood)
2. Apollo Server with the [Fastify integration](https://www.npmjs.com/package/apollo-server-fastify)
3. Apollo Server with [GraphQL JIT](https://github.com/zalando-incubator/graphql-jit) to compile queries
4. Apollo Server with Fastify and GraphQL JIT

These server configurations are then tested with three different queries (located in `benchmarking/artillery.yml`) for a total of 12 different candidates.

## Installation

Run the following command to install dependencies:

```sh
npm i
```

The tests are running using [npx](https://www.npmjs.com/package/npx) to trigger the [artillery](https://www.artillery.io/docs/) CLI.

## Usage & Rationale

Start the four different gateways with their implementing services:

```sh
npm run basic
npm run with-fastify
npm run with-jit
npm run with-fastify-and-jit
```

Then `cd` into the `benchmarking` directory and start up the tests:

```sh
./bench.sh
```

Go get a coffee and wait for the benchmarking tool to finish running. It should take about 7 minutes based on the current timings. When complete, the output will be available for each run in a `*.html` file that you can view locally.

After a run is complete, and you have inspected the results, you can run the `./cleanup.sh` script to remove the reports from the last run before you run another.
