import { Box, Container} from '@mui/material'
import { useState } from 'react';
import uuid from 'react-uuid';
import AddUrlForm from '../Components/UrlControl/AddUrlForm'
import UrlCard from '../Components/UrlControl/UrlCard';

interface urlData {name: string, address: string, id: string}
const UrlControl = () => {
  const currentStorage: any = localStorage.getItem("dashboard")
  const currentStorageJSON = JSON.parse(currentStorage);
  const [currentUrlStorage, setCurrentUrlStorage] = useState(currentStorageJSON.urls)

  const addUrlHandler = (urlName: string, urlAddress: string): void => {
    const createUrlStructure: urlData = {
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

  const deleteUrlHandler = (currentUrl: urlData) => {
   const filteredStorage = currentUrlStorage.filter((url: urlData) => url.id !== currentUrl.id)
    const uppdatedStorage: any = {
      ...currentStorageJSON,
      urls: [
        ...filteredStorage,
    ]
  }

  setCurrentUrlStorage(filteredStorage)
  localStorage.setItem('dashboard', JSON.stringify(uppdatedStorage))
  }

  const editUrlHandler = (currentUrl: urlData, currentName: string, currentAddress: string) => {
    let currentStorage: any[] = [...currentUrlStorage];
    const indexUrl = currentStorage.findIndex((url: urlData) => url.id == currentUrl.id)
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
        {currentUrlStorage.map((url: urlData) => (
          <UrlCard key={url.id} currentUrl={url} deleteUrl={deleteUrlHandler} editUrl={editUrlHandler}/>
        ))}
      </Box>
      <AddUrlForm formUrl={addUrlHandler} />
    </Container>
  )
}

export default UrlControl