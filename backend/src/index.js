const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.connection.once('open', () => {
  console.log('Connected to db.');
});

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema
    // graphiql: true
  })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
