import { Card, Typography, Box, Tooltip, Button } from '@mui/material'
import { styled, CardProps } from "@mui/material";
import Menu from '@mui/material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import EditSpendCard from './EditSpendCard';

const SpendCardContainer = styled(Card)<CardProps>({ 
  margin: '1rem',
  padding: '.8rem', 
  display: "flex", 
  justifyContent: 'space-between', 
  color: 'white', 
  border: '3px solid #c30010',
  background: '#ee6b6e'
})

interface incomeAndSpendStructure { title: String, value: Number, id: String, createdData: Number }
interface spendCardProps {
  spendData: incomeAndSpendStructure
  deleteSpendCard: Function
  updateSpendCard: Function
}

const SpendCard = (props: spendCardProps) => {
  const { spendData, deleteSpendCard, updateSpendCard } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
  const menuHandleClose = () => {setAnchorEl(null)}
  const [editMode, setEditMode] = useState(false)

  const deleteButtonHandler = () => {
    deleteSpendCard(spendData.id)
    menuHandleClose()
  }

  const editButtonHandler = () => setEditMode(true)

  const updateButtonHandler = (updatedData: incomeAndSpendStructure) => {
    updateSpendCard(updatedData)
    menuHandleClose()
    setEditMode(false)
  }


  return (
    !editMode ? (
      <SpendCardContainer>
            <Tooltip title={`${spendData.value}`} followCursor>
                <Typography sx={{fontWeight: 'bold', flexGrow: 1, textAlign: "left", display: 'flex', alignItems: 'center'}}>{spendData.title}</Typography>
            </Tooltip>
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
              <MenuItem onClick={() => editButtonHandler()}>Edit</MenuItem>
              <MenuItem onClick={() => deleteButtonHandler()}>Delete</MenuItem>
            </Menu>
          </Box>
      </SpendCardContainer>
    ) : (
      <EditSpendCard currentSpendData={spendData} updateButtonHandler={updateButtonHandler} />
    )
  )
}

export default SpendCard