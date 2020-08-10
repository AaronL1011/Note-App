import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getNotesQuery, deleteNoteMutation } from '../../queries/queries';
import styled from 'styled-components';

class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalState: false };
  }

  onDelete = (e, id) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this note?')) {
      this.props.deleteNoteMutation({
        variables: {
          id: id
        },
        refetchQueries: [{ query: getNotesQuery }]
      });

      this.setState({
        title: '',
        text: ''
      });
      this.props.setModal();
    }
  };

  render() {
    return (
      <NoteModal
        type={'new'}
        open={this.props.modalOpen}
        onClick={this.props.setModal}
      >
        <ModalContainer>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <TitleInput
              placeholder='Title'
              value={this.props.content.title || ''}
              onChange={console.log('yes')}
            />
            <TextInput
              placeholder='Your new note here!'
              rows='18'
              value={this.props.content.text || ''}
            />
            <PrimaryButton onClick={this.props.setModal}>Confirm</PrimaryButton>
            <SecondaryButton
              onClick={(e) => this.onDelete(e, this.props.content.id)}
            >
              Delete
            </SecondaryButton>
          </ModalCard>
        </ModalContainer>
      </NoteModal>
    );
  }
}

export default graphql(deleteNoteMutation, { name: 'deleteNoteMutation' })(
  UpdateModal
);

const NoteModal = styled.div`
  position: fixed;
  display: ${(props) => (props.open ? true : 'none')};
  height: 100vh;
  width: 100vw;
  transition: 0.1s ease;
  z-index: 2;
`;

const ModalContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.1s ease;
`;

const ModalCard = styled.div`
  width: 100%;
  height: 55%;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const TitleInput = styled.input`
  background: #ffffff;
  box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  border: none;
  padding: 10px 15px 10px 15px;
  width: 80%;
  margin: 10px 0px 20px 0px;
`;
const TextInput = styled.textarea`
  background: #ffffff;
  box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  border: none;
  padding: 10px 15px 10px 15px;
  font-family: Open Sans;
  font-size: 12px;
  width: 80%;
`;

const PrimaryButton = styled.button`
  width: 50vw;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 55px;
  border: 3px solid #98e2d5;
  background: #fff;
  border-radius: 0 0 0px 10px;
  font-size: 24px;
  color: #98e2d5;
`;
const SecondaryButton = styled.button`
  width: 50vw;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 55px;
  border: 3px solid #ff9e9e;
  background: #fff;
  border-radius: 0 0 10px 0px;
  font-size: 24px;
  color: #ff9e9e;
`;
