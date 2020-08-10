import { gql } from 'apollo-boost';

const getNotesQuery = gql`
  {
    notes {
      id
      title
      text
      date
    }
  }
`;

const addNoteMutation = gql`
  mutation($title: String!, $text: String!) {
    addNote(title: $title, text: $text, userID: "5f2e435be8c4e7ffd89737b1") {
      id
      title
      text
      date
    }
  }
`;

const deleteNoteMutation = gql`
  mutation($id: ID!) {
    deleteNote(id: $id) {
      id
    }
  }
`;

export { getNotesQuery, addNoteMutation, deleteNoteMutation };
