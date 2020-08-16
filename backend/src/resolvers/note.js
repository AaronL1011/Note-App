const Note = require('../models/Note');

module.exports = {
  notes: (args) => {
    try {
      return Note.find({ userID: args.userID });
    } catch (error) {
      throw error;
    }
  },
  createNote: (args) => {
    try {
      let note = new Note({
        title: args.title,
        text: args.text,
        userID: args.userID
      });
      return note.save();
    } catch (error) {
      throw error;
    }
  },
  updateNote: async (args) => {
    try {
      let body = {
        title: args.title,
        text: args.text,
        date: Date.now()
      };
      const note = await Note.findByIdAndUpdate(args.id, body, { new: true });
      console.log(note);
      return note;
    } catch (error) {
      return error;
    }
  },
  deleteNote: async (args) => {
    try {
      const note = await Note.findById(args.id);

      if (!note) {
        throw new Error('Post not found!');
      }

      if (note.userID === args.userID) {
        return await Note.findByIdAndRemove(args.id);
      } else {
        throw new Error('You are not the author of this post!');
      }
    } catch (error) {
      return error;
    }
  }
};
