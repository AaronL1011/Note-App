import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { getUserNotes } from '../../utils/notes';
import styled from 'styled-components';
import NewNoteButton from './NewNoteButton';
import UpdateModal from './UpdateModal';
import Note from './Note';
import Loading from '../Layout/Loading';

const NotesContainer = ({ setModal }) => {
  const { userData } = useContext(UserContext);
  const [notesData, setNotesData] = useState(null);
  const [updateModalContent, setUpdateModalContent] = useState({
    title: '',
    text: '',
    id: null
  });
  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotes = async () => {
      const notes = await getUserNotes(userData.user);

      if (notes) {
        setNotesData(notes.reverse());
        setLoading(false);
      }
    };

    if (userData) {
      getNotes();
    }
  }, [userData]);

  const onNoteClick = (note) => {
    console.log(note);
    setUpdateModalContent({
      title: note.title,
      text: note.text,
      id: note._id
    });
    setModalState(!modalState);
  };

  const displayNotes = () => {
    if (notesData.length > 0) {
      return (
        notesData &&
        notesData
          .reverse()
          .map((note) => (
            <Note
              key={note._id}
              content={note}
              setModal={setModal}
              onClick={(note) => onNoteClick(note)}
            />
          ))
      );
    } else {
      return (
        <TextBox>
          <Text>
            You dont have any notes yet! <br />
            Make a new note to get started!
          </Text>
        </TextBox>
      );
    }
  };

  const handleModalState = () => {
    setModalState(!modalState);
  };

  return (
    <Container>
      {!userData && <Redirect to='/login' />}
      {loading ? (
        <Loading />
      ) : (
        <>
          <UpdateModal
            content={updateModalContent}
            modalOpen={modalState}
            setModal={() => handleModalState()}
          />
          {displayNotes()}
          <NewNoteButton modalOpen={setModal} />
        </>
      )}
    </Container>
  );
};

export default NotesContainer;

const Container = styled.div`
  background: #f4f4f4;
  padding-top: 5px;
  padding-bottom: 70px;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextBox = styled.div`
  padding-top: 10px;
`;

const Text = styled.p`
  color: #555555;
  text-align: center;
`;
