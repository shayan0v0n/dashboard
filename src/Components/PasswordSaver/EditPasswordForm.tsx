import { Box, Button, Grid, TextField, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
interface currentPassowrdsStructure {id: string, title: string, password: string}
interface EditPasswordFormProps {
   passwordHandler: Function,
   currentPassword: currentPassowrdsStructure
  }

const EditPasswordForm = (props: EditPasswordFormProps) => {
  const { passwordHandler, currentPassword } = props
    const [title, setTitle] = useState(currentPassword.title)
    const [password, setPassword] = useState(currentPassword.password)
    const [passwordStatus, setPasswordStatus] = useState(true)
    const [formValidate, setFormValidate] = useState(true)

    useEffect(() => {
        checkPassowrdForm()
    }, [title, password])

    const checkPassowrdForm = () => {
      if (title.trim().length !== 0 && password.trim().length !== 0) setFormValidate(true)
      else setFormValidate(false)
    }

    const editPassowrdFormHandler = () => {
      const addPasswordStructure: currentPassowrdsStructure = {id: uuid(), title: title, password: password}
      passwordHandler(currentPassword, addPasswordStructure)

      setTitle('')
      setPassword('')
    }

  return (
    <Grid container gap={1} justifyContent="space-around" sx={{ margin: '1rem' }}>
    <Grid item xs={12} md={9}>
      <Box>
        <TextField 
            onChange={e => setTitle(e.target.value)}
            value={title}
            id="outlined-basic" 
            label="Title"
            variant="outlined"
            fullWidth 
            sx={{ margin: '.2rem 0'}} />

        <FormControl sx={{ margin: '.2rem 0' }}  variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              onChange={e => setPassword(e.target.value)}
              id="outlined-adornment-password"
              value={password}
              sx={{ margin: '.2rem 0'}}
              type={passwordStatus ? 'password' : 'text'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordStatus(!passwordStatus)}
                    edge="end"
                  >
                    {passwordStatus ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
        </FormControl>
      </Box>
    </Grid>
    <Grid item xs={12} md={2}>
      <Button
          fullWidth 
          variant='contained' 
          color='primary'
          sx={{ margin: '.2rem 0', height: '95%' }}
          disabled={formValidate ? false : true}
          onClick={editPassowrdFormHandler} >Edit Password</Button>
    </Grid>
    </Grid>
  )
}

export default EditPasswordForm