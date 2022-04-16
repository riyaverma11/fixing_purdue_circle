import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Register from "./pages/register/Register";
import Search from "./pages/search/search";
import Logout from "./pages/logout/Logout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

	return (
		<Router>
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

	);
}

export default App;
