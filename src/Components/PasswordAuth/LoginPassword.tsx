import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: window.innerWidth <= 600 ? 1 : 5
};

const LoginPassword = (props: {setLogin: Function}) => {
  const currentLocalStorage: any = localStorage.getItem('dashboard') ? localStorage.getItem('dashboard') : null;
  const currentLocalStorageJSON = JSON.parse(currentLocalStorage)

  const [open, setOpen] = useState(true);
  const [ password, setPassword ] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(true)
  const [formValidate, setFormValidate] = useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const checkFormValidate = () => {
    if (password.trim().length !== 0) setFormValidate(true)
    else setFormValidate(false)
}
const setLoginHandler = () => {
  if (currentLocalStorageJSON.passwordAuth.password.trim() !== password.trim()) return
  props.setLogin()
}

  useEffect(() => {
      checkFormValidate()
  }, [password])


  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h5" sx={{ margin: '1rem 0', textAlign: 'center' }}>
            Password Saver Login
          </Typography>
          <Divider />
          <Box>
            <Grid item xs={12} md={9}>
                <Box sx={{ marginTop: '.5rem' }}>
                    <FormControl sx={{ margin: '.2rem 0' }} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password3">Password</InputLabel>
                        <OutlinedInput
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          id="outlined-adornment-password3"
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
                        disabled={!formValidate ? true : false}
                        onClick={() => setLoginHandler()}
                        sx={{ margin: '.2rem 0', padding: '1rem' }} >Login</Button>
                </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default LoginPassword