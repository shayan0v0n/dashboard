import { Card, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface activeListProps {
    children?: JSX.Element,
    deleteActiveListTodo?: any,
    currentTodo?: string,
    AddActiveListTodo?: any
}

const ActiveListCard = (props: activeListProps): JSX.Element => {
  const {children, deleteActiveListTodo, currentTodo, AddActiveListTodo} = props

  return (
    <Card sx={{ margin: '1rem', padding: '.8rem', display: "flex", justifyContent: 'space-between' }}>
        <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{children}</Typography>
        <div>
          <DeleteIcon color="error" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => deleteActiveListTodo(currentTodo)} />
          <CheckBoxIcon color="success" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => AddActiveListTodo(currentTodo)} />
        </div>
    </Card>
  )
}

export default ActiveListCard