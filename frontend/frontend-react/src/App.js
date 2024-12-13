import React from 'react';
import Home from './Home';
import CreatePost from './CreatePost';
import DisplayPosts from './DisplayPosts';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {
  return(
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/create-post' element={<CreatePost/>}></Route>
          <Route exact path='/display-posts' element={<DisplayPosts/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
  
};

export default App;
