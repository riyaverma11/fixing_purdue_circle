import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [uniquePosts, setUniquePosts] = useState([]);
  const { user } = useContext(AuthContext);



  useEffect(() => {
    const fetchPosts = async () => {
      
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/" + user._id);

      /*
      console.log("length");
      console.log(res.data.length);
      console.log("pls dont be undefined");
      console.log(res.data[1]);*/
      
      let uniquePosts = [];
      for(let i = 0; i<res.data.length; i++){
        let unique = true;
        const post = res.data[i]; // post that we are checking if unique

        
        for(let j = 0; j<uniquePosts.length;j++){
          if(uniquePosts[j]._id===res.data[i]._id){
            unique = false;
          }
        }

        if(unique){
          uniquePosts.push(post);
        }
      
      }


      setPosts(
        uniquePosts.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
     
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