import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Accordion, AccordionSummary, Box, Container, Typography, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WalletStatusCard from '../Components/Wallet/WalletStatusCard';

ChartJS.register(ArcElement, Tooltip, Legend);


const WalletStatus = () => {
    const currentStorage: any = localStorage.getItem("dashboard")
    const currentStorageJSON = JSON.parse(currentStorage);
    const incomeList: any[] = currentStorageJSON.wallet.income.map((item: any) => {return {...item,category: "income"}})
    const spendList: any[] = currentStorageJSON.wallet.spend.map((item: any) => {return {...item,category: "spend"}})
    const cardSpendAll = incomeList.concat(spendList)
    const allIncomeValue = incomeList.reduce((totalValue: Number, incomeValue: any) => {return totalValue + incomeValue.value}, 0)
    const allspendValue = spendList.reduce((totalValue: Number, spendValue: any) => {return totalValue + spendValue.value}, 0)
    const sortedCardTimeLine = cardSpendAll.sort((a: any, b: any) => {
      if (a.createdData > b.createdData) {
        return 1
      }else {
        return -1
      }
    })
    
    const data = {
        labels: ["Spend", "Income"],
        datasets: [
          {
            label: 'Wallet Status',
            data: [allspendValue, allIncomeValue],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };

  return (
    <Container sx={{ textAlign: 'center' }}>
        <Box sx={{ width: window.innerWidth >= 600 ? '400px' : '250px', margin: 'auto' }}>
            <Doughnut data={data} />
        </Box>
        <Box sx={{ marginTop: '3rem' }}>
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Icome & Spend TimeLine</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {sortedCardTimeLine.map((item, index) => (
                <WalletStatusCard cardData={item} key={index} />
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
    </Container>
  )
}

export default WalletStatus