
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZDAzMmRmNDI0YmYwOWUyOTFmZjQ0In0sImlhdCI6MTY0Mzk3MTM3M30.3KM07px9vyspdfJ-cHuCvT90kTDijkXuNNvYAf8bjZM'
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
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZDAzMmRmNDI0YmYwOWUyOTFmZjQ0In0sImlhdCI6MTY0Mzk3MTM3M30.3KM07px9vyspdfJ-cHuCvT90kTDijkXuNNvYAf8bjZM'
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();

        console.log("Add Note function running")
        const note = {
            "_id": "61fd1b9a852b31cbb36de58e",
            "user": "61fd032df424bf09e291ff44",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-02-04T12:27:06.241Z",
            "__v": 0
        };
        setNotes(notes.concat(note));
    }

    //Update Note
    const updateNote = async (_id, title, description, tag) => {

        //API Call
        const response = await fetch(`${host}api/notes/fetchallnotes/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZDAzMmRmNDI0YmYwOWUyOTFmZjQ0In0sImlhdCI6MTY0Mzk3MTM3M30.3KM07px9vyspdfJ-cHuCvT90kTDijkXuNNvYAf8bjZM'
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await response.json();

        //Logic to edit at Client side
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === _id) {
                newNotes.title = title;
                newNotes.description = description;
                newNotes.tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    //Delete Note
    const deleteNote = async (_id) => {
        //API Call
        const response = await fetch(`${host}api/notes/deletenote/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmZDAzMmRmNDI0YmYwOWUyOTFmZjQ0In0sImlhdCI6MTY0Mzk3MTM3M30.3KM07px9vyspdfJ-cHuCvT90kTDijkXuNNvYAf8bjZM'
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