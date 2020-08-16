import React, { useState } from 'react';
import NewModal from '../Notes/NewModal';
import NotesContainer from '../Notes/NotesContainer';
import Navbar from './Navbar';

const Home = () => {
  const [modalState, setModalState] = useState(false);

  return (
    <>
      <NewModal
        modalOpen={modalState}
        setModal={() => setModalState(!modalState)}
      />
      <Navbar />
      <NotesContainer setModal={() => setModalState(!modalState)} />
    </>
  );
};

export default Home;
