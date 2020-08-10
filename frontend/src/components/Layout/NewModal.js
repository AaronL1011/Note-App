import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { addNoteMutation, getNotesQuery } from '../../queries/queries';
import styled from 'styled-components';

class NewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      userID: '5f2e435be8c4e7ffd89737b1'
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addNoteMutation({
      variables: {
        title: this.state.title,
        text: this.state.text
      },
      refetchQueries: [{ query: getNotesQuery }]
    });
    this.setState({
      title: '',
      text: ''
    });
    this.props.setModal();
  };

  onCancel = (e) => {
    e.preventDefault();
    this.setState({
      title: '',
      text: ''
    });
    this.props.setModal();
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
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            <TextInput
              placeholder='Your new note here!'
              rows='18'
              value={this.state.text}
              onChange={(e) => this.setState({ text: e.target.value })}
            />
            <PrimaryButton onClick={(e) => this.onSubmit(e)}>
              Create
            </PrimaryButton>
            <SecondaryButton onClick={(e) => this.onCancel(e)}>
              Cancel
            </SecondaryButton>
          </ModalCard>
        </ModalContainer>
      </NoteModal>
    );
  }
}

export default graphql(addNoteMutation, { name: 'addNoteMutation' })(NewModal);

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
