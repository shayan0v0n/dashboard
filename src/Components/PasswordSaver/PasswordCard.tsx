import { Chip, Card, Tooltip, Typography } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock';
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from "react";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PasswordForm from "./PasswordForm";

interface currentPassowrdsStructure {id: string, title: string, password: string} 
interface passwordCardProps {
    currentPassword: currentPassowrdsStructure,
    deletePassword: Function
    editPassword: Function
    login: boolean
}

const PasswordCard = (props: passwordCardProps) => {
    const {currentPassword, deletePassword, editPassword, login} = props
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [editMode, setEditMode] = useState(false)
    const [showMode, setShowMode] = useState(false)

    const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
    const menuHandleClose = () => {setAnchorEl(null)}

    const editPasswordHandler = (currentPass: currentPassowrdsStructure, newPass: {title: string, password: string}) => {
      editPassword(currentPass, newPass)
      setEditMode(false)
    }

  return (
    !showMode ? (
      !editMode ? (
        <Card sx={{ padding: '1rem', margin: '1rem', display: 'flex' }}>
            <Typography sx={{fontWeight: 'bold', flexGrow: 1, margin: 'auto'}} >{currentPassword.title}</Typography>
            
            <Box sx={{ cursor: 'pointer', display: 'flex' }} alignItems="center">
              <Button id="basic-button"
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              onClick={menuHandleClick} ><MoreVertIcon /></Button>
              {login ? (
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
                    <MenuItem>Edit</MenuItem>
                    <MenuItem>Show</MenuItem>
                    <MenuItem>Delete</MenuItem>
                  </Menu>
              ) : (
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
                    <MenuItem onClick={() => {menuHandleClose(); setEditMode(true)}}>Edit</MenuItem>
                    <MenuItem onClick={() => {menuHandleClose(); setShowMode(true)}}>Show</MenuItem>
                    <MenuItem onClick={() => {menuHandleClose(); deletePassword(currentPassword)}}>Delete</MenuItem>
                  </Menu>
              )}
              {!login ? (
                <Chip label="Unlocked" sx={{ cursor: 'default' }} icon={<LockOpenIcon />} />
                ) : (
                <Chip label="Locked" sx={{ cursor: 'default' }} icon={<LockIcon />} />
              )}
            </Box>
        </Card>
        ): (
            <Card sx={{ padding: '0 1rem' }}>
                <PasswordForm 
                 currentPassword={currentPassword}
                 passwordHandler={editPasswordHandler}
                 buttonTitle="EDIT PASSWORD" /> 
            </Card>
        )
        ) : (
          <Card sx={{ padding: '0 1rem' }}>
            <PasswordForm 
              currentPassword={currentPassword}
              passwordHandler={() => setShowMode(false)}
              readonlyMode={true}
              buttonTitle="CLOSE" /> 
          </Card>
    )
  )
}

export default PasswordCard