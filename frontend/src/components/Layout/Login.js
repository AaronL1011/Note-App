import React, { useState, useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import UserContext from '../../context/UserContext';
import { useMutation } from 'react-apollo';
import { loginUserMutation } from '../../queries/queries';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { addToast } = useToasts();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading }] = useMutation(loginUserMutation, {
    variables: {
      email,
      password
    },
    onCompleted({ loginUser }) {
      addToast('You have successfully logged in!', {
        appearance: 'success',
        autoDismiss: true
      });
      localStorage.setItem('token', loginUser.token);
      setUserData({
        token: loginUser.token,
        user: loginUser._id
      });
    },
    onError({ graphQLErrors }) {
      addToast(graphQLErrors[0].message, {
        appearance: 'error',
        autoDismiss: true
      });
    }
  });

  const onSubmit = async () => {
    if (!email || !password) return;
    loginUser();
  };

  return (
    <MainContainer>
      {userData && userData.user && <Redirect to='/' />}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <FormContainer>
          <Title>Note-orious</Title>
          <Input
            placeholder='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton onClick={() => onSubmit()}>Login</SubmitButton>
          <Link to='/signup' style={linkStyle}>
            Create an Account
          </Link>
        </FormContainer>
      )}
    </MainContainer>
  );
};

export default Login;

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center:
`;

const Title = styled.h2`
  font-family: Open Sans;
  text-align: center;
`;

const Input = styled.input`
  height: 30px;

  background: #ffffff;
  box-shadow: inset 0px 0px 7px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  border: none;
  padding-left: 10px;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 30px;

  background: #00b7b7;
  border-radius: 2px;
  color: white;
  border: none;
  margin-bottom: 10px;
`;

const linkStyle = {
  textAlign: 'center',
  textDecoration: 'none',
  color: '#555555',
  fontSize: 'small'
};
