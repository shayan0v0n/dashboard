import { Card, Typography, Box, Tooltip, Button } from '@mui/material'
import { styled, CardProps } from "@mui/material";
import Menu from '@mui/material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import EditIncomeCard from './EditIncomeCard';
interface spendAndIncomeStructure { title: String, value: Number, id: String, createdData: Number }
interface incomeCardProps {
  incomeData: spendAndIncomeStructure
  deleteIncomeCard: Function
  updateIncomeCard: Function
}

const IncomeCardContainer = styled(Card)<CardProps>({ 
   margin: '1rem',
   padding: '.8rem',
   display: "flex", 
   justifyContent: 'space-between', 
   background: '#b3cf99', 
   color: 'white', 
   border: '3px solid #4b6043' 
})


const IncomeCard = (props: incomeCardProps) => {
  const { incomeData, deleteIncomeCard, updateIncomeCard } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const menuHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {setAnchorEl(event.currentTarget)}
  const menuHandleClose = () => {setAnchorEl(null)}
  const [editMode, setEditMode] = useState(false)

  const deleteButtonHandler = () => {
    deleteIncomeCard(incomeData.id)
    menuHandleClose()
  }

  const editButtonHandler = () => setEditMode(true)

  const updateButtonHandler = (updatedData: spendAndIncomeStructure) => {
    updateIncomeCard(updatedData)
    menuHandleClose()
    setEditMode(false)
  }

  return (
    !editMode ? (
        <IncomeCardContainer>
            <Tooltip title={`${incomeData.value}`} followCursor>
                <Typography sx={{fontWeight: 'bold', flexGrow: 1, textAlign: "left", display: 'flex', alignItems: 'center'}}>{incomeData.title}</Typography>
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
      </IncomeCardContainer>
    ) : (
      <EditIncomeCard currentIncomeData={incomeData} updateButtonHandler={updateButtonHandler} />
    )
  )
}

export default IncomeCard