import { Grid, TextField, Button } from '@mui/material'
import { useEffect, useState } from 'react'
interface incomeProps {
    setIncomeList: Function
}

const IncomeForm = (props: incomeProps) => {
    const { setIncomeList } = props
    const [ title, setTitle ] = useState('')
    const [ value, setValue ] = useState('')
    const [formValidate, setFormValidate] = useState(false)
    useEffect(() => {
        if (title.trim().length !== 0 && value.trim().length !== 0) {    
            !isNaN(Number(value)) ? setFormValidate(true) : setFormValidate(false)
        }else {
            setFormValidate(false)
        }
    }, [title, value])

    const setIncome = () => {
        setIncomeList({ title: title, value: Number(value) })
        setTitle('')
        setValue('')
    }


  return (
    <Grid container gap={1} sx={{ display:"flex", justifyContent: 'center' }}>
        <Grid item md={9} xs={10}>
            <TextField sx={{ margin: '.5rem 0' }} fullWidth placeholder='Income Title...' value={title} onChange={e => {setTitle(e.target.value)}} />
            <TextField sx={{ margin: '.5rem 0' }} fullWidth placeholder='Income Value...' value={value} onChange={e => {setValue(e.target.value)}} />
        </Grid>
        <Grid item md={2} xs={10}>
            <Button disabled={formValidate ? false : true} onClick={() => setIncome()} variant="contained" color='success' sx={{ margin: '.5rem 0', height: '90%' }} fullWidth >Save</Button>
        </Grid>
    </Grid>
  )
}

export default IncomeForm