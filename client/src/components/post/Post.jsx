import "./post.css";
import { MoreVert, BookmarkAdd } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
	const [like, setLike] = useState(post.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	const [user, setUser] = useState({});
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const { user: currentUser } = useContext(AuthContext);

	useEffect(() => {
		setIsLiked(post.likes.includes(currentUser._id));
	}, [currentUser._id, post.likes]);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?userId=${post.userId}`);
			setUser(res.data);
		};
		fetchUser();
	}, [post.userId]);

	const likeHandler = () => {
		try {
			axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
		} catch (err) {}
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const renderText = txt =>
  txt
    .split(" ")
    .map(part =>
      URL_REGEX.test(part) ? <a href={part}>{part} </a> : part + " "
    );

	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
						<Link to={`/profile/${user.username}`}>
							<img
								className="postProfileImg"
								src={
									user.profilePicture
										? user.profilePicture
										: //: PF + "person/noAvatar.png"
										  PF + "person/riya.png"
								}
								alt=""
							/>
						</Link>
						<span className="postUsername">{user.username}</span>
						<span className="postDate">{format(post.createdAt)}</span>
					</div>
					<div className="postTopRight">
						<MoreVert />
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{renderText(post.desc)}</span>
					<img className="postImg" src={PF + post.img} alt="" />
					
				</div>
				
				{/*}
				<div>
					<span className="postTopic">{"#" + (post.topic)}</span>
				</div>
				*/}

				<div className="postBottom">
					<div className="postBottomLeft">
						<div>
							<span className="postTopic">{"#" + (post.topic)}</span>
						</div>
						<div className="shareOption">
                    		<BookmarkAdd htmlColor="DarkGray" className="shareIcon" />
                        		<span className="shareOptionText">Save Post</span>
                		</div>
						<img
							className="likeIcon"
							src={`${PF}like.png`}
							onClick={likeHandler}
							alt=""
						/>
						
						<span className="postLikeCounter">{like} likes</span>
					</div>
					<div className="postBottomRight">
						<span className="postCommentText">{post.comment} comments</span>
					</div>
				</div>
			</div>
		</div>
	);
}
