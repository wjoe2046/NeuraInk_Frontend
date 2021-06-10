import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import {
  css
} from '@emotion/css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { API, Storage, Auth } from 'aws-amplify';

import Profile from './pages/Profile';
import Home from './pages/Home';
import MyAlbum from './pages/MyAlbum';
import SocialGallery from './pages/SocialGallery';
import Setting from './pages/Setting';

import Button from './components/Button';
import Header from './components/Button';
import Post from './components/Button';

const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([...notes, formData]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } } });
  }

  return (

    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/myalbum">My Album</Link>
              </li>
              <li>
                <Link to="/social-gallery">Social Gallery</Link>
              </li>
              <li>
                <Link to="/setting">User Setting</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/myalbum">
              <MyAlbum />
            </Route>
            <Route path="/social-gallery">
              <SocialGallery />
            </Route>
            <Route path="/setting">
              <Setting />
            </Route>
            <Route path="/aboutus">
              <Profile />
            </Route>
            <Route path="/users">
              {/* <Users /> */}
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

const dividerStyle = css`
    margin-top: 15px;
`
const contentStyle = css`
    min-height: calc(100vh - 45px);
    padding: 0px 40px;
`

export default withAuthenticator(App);