import React, { useState, useContext } from 'react';
import { useMutation } from 'react-apollo';
import { useToasts } from 'react-toast-notifications';
import UserContext from '../../context/UserContext';
import { signupUserMutation } from '../../queries/queries';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';

const Signup = () => {
  const { addToast } = useToasts();
  const { userData, setUserData } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerUser, { loading }] = useMutation(signupUserMutation, {
    variables: {
      username,
      email,
      password
    },
    onCompleted({ createUser }) {
      addToast('Account created successfully!', {
        appearance: 'success',
        autoDismiss: true
      });
      localStorage.setItem('token', createUser.token);
      setUserData({
        token: createUser.token,
        user: createUser._id
      });
    },
    onError({ graphQLErrors }) {
      addToast(graphQLErrors[0].message, {
        appearance: 'error',
        autoDismiss: true
      });
    }
  });

  const onSubmit = () => {
    if (!username || !email || !password || !confirmPassword) return;
    if (password === confirmPassword) {
      registerUser();
    } else {
      addToast('Please check that your passwords match!', {
        appearance: 'error',
        autoDismiss: true
      });
    }
  };

  return (
    <MainContainer>
      {userData && userData.token && <Redirect to='/' />}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <FormContainer>
          <Title>Note-orious</Title>
          <Input
            placeholder='Username (4 characters minimum)'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder='Password (6 characters minimum)'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder='Confirm Password'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SubmitButton onClick={() => onSubmit()}>Create Account</SubmitButton>
          <Link to='/login' style={linkStyle}>
            Already have an account? Log In
          </Link>
        </FormContainer>
      )}
    </MainContainer>
  );
};

export default Signup;

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
