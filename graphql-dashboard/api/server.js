const express = require('express');
const graphQLHTTP = require('express-graphql');
const { schema } = require('./schema');

const GraphQlPort = 8080;

// Expose a GraphQL endpoint
const graphQLServer = express();
graphQLServer.use('/graphql', graphQLHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

graphQLServer.listen(GraphQlPort, () =>
  console.log(`GraphQL Server is now running on http://localhost:${GraphQlPort}`)
);
