import { useState, useEffect } from 'react'
import { Button, Grid, TextField } from '@mui/material'
interface EditTodoFormProps {
    formSubmit: Function
    menuHandle: Function
    currentName?: string
}

const EditTodoForm = (props: EditTodoFormProps) => {
  const [ addTodo, setAddTodo ] = useState(props.currentName ? props.currentName : '');
  const [formValidate, setFormValidate] = useState(true)

  useEffect(() => {
    checkFormValidate()
  }, [addTodo])
  const formSubmitHandler = () => {
    props.formSubmit(addTodo);
    props.menuHandle()
    setAddTodo('')
  }

  const checkFormValidate = () => {
    if (addTodo.trim().length !== 0) setFormValidate(false)
    else setFormValidate(true)
  }

  return (
    <Grid container gap={1}>
        <Grid item xs={12} md={8}>
          <TextField id="filled-basic" label="Edit Todo" variant="outlined" value={addTodo} onChange={(e) => setAddTodo(e.target.value)} fullWidth/>
        </Grid>
        <Grid item xs={12} md={3}>
            <Button 
                variant='contained' 
                color='primary' 
                fullWidth 
                sx={{ height: '100%' }} 
                disabled={formValidate ? true : false}
                onClick={() => formSubmitHandler()}>EDIT</Button>
        </Grid>
    </Grid>
  )
}

export default EditTodoForm