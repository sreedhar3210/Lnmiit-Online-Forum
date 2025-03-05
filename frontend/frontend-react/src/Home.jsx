import React from 'react';
import Navbar from './Navbar';
import DisplayPosts from './DisplayPosts';

const Home = () => {
    return(
        <div>
            <h1>Welcome to Lnmiit Online Forum</h1>
            <Navbar/>
            <DisplayPosts/>
        </div>
    )
}

export default Home;