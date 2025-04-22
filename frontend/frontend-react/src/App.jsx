import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import CreatePost from './CreatePost';
import Profile from './Profile';
import Test from './Test';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom';

const ProtectedRoute = () => {
  const isLoggedIn = (localStorage.getItem('Username') !== null);
  return isLoggedIn ? <Outlet/> : <Navigate to="/signin" />;
}

const App = () => {
  return(
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          {/*The below route is only used for testing purposes and has nothing to do with the working.*/}
          <Route path='/test/:query' element={<Test/>}></Route>        
          {/*added a parent Route and child Routes inside it which are only accessible to logged in users.*/}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/create-post' element={<CreatePost/>}></Route>
            <Route path='/profile/:profileId' element={<Profile/>}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
  
};

export default App;
