import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]); // array that will contain user's friends
  const [allTopicsFollowed,setTopics] = useState([]); // array that will contain topics user follows
  const { user: currentUser, dispatch } = useContext(AuthContext); // user is profile we wish to follow,, currentUser is who is logged in

  /*
  var urlString = window.location.href;
  let lastIndex = urlString.lastIndexOf("/") + 1;
  const username = urlString.substring(lastIndex);
 */

  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user._id)
  ); // set variable followed to true or false depending on whether the user is followed or not by current user currently

  

  const [topicFollowed, setTopicFollowed] = useState(
    currentUser.topicsFollowed.includes(user._id) // used to be user.username
  ); // set variable followed to true or false depending on whether the topic is followed or not by current user currently


  console.log("current topic id:")
  console.log(user._id);

  console.log("ids inside topics followed")
  console.log(currentUser.topicsFollowed);

  console.log("is followed?");
  console.log( currentUser.topicsFollowed.includes(user._id));

  useEffect(() => { // this function gets all of the user's friends -> friend list will contain all those user follows

    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        console.log("friendList: ");
        console.log(friendList);
        setFriends(friendList.data); // variable friends now contains who the user follows currently
      } catch (err) {
        console.log(err);
      }
    };
    

    const getTopics = async () => {
      try {
        console.log("inside get topics")
        console.log(user.topicsFollowed);
        const topicList = await axios.get("/users/topicsFollowing/" + user._id);
        console.log("topicsList: ");
        console.log(topicList);
        setTopics(topicList.data); // variable friends now contains who the user follows currently ?? should this be something else
        console.log("allTopicsFollowed after set topics")
        console.log(allTopicsFollowed);
      } catch (err) {
        console.log(err);
      }
    };

    getTopics();
    getFriends();
  }, [user]);


  const handleClick = async () => {
    console.log("topicFollowed in handleClick")
    console.log(topicFollowed);
    try {
      if (followed) { // unfollow a user
        await axios.put(`/users/${user._id}/unfollow`, { 
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });

      } else if (topicFollowed){ // unfollow a topic
        await axios.put(`/users/${user._id}/unfollowTopic`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOWTOPIC", payload: user._id });
      } else if(!(user.username===user.email)){ // follow a user
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }else if(user.username===user.email) { // follow a topic
        await axios.put(`/users/${user._id}/followTopic`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOWTOPIC", payload: user._id });
      }

      setFollowed(!followed);
      setTopicFollowed(!topicFollowed);

      console.log("topic followed after button click: ")
      console.log(topicFollowed);
    } catch (err) {
    }
 
  };

  const HomeRightbar = () => {
    return (
      <>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {/* {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))} */}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    setFollowed(currentUser.followings.includes(user._id)) // followed : does the user currently follow?
    setTopicFollowed(currentUser.topicsFollowed.includes(user._id))
    //console.log("topic followed before button click: ")
    //console.log(topicFollowed);

    console.log("allTopicsFollowed");
    console.log(allTopicsFollowed);

  
  
    return (
      <>
        {user.username !== currentUser.username && (user.username!==user.email) && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {(followed) ? "Unfollow" : "Follow"} {/* depending on state of followed display correct button */}
            {(followed)? <Remove /> : <Add />}
          </button>
        )}

        {user.username !== currentUser.username && (user.username===user.email) && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {(topicFollowed) ? "Unfollow" : "Follow"} {/* depending on state of followed display correct button */}
            {(topicFollowed)? <Remove /> : <Add />}
          </button>
        )}

{user.username!== user.email && (
        <div className="formatting">
          <h4 className="rightbarTitle">Users followed:</h4>  
        </div>
        )}
        
        {user.username!== user.email && (
        <div className="rightbarFollowings">
          
          {friends.map((friend) => (
            <Link
            onClick={()=>{window.location.href = '/profile/' + friend.username;} }
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/riya.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
        )}

        {user.username!== user.email && (
        <div className="formatting">
          <h4 className="rightbarTitle">Topics followed:</h4>
        </div>
        )}

        {user.username!== user.email && (
        
          <div className="rightbarFollowings">
          {allTopicsFollowed.map((topic) => (
            <Link
            onClick={()=>{window.location.href = '/profile/' + topic.username;} }
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
               
                <span className="rightbarFollowingName">{topic.username}</span>
              </div>
            </Link>
          ))}


        </div>
        )}
      </>      
    ); // return for users and topics followed
           
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}