import React, { useState, useEffect} from "react";
// import Navbar from "./Navbar";
import Post from "./Post";

const DisplayPosts = () => {

    const userId = localStorage.getItem('UserId');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch data when the component mounts
        fetch(`http://localhost:8080/api/get-posts/?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data); // Update the state with the fetched data
            })
            .catch(err => console.error("Error fetching data:", err));
            // eslint-disable-next-line
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    //Use a for loop to build the display items
    let postItems = [];
    for (let i = 0; i < posts.length; i++) {
        postItems.push(   
            <Post key={posts[i].Id} post={posts[i]} />
        );
    }

    return(
        <div>
            {/*<Navbar/>*/}
            <ul>
                {postItems}
            </ul>
        </div>
    )
}

export default DisplayPosts;