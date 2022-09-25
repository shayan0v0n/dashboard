import { useState } from 'react'
import { Button, Grid, TextField } from '@mui/material'
interface addTodoFormProps {
    formSubmit: Function
    placeholderName: string
    currentName?: string
}

const AddTodoForm = (props: addTodoFormProps) => {
  const [ addTodo, setAddTodo ] = useState(props.currentName ? props.currentName : '');
  const formSubmitHandler = () => {
    props.formSubmit(addTodo);
    setAddTodo('')
  }

  return (
    <Grid container gap={1}>
        <Grid item xs={8}>
          <TextField id="filled-basic" label={props.placeholderName} variant="outlined" value={addTodo} onChange={(e) => setAddTodo(e.target.value)} fullWidth/>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' color='primary' fullWidth sx={{ height: '100%' }} onClick={formSubmitHandler}>Submit</Button>
        </Grid>
    </Grid>
  )
}

export default AddTodoForm