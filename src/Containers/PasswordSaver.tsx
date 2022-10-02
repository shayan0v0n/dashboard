import { Box, Container } from '@mui/material'
import { useState } from 'react';
import LoginPassword from '../Components/PasswordAuth/LoginPassword';
import PasswordCard from '../Components/PasswordSaver/PasswordCard';
import AddPasswordForm from '../Components/PasswordSaver/AddPasswordForm';
interface currentPassowrdsStructure {id: string, title: string, password: string}

const PasswordSaver = () => {
  const currentStorage: any = localStorage.getItem("dashboard")
  const currentStorageJSON = JSON.parse(currentStorage);
  const [ currentPassowrds, setCurrentPasswords ] = useState(currentStorageJSON.passwords)
  const [loginModal, setLoginModal] = useState(true)
  const [loginStatus, setLoginStatus] = useState(true)
  
  const addPasswordHandler = (currentPass: currentPassowrdsStructure) => {
    const samePassExist = currentPassowrds.findIndex((password: currentPassowrdsStructure) => password.title === currentPass.title)
    if (samePassExist !== -1) return

    const updateStorage: any[] = {
      ...currentStorageJSON,
      passwords: [...currentStorageJSON.passwords, currentPass]
    }

    setCurrentPasswords([...currentStorageJSON.passwords, currentPass])
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }
  
  const deletePasswordHandler = (currentPass: currentPassowrdsStructure) => {
    const filteredStorage = currentPassowrds.filter((password: currentPassowrdsStructure) => password.id !== currentPass.id)

    const updateStorage: any[] = {
      ...currentStorageJSON,
      passwords: filteredStorage
    }

    setCurrentPasswords(filteredStorage)
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  const editPasswordHandler = (currentPass: currentPassowrdsStructure, newPass: {title: string, password: string}) => {
    let currentStorage: any[] = [...currentPassowrds];
    const indexUrl = currentStorage.findIndex((password: currentPassowrdsStructure) => password.id === currentPass.id)
    currentStorage[indexUrl] = { title: newPass.title, password: newPass.password, id: currentStorage[indexUrl].id }
    const uppdatedStorage: any = {
      ...currentStorageJSON,
      passwords: [...currentStorage]
    }

    setCurrentPasswords(currentStorage)
    localStorage.setItem('dashboard', JSON.stringify(uppdatedStorage));
  }

  const setLoginHandler = () => {
    setLoginModal(false)
    setLoginStatus(false)
  }

  return (
    <Container>
     <Box sx={{ marginTop: '2rem' }}>
     {loginModal ? (
        <LoginPassword setLogin={setLoginHandler} />
      ) : null}
      <Box>
        { currentPassowrds.map((password: currentPassowrdsStructure) => (
          <PasswordCard 
          key={password.id} 
          currentPassword={password} 
          login={loginStatus}
          editPassword={editPasswordHandler}
          deletePassword={deletePasswordHandler} />
        )) }
      </Box>
      <AddPasswordForm 
       passwordHandler={addPasswordHandler} 
       login={loginStatus} /> 
     </Box>
    </Container>
  )
}

export default PasswordSaver