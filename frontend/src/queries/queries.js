import { gql } from 'apollo-boost';

const getNotesQuery = gql`
  query($user: ID) {
    notes(userID: $user) {
      _id
      title
      text
      date
    }
  }
`;

const createNoteMutation = gql`
  mutation($title: String!, $text: String!) {
    createNote(title: $title, text: $text, userID: "5f2e435be8c4e7ffd89737b1") {
      _id
      title
      text
      date
    }
  }
`;

const deleteNoteMutation = gql`
  mutation($id: ID!) {
    deleteNote(id: $id) {
      _id
    }
  }
`;

const updateNoteMutation = gql`
  mutation($title: String!, $text: String!, $id: ID) {
    updateNote(title: $title, text: $text, id: $id) {
      _id
      title
      text
      date
    }
  }
`;

const loginUserMutation = gql`
  mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      token
    }
  }
`;

const signupUserMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      token
    }
  }
`;

export {
  getNotesQuery,
  createNoteMutation,
  deleteNoteMutation,
  updateNoteMutation,
  loginUserMutation,
  signupUserMutation
};
