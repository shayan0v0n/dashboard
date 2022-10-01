import { Box, Button, Grid, TextField, FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react'
import uuid from 'react-uuid'
interface currentPassowrdsStructure {id: string, title: string, password: string}
interface passowrdFormProps {passwordHandler: Function,
   buttonTitle: string
   currentPassword?: currentPassowrdsStructure
   readonlyMode?: boolean
  }

const PasswordForm = (props: passowrdFormProps) => {
  const { passwordHandler, buttonTitle, currentPassword, readonlyMode } = props
    const [title, setTitle] = useState(currentPassword ? currentPassword.title : '')
    const [password, setPassword] = useState(currentPassword ? currentPassword.password : '')
    const [passwordStatus, setPasswordStatus] = useState(readonlyMode ? false : true)
    const [formValidate, setFormValidate] = useState(false)

    useEffect(() => {
        checkPassowrdForm()
    }, [title, password])

    const checkPassowrdForm = () => {
      if (title.trim().length !== 0 && password.trim().length !== 0) setFormValidate(true)
      else setFormValidate(false)
      if (currentPassword !== undefined) {
        if (currentPassword.title.trim() == title && currentPassword.password.trim() == password) setFormValidate(false)
      }
      if (readonlyMode) setFormValidate(true)
    }

    const addPassowrdFormHandler = () => {
      const addPasswordStructure: currentPassowrdsStructure = {id: uuid(), title: title, password: password}

      if (readonlyMode) {
        passwordHandler()
      }else {
        if (currentPassword !== undefined) {
          passwordHandler(currentPassword, addPasswordStructure)
        }else {
          passwordHandler(addPasswordStructure)
        }
      }
      setTitle('')
      setPassword('')
    }

  return (
    <Grid container gap={1} justifyContent="space-around">
    <Grid item xs={12} md={9}>
      <Box>
        <TextField 
            onChange={e => setTitle(e.target.value)}
            value={title}
            id="outlined-basic" 
            label="Title"
            variant="outlined"
            fullWidth 
            disabled={readonlyMode ? true : false}
            sx={{ margin: '.2rem 0'}} />

        <FormControl sx={{ margin: '.2rem 0' }}  variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              onChange={e => setPassword(e.target.value)}
              id="outlined-adornment-password"
              value={password}
              disabled={readonlyMode ? true : false}
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
        { formValidate ? (
            <Button
                fullWidth 
                variant='contained' 
                color='primary'
                sx={{ margin: '.2rem 0', height: '95%' }}
                onClick={addPassowrdFormHandler} >{buttonTitle}</Button>
        ) : (
            <Button
                fullWidth 
                variant='contained' 
                color='primary'
                sx={{ margin: '.2rem 0', height: '95%' }} disabled>{buttonTitle}</Button>
        ) }
    </Grid>
    </Grid>
  )
}

export default PasswordForm