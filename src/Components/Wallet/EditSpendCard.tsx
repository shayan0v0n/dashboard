import { Grid, TextField, Button, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { styled, CardProps } from "@mui/material";
interface spendAndIncomeStructure { title: String, value: Number, id: String, createdData: Number }
interface editSpendCardProps {
    currentSpendData: spendAndIncomeStructure
    updateButtonHandler: Function
}

const EditSpendCardContainer = styled(Card)<CardProps>({ 
    margin: '1rem',
    padding: '.8rem', 
    display: "flex", 
    justifyContent: 'space-between', 
    color: 'white', 
    border: '3px solid #c30010'
})


const EditSpendCard = (props: editSpendCardProps) => {
    const { currentSpendData, updateButtonHandler } = props
    const [ title, setTitle ] = useState(currentSpendData.title)
    const [ value, setValue ] = useState(String(currentSpendData.value))
    const [formValidate, setFormValidate] = useState(false)
    useEffect(() => {
        if (title.trim().length !== 0 && value.trim().length !== 0) {    
            !isNaN(Number(value)) ? setFormValidate(true) : setFormValidate(false)
        }else {
            setFormValidate(false)
        }
    }, [title, value])

    const updateButton = (title: String, value: String) => {
        const cardStructure = { ...currentSpendData, title: title, value: value }
        updateButtonHandler(cardStructure)
    }

  return (
    <EditSpendCardContainer>
        <Grid container margin="1rem" gap={1}>
            <Grid item xs={9}>
                <TextField sx={{ margin: '.5rem 0' }} fullWidth placeholder='Spend Title...' value={title} onChange={e => {setTitle(e.target.value)}} />
                <TextField sx={{ margin: '.5rem 0' }} fullWidth placeholder='Spend Value...' value={value} onChange={e => {setValue(e.target.value)}} />
            </Grid>
            <Grid item xs={2}>
                <Button disabled={formValidate ? false : true} onClick={() => updateButton(title, value)} variant="contained" color='error' sx={{ margin: '.5rem 0', height: '90%' }} fullWidth >Update</Button>
            </Grid>
        </Grid>
    </EditSpendCardContainer>
  )
}

export default EditSpendCard