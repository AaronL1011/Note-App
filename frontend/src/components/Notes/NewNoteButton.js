import React, { Component } from 'react';
import styled from 'styled-components';

export default class NewNoteButton extends Component {
  render() {
    return (
      <Button onClick={this.props.modalOpen}>
        <svg
          width='76'
          height='76'
          viewBox='0 0 76 76'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='add_24px'>
            <path
              id='icon/content/add_24px'
              d='M60.1667 41.1667H41.1667V60.1667H34.8333V41.1667H15.8333V34.8333H34.8333V15.8333H41.1667V34.8333H60.1667V41.1667Z'
              fill='#F2F2F2'
            />
          </g>
        </svg>
      </Button>
    );
  }
}

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  right: 20px;
  position: fixed;
  width: 75px;
  height: 75px;
  background: #00b7b7;
  border-radius: 37.5px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  transition: 0.07s ease-in-out;
  &:hover {
    background: #76cbbc;
    transition: 0.07s ease-in-out;
  }
`;
