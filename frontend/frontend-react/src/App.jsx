import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
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
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/create-post' element={<CreatePost/>}></Route>
          <Route path='/display-posts' element={<DisplayPosts/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
  
};

export default App;
