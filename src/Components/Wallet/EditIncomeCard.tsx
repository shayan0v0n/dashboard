import { Grid, TextField, Button, Card } from '@mui/material'
import { useEffect, useState } from 'react'
import { styled, CardProps } from "@mui/material";
interface spendAndIncomeStructure { title: String, value: Number, id: String, createdData: Number }
interface editIncomeCardProps {
    currentIncomeData: spendAndIncomeStructure
    updateButtonHandler: Function
}

const EditIncomeCardContainer = styled(Card)<CardProps>({ 
    margin: '1rem',
    padding: '.8rem',
    display: "flex", 
    justifyContent: 'space-between', 
    color: 'white', 
    border: '3px solid #4b6043' 
})


const EditIncomeCard = (props: editIncomeCardProps) => {
    const { currentIncomeData, updateButtonHandler } = props
    const [ title, setTitle ] = useState(currentIncomeData.title)
    const [ value, setValue ] = useState(String(currentIncomeData.value))
    const [formValidate, setFormValidate] = useState(false)
    useEffect(() => {
        if (title.trim().length !== 0 && value.trim().length !== 0) {    
            !isNaN(Number(value)) ? setFormValidate(true) : setFormValidate(false)
        }else {
            setFormValidate(false)
        }
    }, [title, value])

    const updateButton = (title: String, value: String) => {
        const cardStructure = { ...currentIncomeData, title: title, value: value }
        updateButtonHandler(cardStructure)
    }

  return (
    <EditIncomeCardContainer>
        <Grid container margin="1rem" gap={1}>
            <Grid item xs={9}>
                <TextField sx={{ margin: '.5rem 0' }} fullWidth placeholder='Income Title...' value={title} onChange={e => {setTitle(e.target.value)}} />
                <TextField sx={{ margin: '.5rem 0' }} fullWidth placeholder='Income Value...' value={value} onChange={e => {setValue(e.target.value)}} />
            </Grid>
            <Grid item xs={2}>
                <Button disabled={formValidate ? false : true} onClick={() => updateButton(title, value)} variant="contained" color='success' sx={{ margin: '.5rem 0', height: '90%' }} fullWidth >Update</Button>
            </Grid>
        </Grid>
    </EditIncomeCardContainer>
  )
}

export default EditIncomeCard