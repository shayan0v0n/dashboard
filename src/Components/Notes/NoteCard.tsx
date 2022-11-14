import React, { useEffect, useState } from 'react'
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
type noteStructure = { title: string, shortDesc: string, text: string, id: string }
interface noteCardProps {
    note: noteStructure
    deleteNoteItem: Function
}

const NoteCard = (props: noteCardProps) => {
    const {note, deleteNoteItem} = props
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [activeListEditMode, setActiveListEditMode] = useState(false)
    const openMenu = Boolean(anchorEl);
  
    const activeListEditHandler = (newTodo: string) => {setActiveListEditMode(false)}
    const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
    const menuHandleClose = () => {setAnchorEl(null)}
  return (
    <>
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Button id="basic-button"
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                sx={{margin: 0, padding: 0}}
                onMouseEnter={menuHandleClick}><MoreVertIcon /></Button>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {note.title}
            </Typography>
            { note.shortDesc.trim().length !== 0 ? (
                <Typography sx={{ color: 'text.secondary' }}>{note.shortDesc}...</Typography>
            ) : null}
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{note.text}</Typography>
            </AccordionDetails>
            <Menu 
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  sx={{ margin: 'auto' }}
                  onClose={menuHandleClose}
                  MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
            >
            <MenuItem onClick={() => {}}>Edit</MenuItem>
            <MenuItem onClick={() => deleteNoteItem(note.id)}>Delete</MenuItem>
          </Menu>
    </Accordion>
    </>
  )
}

export default NoteCard