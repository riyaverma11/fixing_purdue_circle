import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Register from "./pages/register/Register";
import Search from "./pages/search/search";
import Logout from "./pages/logout/Logout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyle";
import { lightTheme, darkTheme } from "./components/Theme";
import  {useDarkMode} from "./components/useDarkMode";
import Toggle from "./components/Toggle"

function App() {
	const [theme, themeToggler, mountedComponent] = useDarkMode();
	const themeMode = theme === 'light' ? lightTheme : darkTheme
	if(!mountedComponent) return <div/>

	return (
		<ThemeProvider theme={themeMode}>
			<>
		<GlobalStyles/>
		<Toggle theme={theme} toggleTheme={themeToggler} />		<Router>
			<Switch>
				<Route exact path="/">
					<Register />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/home">
					<Home />
				</Route>
				<Route exact path="/profile/:username">
					<Profile />
				</Route>
				<Route exact path="/profile/:username/edit">
					<EditProfile />
				</Route>
				<Route path="/search">
					<Search />
				</Route>

				<Route path="/logout">
					<Logout />
				</Route>
			</Switch>
		</Router>
		</>
    </ThemeProvider>
	);
}

export default App;
