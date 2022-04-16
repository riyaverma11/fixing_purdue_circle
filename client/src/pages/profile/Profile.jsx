import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./profile.css";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
//import { useParams } from "react-router";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});
	const { user: currentUser, dispatch } = useContext(AuthContext);
	//const username = useParams().username;

	var urlString = window.location.href;
	let lastIndex = urlString.lastIndexOf("/") + 1;
	const username = urlString.substring(lastIndex);
	console.log("User = ");
	console.log(user);
	console.log(currentUser);

	useEffect(() => {
		const fetchUser = async () => {
		  const res = await axios.get(`/users?username=${username}`);
		  setUser(res.data);
		};
		fetchUser();
	  }, [username]);
	
	let btnElem
	if (username == currentUser.username) {
		btnElem = (<Link to={`/profile/${user.username}/edit`}>
		<Button variant="contained" className="editProfileBtn">
			Edit Profile
		</Button>
	</Link>)
	}

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?username=${username}`);
			setUser(res.data);
		};
		fetchUser();
	}, [username]);

	return (
		<>
			<Topbar />
			<div className="profile">
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src={
									user.coverPicture
										? user.coverPicture
										: //: PF + "person/noCover.png"
										  PF + "person/purdueCover.jpeg"
								}
								alt=""
							/>
							<img
								className="profileUserImg"
								src={
									user.profilePicture
										? user.profilePicture
										: //: PF + "person/noAvatar.png"
										  PF + "person/riya.png"
								}
								alt=""
							/>
						</div>

						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDesc">{user.desc}</span>
							{/* TODO: Replace username with username variable here */}

							<div className="spacer"></div>
							{btnElem}
							{/* TODO: Write the condition to show Edit Profile/Follow/Unfollow button here */}
							{/* <Button variant="contained" className="editProfileBtn">
								Follow
							</Button>
							<Button variant="contained" className="editProfileBtn">
								Unfollow
							</Button> */}
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username} />
						<RightBar user={user} />
					</div>
				</div>
			</div>
		</>
	);
}
