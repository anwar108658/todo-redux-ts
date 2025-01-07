import { Delete, Edit, Save} from '@mui/icons-material'
import { Box, Checkbox, Container, IconButton, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {checkTodo,updateTodo,deleteTodo,localStorageTodo} from "../features/TodoSlice"
import {useDispatch,useSelector} from "react-redux"

const TodoList:React.FC = () => {
  const todos = useSelector(state => state.todos)
  const [update,setUpdate] = useState<string>("");
  const [isEditable,setIsEditable] = useState<boolean|null|string>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const toDo = JSON.parse(localStorage.getItem("todo"));
    if (toDo.length > 0 && toDo) {
      dispatch(localStorageTodo(toDo))
    }
  }, [])
  useEffect(() => {
  localStorage.setItem("todo",JSON.stringify(todos))
  }, [todos])
  
  
  const editHandler = (todo) => {
    if (isEditable === todo.id) {
      dispatch(updateTodo({id:todo.id,text:update}))
      setIsEditable(null)
      setUpdate("")
      console.log("false")
    }else{
      setIsEditable(todo.id)
      setUpdate(todo.text)
      console.log("true")
    }
  }
  return (
    <Box sx={{width:"100%",marginTop:"1rem",display:"flex",flexDirection:"column", gap:".5rem"}}>
        {todos && todos.map((todo) =>  (
          <Stack direction={"row"} gap={"1rem"} alignItems={"center"} sx={{width:"100%",maxWidth:"100%",bgcolor:todo.isComplete?"#fbacac":"#b2f79c",padding:".3rem",borderRadius:".3rem"}}>
            <Stack>
              <Checkbox 
              checked={todo.isComplete}
              onChange={() => dispatch(checkTodo(todo.id))}
              />
            </Stack>
            <Stack flex={"1"}>
              <TextField 
              sx={{
                "& .css-1pzfmz2-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":{
                  WebkitTextFillColor:"rgb(0, 0, 0)",
                  opacity:1
                },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "1px solid",
              },
              flex:"1"
        },}} 
        disabled={isEditable !== todo.id}
        size='small'
        value={isEditable === todo.id?update:todo.text}
        onChange={(e) => setUpdate(e.target.value)}
        />
            </Stack>
            <Stack direction={"row"} sx={{bgcolor:"#242323",borderRadius:".2rem"}}>
              <IconButton 
              disabled={todo.isComplete}
              sx={{color:isEditable !== todo.id?"#da9007":"#00c3ff"}}
              onClick={() => editHandler(todo)}
              >
                {isEditable !== todo.id ?<Edit/>:<Save/>}
              </IconButton>
              <IconButton color='error' onClick={() => dispatch(
                deleteTodo(todo.id))}>
                <Delete/>
              </IconButton>
            </Stack>
        </Stack>
        ))}
    </Box>
  )
}

export default TodoList
