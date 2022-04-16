import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"
//  color: ${({ theme }) => theme.text};
const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({theme}) => theme.$text || 'white'};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  }
`;
const Toggle = ({theme,  toggleTheme, mountedComponent}) => {
  //the theme provides the current theme (light or dark)
  //the toggleTheme function will be used to switch between themes
    return (
        <Button onClick={toggleTheme} >
          Switch Theme
        </Button>
    );
};
Toggle.propTypes = { //define our types, ensuring our theme is a string and isRequired
  //while our toggleTheme is func and isRequired
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;