import "./topbar.css";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import React, { useState } from "react";
import axios from "axios";

export default function Topbar() {
	const { user } = useContext(AuthContext);
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const username = useRef();
	const { isFetching, dispatch } = useContext(AuthContext);
	const history = useHistory();
	const [validQ, setValidQ] = useState(0);

	const handleClick = async e => {
		e.preventDefault();
		console.log(username.current.value)
		const usernameInput = {
			username: username.current.value,
		};

		try{
			const res = await axios.post("/auth/search",usernameInput);
            console.log("user exists")
			history.push(`/profile/${username.current.value}`);
			window.location.href = '/profile/'+username.current.value;
		}catch(err){
			document.getElementById("overallError").innerHTML = 
			"User doesn't exist";
			   console.log("User doesn't exist")
		}
			 
	};

	return (
		<div className="topbarContainer">
			<div className="topbarLeft">
				<Link to="/home" style={{ textDecoration: "none" }}>
					<span className="logo">PurdueCircle</span>
				</Link>
			</div>
			<div className="topbarCenter">
				<div className="searchbar">
					<Search className="searchIcon" />
					<input
						placeholder="Search for friends or topics"
						className="searchInput"
						ref={username}
					/>
				</div>

			</div>

			<div className="topbarRight">
				<button className="searchButton" onClick={handleClick}>
                   Search
				</button>

				<Link to="/logout" style={{ textDecoration: "none" }}>
					<span className="topbarLink">Logout</span>
				</Link>

				{
					<Link 
						onClick={()=>{window.location.href = '/profile/' + user.username;} }>
						<img
							src={
								user.profilePicture
									? user.profilePicture
									: //: PF + "person/noAvatar.png"
									PF + "person/riya.png"
							}
							alt=""
							className="topbarImg"
						/>
					</Link>
				}
			</div>
		</div>
	);
}
