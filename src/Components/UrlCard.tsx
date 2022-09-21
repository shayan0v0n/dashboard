import React, {useState} from 'react'
import { Alert, Box, Button, Card, Chip, Grid, Menu, MenuItem, Snackbar, TextField, Tooltip, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CopyAllIcon from '@mui/icons-material/CopyAll';
interface urlCardProps {
    currentUrl?: any
    deleteUrl?: any
    editUrl?: any
}


const UrlCard = (props: urlCardProps) => {
    const {currentUrl, deleteUrl, editUrl} = props
    const [currentName, setCurrentName] = useState(currentUrl.name)
    const [currentAddress, setCurrentAddress] = useState(currentUrl.address)
    const [editMode, setEditMode] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(false);
    const textToCopy = currentAddress;
    const openMenu = Boolean(anchorEl);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const menuHandleClose = () => {
        setAnchorEl(null);
    };

    const copyToClipboardHandler = () => {navigator.clipboard.writeText(textToCopy); setOpen(true);}
    const editHandler = () => {
        if (currentName.trim().length === 0 || currentAddress.trim().length === 0) return
        editUrl(currentUrl, currentName, currentAddress);
        setEditMode(false)
    }

  return (
    <>
    {!editMode ? (
        <Card sx={{ padding: '1rem', margin: '1rem', display: 'flex' }}>
          <Tooltip title={currentAddress} followCursor>
              <Typography sx={{fontWeight: 'bold', flexGrow: 1}}>{currentName}</Typography>
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
          <MenuItem onClick={() => {menuHandleClose(); deleteUrl(currentUrl.id)}}>Delete</MenuItem>
        </Menu>
          <Chip label="Copy" sx={{ cursor: 'pointer' }} icon={<CopyAllIcon />} 
              onClick={() => copyToClipboardHandler()}/>
          </Box>
  
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                  {currentName} URL Copied In Clipboard!
              </Alert>
          </Snackbar>
          </Card>

    ) : (
    <Card sx={{ padding: '1rem', margin: '1rem', display: 'flex' }}>
        <Grid container gap={1} justifyContent="space-around">
            <Grid item xs={9}>
            <Box>
                <TextField
                    onChange={(e) => setCurrentName(e.target.value)}
                    id="outlined-basic" 
                    value={currentName}
                    label="URL Name"
                    variant="outlined" 
                    fullWidth 
                    sx={{ margin: '.2rem 0' }} />
                <TextField 
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    id="outlined-basic" 
                    value={currentAddress}
                    label="URL Address"
                    variant="outlined" 
                    fullWidth 
                    sx={{ margin: '.2rem 0' }} />
            </Box>
            </Grid>
            <Grid item xs={2}>
                <Button
                onClick={() => editHandler()}
                fullWidth 
                variant='contained' 
                color='primary'
                sx={{ margin: '.2rem 0', height: '95%' }} 
                >Edit URL</Button>
            </Grid>
        </Grid>
    </Card>
    )}
    </>
  )
}

export default UrlCard