import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function AddNote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const clickHandle = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert('Added Notes Successfully', 'success');
    }
    const[note, setNote] = useState({title: "", description: "", tag: ""})
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <h2>Add Note: </h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name='title' aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
                </div>
                <button type="submit" disabled={note.title.length<5 || note.description.length<10} className="btn btn-primary" onClick={clickHandle}>Add Note</button>
            </form>
        </>
    )
}