import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Navbar, Nav } from 'react-bootstrap';

import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import MyAlbum from './pages/MyAlbum/MyAlbum';
import UploadTemp from './pages/UploadTemp/UploadTemp';
import SocialGallery from './pages/SocialGallery/SocialGallery';
import Setting from './pages/Setting/Setting';
import Landing from './pages/LandingPage/LandingPage';

const initialFormState = { name: '', description: '' };

function App() {
  const [user, setUser] = useState([]);
  useEffect(() => { Auth.currentAuthenticatedUser()
                    .then(user => setUser(true))
                    .catch(() => { setUser(false)}) }, []);

  async function signout() {
    await Auth.signOut({ global: true });
    window.location.reload();
  }
  return (
    <div className='App'>
      <Router>
        <div>
          <>
            <Navbar className='nav-bar' variant='dark'>
              <Navbar.Brand href='/'>NeuraInk</Navbar.Brand>
              <Nav className='mr-auto'>
                <Nav.Link href='upload'>Upload</Nav.Link>
                <Nav.Link href='myalbum'>Album</Nav.Link>
                <Nav.Link href='social-gallery'>Gallery</Nav.Link>
                <Nav.Link href='setting'>Setting</Nav.Link>
                {user?<Nav.Link
                    onClick={() => {
                      signout();
                    }}
                  >
                    Sign Out
                  </Nav.Link>:<Nav.Link
                    href='upload'
                  >
                    Log In
                  </Nav.Link>
                }
              </Nav>
            </Navbar>
          </>

          <Switch>
            <Route path='/upload'>
              <UploadTemp />
            </Route>
            <Route path='/myalbum'>
              <MyAlbum />
            </Route>
            <Route path='/social-gallery'>
              <SocialGallery />
            </Route>
            <Route path='/setting'>
              <Setting />
            </Route>
            <Route path='/aboutus'>
              <Profile />
            </Route>
            <Route path='/users'>{/* <Users /> */}</Route>
            <Route path='/'>
              <Landing />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default (App);
