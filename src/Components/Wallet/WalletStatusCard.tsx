import { Card, Typography, Box, Tooltip, Button } from '@mui/material'
import { styled, CardProps } from "@mui/material";
import Menu from '@mui/material/Menu'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import EditSpendCard from './EditSpendCard';


const WalletStatusCard = (props: any) => {
    const { cardData } = props
    const SpendCardContainer = styled(Card)<CardProps>({ 
        margin: '1rem',
        padding: '.8rem', 
        display: "flex", 
        justifyContent: 'space-between', 
        color: 'white', 
        border: cardData.category == 'income' ? '3px solid #4b6043'  : '3px solid #c30010',
        background: cardData.category == 'spend' ? '#ee6b6e' : '#b3cf99'
    })
  return (
    <SpendCardContainer>
        <Tooltip title={`${cardData.category}`} followCursor>
            <Typography sx={{fontWeight: 'bold', flexGrow: 1, textAlign: "left", display: 'flex', alignItems: 'center'}}>{cardData.title}</Typography>
        </Tooltip>
            <Typography>${cardData.value}</Typography>
    </SpendCardContainer>
  )
}

export default WalletStatusCard