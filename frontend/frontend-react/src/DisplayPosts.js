import React, { useState, useEffect} from "react";

const DisplayPosts = () => {

    const [msg, setMsg] = useState("modati message");

    useEffect(() => {
        // Fetch data when the component mounts
        fetch("http://localhost:8080/api/get-posts")
            .then(res => res.json())
            .then(data => {
                setMsg(data.message); // Update the state with the fetched data
            })
            .catch(err => console.error("Error fetching data:", err));
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return(
        <div>
            <p>From the display posts page.</p>
            <p>This is being got from the backend </p>
            <p>message recieved from backend is {msg}</p>
        </div>
    )
}

export default DisplayPosts;