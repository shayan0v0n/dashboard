import { Box, Button, Grid, TextField, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'

interface FormUrlControlProps {
    formUrl: Function
    buttonTitle: string
    currentAddress?: string
    currentName?: string
}

const FormUrlControl = (props: FormUrlControlProps) => {
    const currentStorage: any = localStorage.getItem("dashboard")
    const currentStorageJSON = JSON.parse(currentStorage);
    const {formUrl, buttonTitle, currentAddress, currentName} = props
    const [ urlName, setUrlName ] = useState(currentName ? currentName : '');
    const [ urlAddress, setUrlAddress ] = useState(currentAddress ? currentAddress : '');
    const [formValidate, setFormValidate] = useState(false)
    useEffect(() => {
        checkFormValidate()
    }, [urlName, urlAddress])
    
    const checkFormValidate = () => {
        if (urlName.trim().length !== 0 && urlAddress.trim().length !== 0) setFormValidate(true)
        else setFormValidate(false)
        if (urlName !== undefined && urlAddress !== undefined) {
            if (urlName.trim() == currentName && urlAddress.trim() == currentAddress) setFormValidate(false)
        }
    }

    const formControlhandler = () => {
        const findedIndexAddress = currentStorageJSON.urls.findIndex((item: any) =>item.address == urlAddress)
        const findedIndexName = currentStorageJSON.urls.findIndex((item: any) =>item.name == urlName)
        if (findedIndexAddress !== -1 && findedIndexName !== -1) return
        
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
            onClick={() => {formControlhandler()}}>{buttonTitle}</Button>
            ) : (
            <Tooltip title="Your Forms Is Invalid">
                <span>
                    <Button fullWidth variant='contained' sx={{ margin: '.2rem 0', height: '95%' }} disabled>{buttonTitle}</Button>
                </span>
            </Tooltip>
        )}
    </Grid>
  </Grid>
  )
}

export default FormUrlControl