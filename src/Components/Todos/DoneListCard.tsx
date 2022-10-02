import { useState } from 'react'
import { Card, Typography, Tooltip, Box } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import EditTodoForm from './EditTodoForm';
type todoStructureProps = { name: string, id: string };
interface DoneListProps {
    currentTodo: todoStructureProps,
    returnDoneList: Function,
    deleteDoneList: Function
    doneListEdit: Function
}

const DoneListCard = (props: DoneListProps): JSX.Element => {
    const {returnDoneList, currentTodo, deleteDoneList, doneListEdit} = props
    const [doneListEditMode, setDoneListEditMode] = useState(false)
    const doneListEditHandler = (newTodo: string) => {
      doneListEdit(currentTodo, newTodo)
      setDoneListEditMode(false)
    }

  return (
    <Card sx={{ margin: '1rem', padding: '.8rem', display: "flex", justifyContent: 'space-between' }}>
        {!doneListEditMode ? (
          <>
          <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{currentTodo.name}</Typography>
          <Box>
          <Tooltip title={`Delete ${currentTodo.name} From Done List`}>
            <DeleteIcon color="error" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => deleteDoneList(currentTodo)}/>
          </Tooltip>
          <Tooltip title={`Edit ${currentTodo.name} `}>
            <EditIcon color="primary" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => setDoneListEditMode(true)} />
          </Tooltip>
          <Tooltip title={`Add ${currentTodo.name} To Active List`}>
            <KeyboardReturnIcon color="success" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => returnDoneList(currentTodo)} />
          </Tooltip>
          </Box>
          </>
        ) : (
          <EditTodoForm
            currentName={currentTodo.name}
            formSubmit={doneListEditHandler} />
        )}
    </Card>
  )
}

export default DoneListCard