import { Box, Container } from '@mui/material'
import React, { useState, useEffect } from 'react' 
import uuid from 'react-uuid'
import AddNotesForm from '../Components/Notes/AddNotesForm'
import NoteCard from '../Components/Notes/NoteCard'
type noteStructure = { title: string, shortDesc: string, text: string, id: string }

const Notes = () => {
    const currentStorage: any = localStorage.getItem("dashboard")
    const currentStorageJSON = JSON.parse(currentStorage);
    const [currentNotes, setCurrentNotes] = useState(currentStorageJSON.notes)

    const addNoteItemHandler = (note: noteStructure) => {
        const addedNote = {...currentNotes, note}
        const updateStorage = {
            ...currentStorageJSON,
            notes: [...currentStorageJSON.notes, addedNote.note]
        }
        
        setCurrentNotes([...currentStorageJSON.notes, addedNote.note])
        localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    }

    const deleteNoteItemHandler = (noteID: string) => {
        const filteredItems = currentNotes.filter((item: noteStructure) => item.id !== noteID)
        const updateStorage = {
            ...currentStorageJSON,
            notes: filteredItems
        }
        
        setCurrentNotes(filteredItems)
        localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    }

  return (
    <Container>
        <Box sx={{ marginBottom: '1rem' }}>
            { currentNotes.map((item: noteStructure) => (
                <NoteCard note={item} key={item.id} deleteNoteItem={deleteNoteItemHandler} />
            )) }
        </Box>
        <AddNotesForm addNoteItem={addNoteItemHandler} />
    </Container>
  )
}

export default Notes