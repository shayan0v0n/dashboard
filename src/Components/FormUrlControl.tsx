import { Box, Button, Grid, TextField, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'

interface FormUrlControlProps {
    formUrl?: any
}

const FormUrlControl = (props: FormUrlControlProps) => {
    const currentStorage: any = localStorage.getItem("dashboard")
    const currentStorageJSON = JSON.parse(currentStorage);
    const {formUrl} = props
    const [ urlName, setUrlName ] = useState('');
    const [ urlAddress, setUrlAddress ] = useState('');
    const [formValidate, setFormValidate] = useState(false)
    useEffect(() => {
        checkFormValidate()
    }, [urlName, urlAddress])
    
    const checkFormValidate = () => {
        if (urlName.trim().length !== 0 && urlAddress.trim().length !== 0) setFormValidate(true)
        else setFormValidate(false)
    }

    const formControlhandler = () => {
        const findedIndexAddress = currentStorageJSON.urls.findIndex((item: any) =>item.address == urlAddress)
        const findedIndexName = currentStorageJSON.urls.findIndex((item: any) =>item.name == urlName)
        if (findedIndexAddress !== -1 || findedIndexName !== -1) return
        
        formUrl(urlName, urlAddress)
        setUrlName('')
        setUrlAddress('')
    }

  return (
    <Grid container gap={1} justifyContent="space-around">
    <Grid item xs={9}>
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
    <Grid item xs={2}>
        {formValidate ? (
            <Button 
            fullWidth 
            variant='contained' 
            color='primary'
            sx={{ margin: '.2rem 0', height: '95%' }} 
            onClick={() => {formControlhandler()}}>Add URL</Button>
            ) : (
            <Tooltip title="Your Forms Is Invalid">
                <span>
                    <Button fullWidth variant='contained' sx={{ margin: '.2rem 0', height: '95%' }} disabled>Add URL</Button>
                </span>
            </Tooltip>
        )}
    </Grid>
  </Grid>
  )
}

export default FormUrlControl