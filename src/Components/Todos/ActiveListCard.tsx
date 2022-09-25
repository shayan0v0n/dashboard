import { Card, Typography, Tooltip, Box } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import AddTodoForm from "./AddTodoForm";
type todoStructureProps = { name: string, id: string };
interface activeListProps {
  currentTodo: todoStructureProps,
  deleteActiveListTodo: Function,
  AddActiveListTodo: Function,
  activeListEdit: Function
}

const ActiveListCard = (props: activeListProps): JSX.Element => {
  const {deleteActiveListTodo, currentTodo, AddActiveListTodo, activeListEdit} = props
  const [activeListEditMode, setActiveListEditMode] = useState(false)

  const activeListEditHandler = (newTodo: string) => {
    activeListEdit(currentTodo, newTodo)
    setActiveListEditMode(false)
  }

  return (
    <Card sx={{ margin: '1rem', padding: '.8rem', display: "flex", justifyContent: 'space-between' }}>
      {!activeListEditMode ? (
        <>
        <Typography fontWeight="bold" sx={{ flexFlow: 1}}>{currentTodo.name}</Typography>
        <Box>
        <Tooltip title={`Delete ${currentTodo.name} From Active List`}>
          <DeleteIcon color="error" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => deleteActiveListTodo(currentTodo)} />
        </Tooltip>
        <Tooltip title={`Edit ${currentTodo.name} `}>
          <EditIcon color="primary" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => setActiveListEditMode(true)} />
        </Tooltip>
        <Tooltip title={`Add ${currentTodo.name} To Done List`}>
          <CheckBoxIcon color="success" sx={{ margin: '0 .3rem', cursor: 'pointer' }} onClick={() => AddActiveListTodo(currentTodo)} />
        </Tooltip>
        </Box>
        </>        
      ) : (
        <AddTodoForm 
         currentName={currentTodo.name}
         formSubmit={activeListEditHandler}
         placeholderName="Edit Todo" />
      )}
    </Card>
  )
}

export default ActiveListCard