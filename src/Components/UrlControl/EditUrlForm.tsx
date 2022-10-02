import { Box, Button, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

interface EditUrlFormProps {
    formUrl: Function
    currentAddress: string
    currentName: string
}

const EditUrlForm = (props: EditUrlFormProps) => {
    const currentStorage: any = localStorage.getItem("dashboard")
    const currentStorageJSON = JSON.parse(currentStorage);
    const {formUrl, currentAddress, currentName} = props
    const [ urlName, setUrlName ] = useState(currentName);
    const [ urlAddress, setUrlAddress ] = useState(currentAddress);
    const [formValidate, setFormValidate] = useState(true)
    useEffect(() => {
        checkFormValidate()
    }, [urlName, urlAddress])
    
    const checkFormValidate = () => {
        if (urlName.trim().length !== 0 && urlAddress.trim().length !== 0) setFormValidate(true)
        else setFormValidate(false)
    }

    const formControlhandler = () => {
        formUrl(urlName, urlAddress)
        setUrlName('')
        setUrlAddress('')
    }

  return (
    <Grid container gap={1} justifyContent="space-around">
    <Grid item xs={12} md={9}>
      <Box>
        <TextField 
            onChange={(e) => setUrlName(e.target.value)}
            value={urlName}
            id="outlined-basic" 
            label="URL Name"
            variant="outlined" 
            fullWidth 
            sx={{ margin: '.2rem 0' }} />
        <TextField 
            onChange={(e) => setUrlAddress(e.target.value)}
            value={urlAddress}
            id="outlined-basic" 
            label="URL Address"
            variant="outlined" 
            fullWidth 
            sx={{ margin: '.2rem 0' }} />
      </Box>
    </Grid>
    <Grid item xs={12} md={2}>
            <Button 
            fullWidth 
            variant='contained' 
            color='primary'
            disabled={formValidate ? false : true}
            sx={{ margin: '.2rem 0', height: '95%' }} 
            onClick={() => {formControlhandler()}}>Edit Url</Button>
    </Grid>
  </Grid>
  )
}

export default EditUrlForm