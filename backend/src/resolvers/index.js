const authResolver = require('./auth');
const noteResolver = require('./note');

const rootResolver = {
  ...authResolver,
  ...noteResolver
};

module.exports = rootResolver;
