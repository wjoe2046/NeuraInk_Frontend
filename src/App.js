import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import {
    css
} from '@emotion/css';
import { Auth } from 'aws-amplify';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import { API, Storage } from 'aws-amplify';

import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import MyAlbum from './pages/MyAlbum/MyAlbum';
import SocialGallery from './pages/SocialGallery/SocialGallery';
import Setting from './pages/Setting/Setting';

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
    async function signout() {

        await Auth.signOut({ global: true });
        window.location.reload();
    }
    return (

        <div className="App">
            <Router>
                <div>
                    <>
                        <Navbar className="nav-bar" variant="dark">
                            <Navbar.Brand href="/">Neuralink</Navbar.Brand>
                            <Nav className="mr-auto">
                                <Nav.Link href="myalbum">Album</Nav.Link>
                                <Nav.Link href="social-gallery">Gallery</Nav.Link>
                                <Nav.Link href="setting">Setting</Nav.Link>
                                <Nav.Link onClick={()=>{signout()}} >Sign Out</Nav.Link>
                            </Nav>
                        </Navbar>
                    </>

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


export default withAuthenticator(App);