import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  `
/*
We've imported createGlobalStyle from styled-components.
The createGlobalStyle method replaces the now deprecated injectGlobal method from styled-components version 3.
This method generates a React component, which when added to your component tree, will inject global stylesinto the document (App.js)
We've defined a GlobalStyle component and assigned background and color properties to values from theme object
Thus, everytime we switch the toggle, the values will change depending on dark theme or light theme objects that we are passing to ThemeProvider
The transition property of 0.5s enables this change to occur a little more smoothly, so that as we can toggle back and forth, we can see the changes happen
*/