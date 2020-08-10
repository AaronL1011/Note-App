import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getNotesQuery } from '../../queries/queries';
import styled from 'styled-components';
import NewNoteButton from '../Layout/NewNoteButton';
import UpdateModal from '../Layout/UpdateModal';
import Note from './Note';

class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateModalContent: {
        title: '',
        text: ''
      },
      modalState: false
    };
  }

  onNoteClick = (note) => {
    this.setState({
      updateModalContent: note,
      modalState: true
    });
  };

  displayNotes = () => {
    return this.props.data.notes ? (
      this.props.data.notes
        .reverse()
        .map((note) => (
          <Note
            key={note.id}
            content={note}
            setModal={this.props.setModal}
            onClick={this.onNoteClick}
          />
        ))
    ) : (
      <div>Loading....</div>
    );
  };

  render() {
    return (
      <Container>
        <UpdateModal
          content={this.state.updateModalContent}
          modalOpen={this.state.modalState}
          setModal={() =>
            this.setState({
              modalState: !this.state.modalState
            })
          }
          onChange={this.setState}
        />
        {this.displayNotes()}
        <NewNoteButton modalOpen={this.props.setModal} />
      </Container>
    );
  }
}

export default graphql(getNotesQuery)(NotesContainer);

const Container = styled.div`
  background: #f4f4f4;
  padding-top: 20px;
  padding-bottom: 70px;
  height: 100%;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
