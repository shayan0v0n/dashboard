import { Card, Typography, Tooltip } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

interface DoneListProps {
    children?: JSX.Element,
    currentTodo?: string,
    returnDoneList?: any,
    deleteDoneList?: any
}

const DoneListCard = (props: DoneListProps): JSX.Element => {
    const {children, returnDoneList, currentTodo, deleteDoneList} = props

  return (
    <Card sx={{ margin: '1rem', padding: '.8rem', display: "flex", justifyContent: 'space-between' }}>
        <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{children}</Typography>
        <div>
        <Tooltip title={`Delete ${currentTodo} From Done List`}>
          <DeleteIcon color="error" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => deleteDoneList(currentTodo)}/>
        </Tooltip>
        <Tooltip title={`Add ${currentTodo} To Active List`}>
          <KeyboardReturnIcon color="success" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => returnDoneList(currentTodo)} />
        </Tooltip>
        </div>
    </Card>
  )
}

export default DoneListCard