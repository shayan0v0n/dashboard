import { Card, Typography, Tooltip, Box, Button, Menu, MenuItem } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from "react";
import EditTodoForm from "./EditTodoForm";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled, CardProps } from "@mui/material";

type todoStructureProps = { name: string, id: string };
interface activeListProps {
  currentTodo: todoStructureProps,
  deleteActiveListTodo: Function,
  AddActiveListTodo: Function,
  activeListEdit: Function
}

const CardActiveList = styled(Card)<CardProps>({
  margin: '1rem',
  padding: '.8rem',
  display: "flex",
  justifyContent: 'space-between',
  border: '0.2px solid #1565c0'
})

const ActiveListCard = (props: activeListProps): JSX.Element => {
  const {deleteActiveListTodo, currentTodo, AddActiveListTodo, activeListEdit} = props
  const [toggleMenu, setToggleMenu] = useState(window.innerWidth <= 600 ? false : true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeListEditMode, setActiveListEditMode] = useState(false)
  const openMenu = Boolean(anchorEl);

  const activeListEditHandler = (newTodo: string) => {activeListEdit(currentTodo, newTodo);setActiveListEditMode(false)}
  const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
  const menuHandleClose = () => {setAnchorEl(null)}

  return (
    <CardActiveList>
      {!activeListEditMode ? (
        <>
        <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{currentTodo.name}</Typography>
        {toggleMenu ? (
        <Box>
        <Tooltip title={`Delete ${currentTodo.name} From Active List`}>
          <DeleteIcon color="error" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => deleteActiveListTodo(currentTodo)} />
        </Tooltip>
        <Tooltip title={`Edit ${currentTodo.name} `}>
          <EditIcon color="primary" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => setActiveListEditMode(true)} />
        </Tooltip>
        <Tooltip title={`Add ${currentTodo.name} To Done List`}>
          <CheckBoxIcon color="success" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => AddActiveListTodo(currentTodo)} />
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
            <MenuItem onClick={() => setActiveListEditMode(true)}>Edit</MenuItem>
            <MenuItem onClick={() => deleteActiveListTodo(currentTodo)}>Delete</MenuItem>
            <MenuItem onClick={() => AddActiveListTodo(currentTodo)}>AddToDone</MenuItem>
          </Menu>
        </Box>
        )}
        </>        
      ) : (
        <EditTodoForm 
         menuHandle={menuHandleClose}
         currentName={currentTodo.name}
         formSubmit={activeListEditHandler} />
      )}
    </CardActiveList>
  )
}

export default ActiveListCard