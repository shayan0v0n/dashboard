import React, {useState} from 'react'
import { Alert, Box, Button, Card, Chip, Menu, MenuItem, Snackbar, Tooltip, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import EditUrlForm from './EditUrlForm';
import { styled, CardProps } from "@mui/material";

interface urlCardProps { currentUrl: urlData, deleteUrl: Function, editUrl: Function}
interface urlData { name: string, address: string,id: string }

const CardUrlList = styled(Card)<CardProps>({
    margin: '1rem',
    padding: '.8rem',
    display: "flex",
    justifyContent: 'space-between',
    border: '0.2px solid #1565c0'
})


const UrlCard = (props: urlCardProps) => {
    const {currentUrl, deleteUrl, editUrl} = props
    const currentName = currentUrl.name
    const currentAddress = currentUrl.address
    const [toggleMenu, setToggleMenu] = useState(window.innerWidth <= 600 ? false : true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [editMode, setEditMode] = useState(false)
    const [open, setOpen] = React.useState(false);
    const textToCopy = currentAddress;
    const openMenu = Boolean(anchorEl);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return
        setOpen(false);
    };

    const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
    const menuHandleClose = () => {setAnchorEl(null)}
    const copyToClipboardHandler = () => {navigator.clipboard.writeText(textToCopy); setOpen(true)}

    const editHandler = (updatedName: string, updatedAddress: string) => {
        editUrl(currentUrl, updatedName, updatedAddress);
        setEditMode(false)
    }

  return (
    <>
    {!editMode ? (
        <CardUrlList>
          <Tooltip title={currentAddress} followCursor>
              <Typography sx={{fontWeight: 'bold', flexGrow: 1, display: 'flex', alignItems: 'center'}}>{currentName}</Typography>
          </Tooltip>
          <Box sx={{ cursor: 'pointer', display: 'flex' }} alignItems="center">
          <Button id="basic-button"
          aria-controls={openMenu ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
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
          <MenuItem onClick={() => {menuHandleClose(); copyToClipboardHandler()}}>Copy</MenuItem>
          <MenuItem onClick={() => {menuHandleClose(); setEditMode(true)}}>Edit</MenuItem>
          <MenuItem onClick={() => {menuHandleClose(); deleteUrl(currentUrl)}}>Delete</MenuItem>
        </Menu>
        { toggleMenu ? (
            <Chip label="Copy" sx={{ cursor: 'pointer' }} icon={<CopyAllIcon />} onClick={() => copyToClipboardHandler()}/>
        ) : null }
          </Box>
  
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  {currentName} URL Copied In Clipboard!
              </Alert>
          </Snackbar>
        </CardUrlList>
    ) : (
        <Card sx={{ padding: '1rem', margin: '1rem', display: 'flex' }}>
            <EditUrlForm 
             formUrl={editHandler}
             currentAddress={currentAddress} 
             currentName={currentName} />
        </Card>
    )}
    </>
  )
}

export default UrlCard