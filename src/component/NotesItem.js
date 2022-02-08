import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function NotesItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, editNote } = props;
    return (
        <>
            <div className='col-md-3 my-1'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fas fa-edit" onClick={()=>{editNote(note)}}/>
                        <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNote(note._id); props.showAlert('Deleted Successfully', 'success') }} />
                    </div>
                </div>
            </div>
        </>
    )
}