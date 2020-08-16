import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <>
      <NoteCard time='2s' />
      <NoteCard time='2.3s' />
      <NoteCard time='2.6s' />
      <NoteCard time='3s' />
      <NoteCard time='3.3s' />
    </>
  );
};

const bob = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }

  50% {
    transform: translateY(10px);
    opacity: 0.2;
  }

  100% {
    transform: translateY(0px);
    opacity: 2;
  }
`;

const NoteCard = styled.div`
  width: 80%;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  animation: ${bob} ${(props) => props.time} linear infinite;
`;

export default Loading;
