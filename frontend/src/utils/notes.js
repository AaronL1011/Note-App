import axios from 'axios';

const apiUrl = 'http://192.168.100.169:3000/graphql';

export const getUserNotes = async (userID) => {
  const requestBody = {
    query: `
      {
        notes(userID: "${userID}") {
          _id
          title
          text
          date
        }
      }
    `
  };
  const notesResponse = await axios.post(apiUrl, requestBody, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (notesResponse.data.data.notes !== null) {
    return notesResponse.data.data.notes;
  }

  if (notesResponse.data.errors.message) {
    return notesResponse.data.errors.message;
  }

  return null;
};

export const createNote = async (data) => {
  const requestBody = {
    query: `
      mutation {
        createNote(title: "${data.title}", text: "${data.text}", userID: "${data.userID}") {
          _id
          title
          text
          date
        }
      }
    `
  };
  const noteResponse = await axios.post(apiUrl, requestBody, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (noteResponse.data.data.createNote !== null) {
    return noteResponse.data.data.createNote;
  }

  if (noteResponse.data.errors.message) {
    return noteResponse.data.errors.message;
  }

  return null;
};

export const updateNote = async (data) => {
  const requestBody = {
    query: `
      mutation {
        updateNote(title: "${data.title}", text: "${data.text}", id: "${data.id}") {
          _id
          title
          text
          date
        }
      }
    `
  };
  const noteResponse = await axios.post(apiUrl, requestBody, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (noteResponse.data.data.updateNote !== null) {
    return noteResponse.data.data.updateNote;
  }

  if (noteResponse.data.errors[0].message) {
    return noteResponse.data.errors[0].message;
  }

  return null;
};

export const deleteNote = async (data) => {
  const requestBody = {
    query: `
      mutation {
        deleteNote(id: "${data.id}", userID: "${data.userID}") {
          _id
          title
          text
          date
        }
      }
    `
  };
  const noteResponse = await axios.post(apiUrl, requestBody, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (noteResponse.data.data.deleteNote !== null) {
    return noteResponse.data.data.deleteNote;
  }

  if (noteResponse.data.errors[0].message) {
    return noteResponse.data.errors[0].message;
  }

  return null;
};
