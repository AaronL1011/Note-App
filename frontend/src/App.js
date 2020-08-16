import React, { useState, useEffect } from 'react';
import { checkLoggedIn } from './utils/auth';
import { ToastProvider } from 'react-toast-notifications';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserContext from './context/UserContext';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './App.css';
import Home from './components/Layout/Home';
import Login from './components/Layout/Login';
import Signup from './components/Layout/Signup';

const client = new ApolloClient({
  uri: 'http://192.168.100.169:3000/graphql'
});

const App = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userLoggedIn = async () => {
      const user = await checkLoggedIn();
      if (user) {
        setUserData({
          user: user._id,
          token: user.token,
          refresh: true
        });
      }
    };

    userLoggedIn();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData
      }}
    >
      <ApolloProvider client={client}>
        <ToastProvider>
          <Router>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/' component={Home} />
          </Router>
        </ToastProvider>
      </ApolloProvider>
    </UserContext.Provider>
  );
};

export default App;
