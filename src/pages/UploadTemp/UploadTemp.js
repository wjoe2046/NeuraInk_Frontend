import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { listNotes } from '../../graphql/queries';
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from '../../graphql/mutations';
import { API, Storage, Auth } from 'aws-amplify';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';

const initialFormState = { name: '', description: '' };

const UploadTemp = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  let randomstring = require('randomstring');
  let word = randomstring.generate(5);

  const toast = (innerHTML) => {
    const el = document.getElementById('toast');
    el.innerHTML = innerHTML;
    el.className = 'show';
    setTimeout(() => {
      el.className = el.className.replace('show', '');
    }, 3000);
  };

  const getUploadParams = async ({ file }) => {
    if (!file) return;
    // setFormData({ ...formData, image: file.name, name: word });
    await Promise.all([
      Storage.put(file.name, file),
      createNote(),
      fetchNotes(),
    ]);
    fetchNotes();
    return { url: 'https://httpbin.org/post' };
  };

  const handleChangeStatus = async ({ file, meta, remove }, status) => {
    if (!file) return;
    setFormData({ ...formData, image: file.name, name: word });
    fetchNotes();

    if (status === 'headers_received') {
      //   await fetchNotes();
      fetchNotes();
      toast(`${meta.name} uploaded!`);
      remove();
    } else if (status === 'aborted') {
      toast(`${meta.name}, upload failed...`);
    }
  };

  const dropZone = () => (
    <React.Fragment>
      <div id='toast'>Upload</div>
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        inputContent='Drop A File'
        styles={{
          dropzone: { width: 400, height: 200 },
          dropzoneActive: { borderColor: 'green' },
        }}
      />
    </React.Fragment>
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      })
    );
    setNotes(apiData.data.listNotes.items);
  }

  async function fetchTransformedImage(){
    
  }

  async function createNote() {
    if (!formData.image) return;
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });

    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }

    setNotes([...notes, formData]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    
    await Storage.remove(formData.image);

    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div className='App'>
      <div>{dropZone()}</div>
      <h1>Hello</h1>
      {/* <input type='file' onChange={onChange} />
      <button onClick={createNote}>Create Note</button> */}
      <div style={{ marginBottom: 30 }}>
        {/* {console.log(notes)} */}
        {notes.map((note) => (
          <div key={note.id || note.name}>
            <h2>{note.name}</h2>
            <button onClick={() => deleteNote(note)}>Delete note</button>
            {note.image && <img src={note.image} style={{ width: 400 }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

const dividerStyle = css`
  margin-top: 15px;
`;
const contentStyle = css`
  min-height: calc(100vh - 45px);
  padding: 0px 40px;
`;

export default UploadTemp;
