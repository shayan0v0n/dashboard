import { useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
interface addTodoFormProps {
    setAddTodoFunc: Function
}

const AddTodoForm = (props: addTodoFormProps) => {
  const [ addTodo, setAddTodo ] = useState('');
  return (
    <Grid container gap={1}>
        <Grid item xs={8}>
        <TextField id="filled-basic" label="Add Todo" variant="outlined" value={addTodo} onChange={(e) => setAddTodo(e.target.value)} fullWidth/>
        </Grid>
        <Grid item xs={3}>
        <Button variant='contained' color='primary' fullWidth sx={{ height: '100%' }} onClick={() => {props.setAddTodoFunc(addTodo); setAddTodo('')}}>Submit</Button>
        </Grid>
    </Grid>
  )
}

export default AddTodoForm