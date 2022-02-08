
import { useEffect, useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000/";
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);
    useEffect(()=>{
        // setNotes(Notes)
    }, [notes])

    //Get All Notes
    const getAllNotes = async () => {
        //API Call
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    //Add Note
    const addNote = async (title, description, tag) => {
        //API Call
        const response = await fetch(`${host}api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    //Update Note
    const updateNote = async (_id, title, description, tag) => {

        //API Call
        const response = await fetch(`${host}api/notes/fetchallnotes/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();

        //Logic to edit at Client side
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === _id) {
                newNotes.title = title;
                newNotes.description = description;
                newNotes.tag = tag;
                break;
            }
        }
        setNotes([...newNotes]);
    }

    //Delete Note
    const deleteNote = async (_id) => {
        //API Call
        const response = await fetch(`${host}api/notes/deletenote/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = response.json();
        console.log(json);

        console.log("Deleting the node with id: " + _id);
        const newNotes = notes.filter((note) => {
            return note._id !== _id;
        })
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;