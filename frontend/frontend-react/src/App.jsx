import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import CreatePost from './CreatePost';
import Profile from './Profile';
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
          {/*added a parent Route and child Routes inside it which are only accessible to logged in users.*/}
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/create-post' element={<CreatePost/>}></Route>
            <Route path='/my-profile' element={<Profile/>}></Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
  
};

export default App;
