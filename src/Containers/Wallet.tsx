import { Grid, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import IncomeCard from '../Components/Wallet/IncomeCard'
import IncomeForm from '../Components/Wallet/IncomeForm'
import SpendCard from '../Components/Wallet/SpendCard'
import SpendForm from '../Components/Wallet/SpendForm'
interface incomeAndSpendStructure { title: String, value: Number, id: String, createdData: number}

const Wallet = () => {
  const currentStorage: any = localStorage.getItem("dashboard")
  const currentStorageJSON = JSON.parse(currentStorage);
  const [incomeList, setIncomeList]: any[] = useState(currentStorageJSON.wallet.income)
  const [spendList, setSpendList]: any[] = useState(currentStorageJSON.wallet.spend)
  const [walletStatusValidate, setWalletStatusValidate] = useState(false)
  useEffect(() => {
    if (spendList.length !== 0 && incomeList.length !== 0) {
      setWalletStatusValidate(true)
    }else setWalletStatusValidate(false) 
  }, [incomeList, spendList])  

  const setIncomeListHandler = (incomeData: { title: string, value: number }) => {
    const currentTime = new Date().valueOf()
    const incomeStructure: incomeAndSpendStructure = {
      ...incomeData,
      createdData: currentTime,
      id: uuid()
    }

    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        income: [...currentStorageJSON.wallet.income, incomeStructure]
      }
    }
    setIncomeList([...currentStorageJSON.wallet.income, incomeStructure])
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }
  
  const setSpendListHandler = (spendData: { title: string, value: number }) => {
    const currentTime = new Date().valueOf()
    const spendStructure: incomeAndSpendStructure = {
      ...spendData,
      createdData: currentTime,
      id: uuid()
    }

    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        spend: [...currentStorageJSON.wallet.spend, spendStructure]
      }
    }
    setSpendList([...currentStorageJSON.wallet.spend, spendStructure])
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  const deleteIncomeCardHandler = (incomeID: string) => {
    const updateIncomeList = incomeList.filter((income: incomeAndSpendStructure) => income.id !== incomeID)
    
    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        income: updateIncomeList
      }
    }
    
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    setIncomeList(updateIncomeList)
  }

  const deleteSpendCardHandler = (spendID: string) => {
    const updateSpendList = spendList.filter((spend: incomeAndSpendStructure) => spend.id !== spendID)
    
    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        spend: updateSpendList
      }
    }
    
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    setSpendList(updateSpendList)
  }

  const updateSpendCardHandler = (updatedSpendCard: incomeAndSpendStructure) => {
    const currentStorage: any[] = [...spendList]
    const indexSpendCard = currentStorage.findIndex((spend: incomeAndSpendStructure) => spend.id === updatedSpendCard.id)
    currentStorage[indexSpendCard] = updatedSpendCard
    
    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        spend: currentStorage
      }
    }

    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    setSpendList(currentStorage)
  }

  const updateIncomeCardHandler = (updatedIncomeCard: incomeAndSpendStructure) => {
    const currentStorage: any[] = [...incomeList]
    const indexSpendCard = currentStorage.findIndex((income: incomeAndSpendStructure) => income.id === updatedIncomeCard.id)
    currentStorage[indexSpendCard] = updatedIncomeCard
    
    const updateStorage: any[] = {
      ...currentStorageJSON,
      wallet: {
        ...currentStorageJSON.wallet,
        income: currentStorage
      }
    }

    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
    setIncomeList(currentStorage)
  }

  return (
    <>
      <Button fullWidth variant='contained' sx={{ padding: '2rem 1rem', margin: '1rem 0' }} disabled={walletStatusValidate && false ? false : true}>WALLET STATUS</Button>
      <Grid container gap={2} margin="1rem" justifyContent="center">
        <Grid item xs={5} margin="1rem" textAlign='center'>
          <Typography variant='h5' fontWeight="bold">Income Items💵</Typography>
            { incomeList.map((income: incomeAndSpendStructure, index: number) => (
              <IncomeCard key={index}
               incomeData={income}
               deleteIncomeCard={deleteIncomeCardHandler}
               updateIncomeCard={updateIncomeCardHandler} />
            )) }
            <IncomeForm setIncomeList={setIncomeListHandler} />
        </Grid>
        <Grid item xs={5} margin="1rem" textAlign='center'>
          <Typography variant='h5' fontWeight="bold">Spend Items💰</Typography>
          { spendList.map((spend: incomeAndSpendStructure, index: number) => (
              <SpendCard
              key={index}
               spendData={spend}
               deleteSpendCard={deleteSpendCardHandler}
               updateSpendCard={updateSpendCardHandler} />
          )) }
          <SpendForm setSpendList={setSpendListHandler} />
        </Grid>
      </Grid>
    </>
  )
}

export default Wallet