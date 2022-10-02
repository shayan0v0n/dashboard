import { useState, useEffect } from 'react'
import { Button, Grid, TextField } from '@mui/material'
interface addTodoFormProps {
    formSubmit: Function
    currentName?: string
}

const AddTodoForm = (props: addTodoFormProps) => {
  const [ addTodo, setAddTodo ] = useState(props.currentName ? props.currentName : '');
  const [formValidate, setFormValidate] = useState(false)

  useEffect(() => {
    checkFormValidate()
  }, [addTodo])
  const formSubmitHandler = () => {
    props.formSubmit(addTodo);
    setAddTodo('')
  }

  const checkFormValidate = () => {
    if (addTodo.trim().length !== 0) setFormValidate(true)
    else setFormValidate(false)
  }

  return (
    <Grid container gap={1}>
        <Grid item xs={12} md={8}>
          <TextField id="filled-basic" label="Add Todo" variant="outlined" value={addTodo} onChange={(e) => setAddTodo(e.target.value)} fullWidth/>
        </Grid>
        <Grid item xs={12} md={3}>
            <Button 
              variant='contained' 
              color='primary' 
              fullWidth 
              sx={{ height: '100%' }}
              disabled={formValidate ? false : true}
              onClick={formSubmitHandler}>SUBMIT</Button>
        </Grid>
    </Grid>
  )
}

export default AddTodoForm