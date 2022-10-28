import React, { useState } from 'react'
import { Card, Typography, Tooltip, Box, Button, MenuItem, Menu } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import EditTodoForm from './EditTodoForm';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled, CardProps } from "@mui/material";

type todoStructureProps = { name: string, id: string };
interface DoneListProps {
    currentTodo: todoStructureProps,
    returnDoneList: Function,
    deleteDoneList: Function
    doneListEdit: Function
}

const CardDoneList = styled(Card)<CardProps>({
  margin: '1rem',
  padding: '.8rem',
  display: "flex",
  justifyContent: 'space-between',
  border: '0.2px solid #1565c0'
})

const DoneListCard = (props: DoneListProps): JSX.Element => {
    const {returnDoneList, currentTodo, deleteDoneList, doneListEdit} = props
    const [doneListEditMode, setDoneListEditMode] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(window.innerWidth <= 600 ? false : true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const doneListEditHandler = (newTodo: string) => {doneListEdit(currentTodo, newTodo);setDoneListEditMode(false)}
    const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
    const menuHandleClose = () => {setAnchorEl(null)}

  return (
    <CardDoneList>
        {!doneListEditMode ? (
          <>
          <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{currentTodo.name}</Typography>
          {toggleMenu ? (
            <Box>
            <Tooltip title={`Delete ${currentTodo.name} From Done List`}>
              <DeleteIcon color="error" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => deleteDoneList(currentTodo)}/>
            </Tooltip>
            <Tooltip title={`Edit ${currentTodo.name} `}>
              <EditIcon color="primary" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => setDoneListEditMode(true)} />
            </Tooltip>
            <Tooltip title={`Add ${currentTodo.name} To Active List`}>
              <KeyboardReturnIcon color="success" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => returnDoneList(currentTodo)} />
            </Tooltip>
            </Box>
          ): (
          <Box sx={{ cursor: 'pointer', display: 'flex' }} alignItems="center">
              <Button id="basic-button"
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-expanded={openMenu ? 'true' : undefined}
                aria-haspopup="true"
                color='primary'
                onClick={menuHandleClick} ><MoreVertIcon /></Button>
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
              <MenuItem onClick={() => setDoneListEditMode(true)}>Edit</MenuItem>
              <MenuItem onClick={() => deleteDoneList(currentTodo)}>Delete</MenuItem>
              <MenuItem onClick={() => returnDoneList(currentTodo)}>AddToDone</MenuItem>
            </Menu>
          </Box>
          )}
          </>
        ) : (
          <EditTodoForm
            menuHandle={menuHandleClose}
            currentName={currentTodo.name}
            formSubmit={doneListEditHandler} />
        )}
    </CardDoneList>
  )
}

export default DoneListCard