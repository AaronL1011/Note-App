import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useToasts } from 'react-toast-notifications';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { addToast } = useToasts();
  const { setUserData } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.setItem('token', '');
    setUserData(null);
    addToast('See you next time!', {
      appearance: 'success',
      autoDismiss: true
    });
  };

  return (
    <MenuBar>
      <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='50'
          height='50'
          viewBox='0 0 50 50'
          fill='none'
        >
          <g id='menu_24px'>
            <path
              id='icon/navigation/menu_24px'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6.25 16.6667V12.5H43.75V16.6667H6.25ZM6.25 27.0833H43.75V22.9167H6.25V27.0833ZM6.25 37.5H43.75V33.3333H6.25V37.5Z'
              fill='black'
              fillOpacity='0.54'
            />
          </g>
        </svg>
      </MenuButton>
      <MenuOptions open={menuOpen}>
        <Link to='' style={linkStyle}>
          Account Settings
        </Link>
        <Link to='' style={linkStyle} onClick={() => handleLogout()}>
          Logout
        </Link>
      </MenuOptions>
    </MenuBar>
  );
};

const MenuBar = styled.div`
  background: #f4f4f4;
  width: 100vw;
  min-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MenuButton = styled.button`
  border: none;
  background: none;
  outline: none;
`;

const MenuOptions = styled.div`
  background: #e8e8e8;
  width: 100vw;
  max-height: ${(props) => (props.open ? '100px' : '0px')};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
  transition: all 0.3s ease-out;
  overflow: hidden;
`;

const linkStyle = {
  textDecoration: 'none',
  color: 'black',
  padding: '5px 0 10px 0'
};

export default Navbar;
