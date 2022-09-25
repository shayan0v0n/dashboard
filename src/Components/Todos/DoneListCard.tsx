import { Card, Typography, Tooltip, Box } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
type todoStructureProps = { name: string, id: string };
interface DoneListProps {
    currentTodo: todoStructureProps,
    returnDoneList: Function,
    deleteDoneList: Function
}

const DoneListCard = (props: DoneListProps): JSX.Element => {
    const {returnDoneList, currentTodo, deleteDoneList} = props

  return (
    <Card sx={{ margin: '1rem', padding: '.8rem', display: "flex", justifyContent: 'space-between' }}>
        <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{currentTodo.name}</Typography>
        <Box>
        <Tooltip title={`Delete ${currentTodo.name} From Done List`}>
          <DeleteIcon color="error" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => deleteDoneList(currentTodo)}/>
        </Tooltip>
        <Tooltip title={`Add ${currentTodo.name} To Active List`}>
          <KeyboardReturnIcon color="success" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => returnDoneList(currentTodo)} />
        </Tooltip>
        </Box>
    </Card>
  )
}

export default DoneListCard