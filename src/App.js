import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { css } from '@emotion/css';
import { Auth } from 'aws-amplify';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from './graphql/mutations';
import { API, Storage } from 'aws-amplify';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import MyAlbum from './pages/MyAlbum/MyAlbum';
import UploadTemp from './pages/UploadTemp/UploadTemp';
import SocialGallery from './pages/SocialGallery/SocialGallery';
import Setting from './pages/Setting/Setting';

const initialFormState = { name: '', description: '' };

function App() {
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
                {/* <Nav.Link href='upload'>Upload</Nav.Link> */}
                <Nav.Link href='myalbum'>Album</Nav.Link>
                <Nav.Link href='social-gallery'>Gallery</Nav.Link>
                <Nav.Link href='setting'>Setting</Nav.Link>
                <Nav.Link
                  onClick={() => {
                    signout();
                  }}
                >
                  Sign Out
                </Nav.Link>
              </Nav>
            </Navbar>
          </>

          <Switch>
            <Route exact path='/'>
              <Redirect to='/upload' />
            </Route>
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
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
