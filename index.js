const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

const schema = require("./schema");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema: schema,
    graphiql: true
  })
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

app.listen(4000);
