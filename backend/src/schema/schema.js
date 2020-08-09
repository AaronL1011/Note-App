const graphql = require('graphql');
const _ = require('lodash');
const Note = require('../models/Note');
const User = require('../models/User');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    date: { type: GraphQLString },
    userID: {
      type: GraphQLString
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userID);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    notes: {
      type: GraphQLList(NoteType),
      resolve(parent, args) {
        return Note.find({ userID: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    note: {
      type: NoteType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Note.findById(args.id);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        return Note.find();
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username,
          email: args.email,
          password: args.password
        });
        return user.save();
      }
    },
    addNote: {
      type: NoteType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
        userID: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let note = new Note({
          title: args.title,
          text: args.text,
          userID: args.userID
        });
        return note.save();
      }
    },
    updateNote: {
      type: NoteType,
      args: {
        id: { type: GraphQLID },
        title: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let body = {
          title: args.title,
          text: args.text
        };
        return Note.findByIdAndUpdate(args.id, body, { new: true });
      }
    },
    deleteNote: {
      type: NoteType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Note.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
