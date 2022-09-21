import { Box, Button, Container, Card, TextField, Typography } from '@mui/material'
import { useState } from 'react';
import FormUrlControl from '../Components/FormUrlControl'
import UrlCard from '../Components/UrlCard';

const UrlControl = () => {
  const currentStorage: any = localStorage.getItem("dashboard")
  const currentStorageJSON = JSON.parse(currentStorage);
  const [currentUrlStorage, setCurrentUrlStorage] = useState(currentStorageJSON.urls)

  const formUrlHandler = (urlName: string, urlAddress: string): void => {
    const uppdatedStorage: any = {
        ...currentStorageJSON,
        urls: [
          ...currentUrlStorage,
        {
          name: urlName,
          address: urlAddress
        }
      ]
    }

    setCurrentUrlStorage(uppdatedStorage.urls)
    localStorage.setItem('dashboard', JSON.stringify(uppdatedStorage))
  }

  const deleteUrlHandler = (url: string) => {
   const filteredStorage = currentUrlStorage.filter((item: any) => item.address !== url)
    const uppdatedStorage: any = {
      ...currentStorageJSON,
      urls: [
        ...filteredStorage,
    ]
  }

  setCurrentUrlStorage(filteredStorage)
  localStorage.setItem('dashboard', JSON.stringify(uppdatedStorage))
  }

  const editUrlHandler = (name: string, address: string) => {
    let currentStorage: any = [...currentUrlStorage];
    const indexUrl = currentStorage.findIndex((item: any) => item.name == name)
    currentStorage[indexUrl] = { name: name, address: address }
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
        {currentUrlStorage.map((url: {name: string, address: string}) => (
          <UrlCard key={url.name} address={url.address} name={url.name} deleteUrl={deleteUrlHandler} editUrl={editUrlHandler}/>
        ))}
      </Box>
      <FormUrlControl formUrl={formUrlHandler} />
    </Container>
  )
}

export default UrlControl