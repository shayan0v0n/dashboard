import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'
import uuid from 'react-uuid';
import ActiveListCard from '../Components/Todos/ActiveListCard';
import AddTodoForm from '../Components/Todos/AddTodoForm';
import DoneListCard from '../Components/Todos/DoneListCard';
type todoStructureProps = { name: string, id: string };


export const Todos = () => {
  const currentStorage: any = localStorage.getItem("dashboard")
  const currentStorageJSON = JSON.parse(currentStorage);
  const [currentActiveList, setCurrentActiveList]: any[] = useState(currentStorageJSON.todos.activeList)
  const [currentDoneList, setCurrentDoneList]: any[] = useState(currentStorageJSON.todos.doneList)

  const setAddTodoHandler = (currentTodo: string): void => {
    if (currentTodo.trim().length === 0) return
    const allTodos = currentActiveList.concat(currentDoneList)
    const sameTodoExist = allTodos.findIndex((todo: todoStructureProps) => todo.name === currentTodo)
    if (sameTodoExist !== -1) return

    const todoStructure: todoStructureProps = {
      id: uuid(),
      name: currentTodo
    }

    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        ...currentStorageJSON.todos,
        activeList: [...currentStorageJSON.todos.activeList, todoStructure]
      }
    }
    setCurrentActiveList([...currentStorageJSON.todos.activeList, todoStructure])
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  const deleteActiveListTodoHandler = (currentTodo: todoStructureProps): void => {
    const filteredActiveList = currentActiveList.filter((todo: todoStructureProps) => {
      return todo.id !== currentTodo.id
    })

    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        ...currentStorageJSON.todos,
        activeList: filteredActiveList
      }
    }

    setCurrentActiveList(filteredActiveList)
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  const AddActiveListTodoHandler = (currentTodo: todoStructureProps) => {
    const filteredActiveList = currentActiveList.filter((todo: todoStructureProps) => todo.id !== currentTodo.id)

    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        activeList: filteredActiveList,
        doneList: [...currentStorageJSON.todos.doneList, currentTodo]
      }
    }

    setCurrentActiveList(filteredActiveList)
    setCurrentDoneList([...currentStorageJSON.todos.doneList, currentTodo])
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }
  
  const returnDoneListHandler = (currentTodo: todoStructureProps) => {
    const filteredDoneList = currentDoneList.filter((todo: todoStructureProps) => todo.id !== currentTodo.id)
  
    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        doneList: filteredDoneList,
        activeList: [...currentStorageJSON.todos.activeList, currentTodo]
      }
    }
  
    setCurrentActiveList([...currentStorageJSON.todos.activeList, currentTodo])
    setCurrentDoneList(filteredDoneList)
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  const deleteDoneListHandler = (currentTodo: todoStructureProps) => {
    const filteredDoneList = currentDoneList.filter((todo: todoStructureProps) => todo.id !== currentTodo.id)

    const updateStorage: any[] = {
      ...currentStorageJSON,
      todos: {
        ...currentStorageJSON.todos,
        doneList: filteredDoneList
      }
    }

    setCurrentDoneList(filteredDoneList)
    localStorage.setItem('dashboard', JSON.stringify(updateStorage));
  }

  return (
      <Container>
        <Grid container gap={2} justifyContent="center">
          <Grid item xs={12} md={5} margin="1rem" textAlign="center">
            <h2>َActive List🐷🍫</h2>
            { currentActiveList.map((todo: todoStructureProps) => (
              <ActiveListCard 
              key={todo.id} 
              currentTodo={todo} 
              deleteActiveListTodo={deleteActiveListTodoHandler} 
              AddActiveListTodo={AddActiveListTodoHandler} />
            )) }
            <AddTodoForm setAddTodoFunc={setAddTodoHandler} />
          </Grid>

          <Grid item xs={12} md={5} margin="1rem" textAlign="center">
            <h2>Done List🐨🍭</h2>
            { currentDoneList.map((todo: todoStructureProps) => (
                <DoneListCard 
                key={todo.id} 
                currentTodo={todo} 
                returnDoneList={returnDoneListHandler} 
                deleteDoneList={deleteDoneListHandler} />
            )) }
          </Grid>
        </Grid>
      </Container>
  )
}