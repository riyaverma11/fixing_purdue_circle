import { useEffect, useState } from 'react';
export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');
    const [mountedComponent, setMountedComponent] = useState(false);

    //we use localStorage to persist between sessions in the browser
    //so, if a user has chosen the dark or light theme, that's what they'll get upon their next visit to the app or if they reload the page
    //hence, this function sets our state and passes theme to localStorage
    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    //this function uses a ternary operator to check the state of the theme and toggles either
    //dark or light based on the truth of the condition
    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    };

    //we've implemented the useEffect hook to check on component mounting
    //if the user has previously selected a theme, we will pass it to our setTheme function
    //in the end, we will return our theme, which contains the chosen theme and the themeToggler function to switch between modes
    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme ? setTheme(localTheme) : setMode('light')
        setMountedComponent(true)
    }, []);
    return [theme, themeToggler, mountedComponent]
};
