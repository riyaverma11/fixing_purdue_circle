import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [uniquePosts, setUniquePosts] = useState([])
  const { user } = useContext(AuthContext);



  useEffect(() => {
    const fetchPosts = async () => {
      
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);
    /*
      const res = 0;
      if(!username){
        res = await axios.get("/posts/profile/" + username);
      }else{
        res = await axios.get("/posts/timeline/" + user._id);
      }*/

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      console.log(posts);

      // let fetchedPostIds = []
      // posts.forEach(post => {
      //   console.log("ere")
      //   if (!fetchedPostIds.includes(post._id)) {
      //     console.log("went in if")
      //     fetchedPostIds.push(post._id)
      //     // uniquePosts.push(post)
      //     setUniquePosts(oldArray => [...oldArray,post])
      //   }
      // })
    };
    fetchPosts();

  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}