import express from 'express';
import bodyParser from 'body-parser';
import expressGraphQL from "express-graphql";
import cors from "cors";
import mongoose from 'mongoose';

import graphQLSchema from './graphql/schema';
import graphQLResolvers from './graphql/resolvers';

require('dotenv').config();

const app = express();

app.use(
    cors(),
    bodyParser.json()
  )
  app.use(
    "/graphql",
    expressGraphQL({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
    })
  );
  function main() {
    const port = process.env.PORT || 5000;
    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017/${process.env.DB_NAME}?authSource=admin`;
        mongoose.connect(uri, { useNewUrlParser: true })
        .then(() => {
            app.listen(port, () => console.log(`Server is listening on port: ${port}`));
          })
          .catch(err => {
            console.log(err);
          })
  }

main();