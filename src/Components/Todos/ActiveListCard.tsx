import { Card, Typography, Tooltip, Box } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
type todoStructureProps = { name: string, id: string };
interface activeListProps {
  currentTodo: todoStructureProps,
  deleteActiveListTodo: Function,
  AddActiveListTodo: Function
}

const ActiveListCard = (props: activeListProps): JSX.Element => {
  const {deleteActiveListTodo, currentTodo, AddActiveListTodo} = props

  return (
    <Card sx={{ margin: '1rem', padding: '.8rem', display: "flex", justifyContent: 'space-between' }}>
        <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{currentTodo.name}</Typography>
        <Box>
        <Tooltip title={`Delete ${currentTodo.name} From Active List`}>
          <DeleteIcon color="error" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => deleteActiveListTodo(currentTodo)} />
        </Tooltip>
        <Tooltip title={`Add ${currentTodo.name} To Done List`}>
          <CheckBoxIcon color="success" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => AddActiveListTodo(currentTodo)} />
        </Tooltip>
        </Box>
    </Card>
  )
}

export default ActiveListCard