import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import NewModal from './components/Layout/NewModal';
// import UpdateModal from './components/Layout/UpdateModal';
import NotesContainer from './components/Notes/NotesContainer';
import './App.css';

const client = new ApolloClient({
  uri: 'http://192.168.100.169:3000/graphql'
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modalState: false };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <NewModal
          modalOpen={this.state.modalState}
          setModal={() =>
            this.setState({
              modalState: !this.state.modalState
            })
          }
        />
        {/* <UpdateModal
          modalOpen={this.state.updateModalState}
          setModal={() =>
            this.setState({ updateModalState: !this.state.updateModalState })
          }
        /> */}
        <NotesContainer
          setModal={() =>
            this.setState({
              modalState: !this.state.modalState
            })
          }
        />
      </ApolloProvider>
    );
  }
}
