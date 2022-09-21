import { Box, Button, Container, Card, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import uuid from 'react-uuid';
import FormUrlControl from '../Components/FormUrlControl'
import UrlCard from '../Components/UrlCard';

const UrlControl = () => {
  const currentStorage: any = localStorage.getItem("dashboard")
  const currentStorageJSON = JSON.parse(currentStorage);
  const [currentUrlStorage, setCurrentUrlStorage] = useState(currentStorageJSON.urls)

  const formUrlHandler = (urlName: string, urlAddress: string): void => {
    const createUrlStructure = {
      name: urlName,
      address: urlAddress,
      id: uuid()
    }

    const uppdatedStorage: any = {
        ...currentStorageJSON,
        urls: [
          ...currentUrlStorage,
          createUrlStructure
      ]
    }

    setCurrentUrlStorage(uppdatedStorage.urls)
    localStorage.setItem('dashboard', JSON.stringify(uppdatedStorage))
  }

  const deleteUrlHandler = (url: any) => {
   const filteredStorage = currentUrlStorage.filter((item: any) => item.id !== url)
    const uppdatedStorage: any = {
      ...currentStorageJSON,
      urls: [
        ...filteredStorage,
    ]
  }

  setCurrentUrlStorage(filteredStorage)
  localStorage.setItem('dashboard', JSON.stringify(uppdatedStorage))
  }

  const editUrlHandler = (currentUrl: any, currentName: string, currentAddress: string) => {
    let currentStorage: any = [...currentUrlStorage];
    const indexUrl = currentStorage.findIndex((item: any) => item.id == currentUrl.id)
    currentStorage[indexUrl] = { name: currentName, address: currentAddress, id: currentStorage[indexUrl].id }
    const uppdatedStorage: any = {
      ...currentStorageJSON,
      urls: [
        ...currentStorage,
      ]
    }

      setCurrentUrlStorage(currentStorage)
      localStorage.setItem('dashboard', JSON.stringify(uppdatedStorage))
  }

  return (
    <Container>
      <Box sx={{ marginBottom: '2rem' }}>
        {currentUrlStorage.map((url: {name: string, address: string, id: string}) => (
          <UrlCard key={url.id} currentUrl={url} deleteUrl={deleteUrlHandler} editUrl={editUrlHandler}/>
        ))}
      </Box>
      <FormUrlControl formUrl={formUrlHandler} />
    </Container>
  )
}

export default UrlControl