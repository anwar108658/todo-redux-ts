import { Box, Container, IconButton, Stack, TextField } from "@mui/material"
import React, { FormEvent, useState } from "react"
import {useDispatch} from "react-redux"
import {addTodo} from "../features/TodoSlice"
import { AddTask } from "@mui/icons-material"

const TodoForm:React.FC = () => {
  const [value,setValue] = useState<string>("")
  const dispatch = useDispatch();
  const submitHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(addTodo(value))
    setValue("");
    console.log(value)
  }
  return (
    <Container sx={{bgcolor:"#b4caac",padding:".5rem 0",borderRadius:".5rem"}}>
        <Box onSubmit={submitHandler} component={"form"}>
            <Stack direction="row" gap={1} alignItems={"center"}>
                <TextField size="small" sx={{flex:"1",bgcolor:"#cfedf8",color:"white"}} label="Something Write" value={value} onChange={(e) => setValue(e.target.value)}/>
                <Box> 
                <IconButton size="large" color="success" sx={{color:"#0eb103"}} type="submit">
                  <AddTask sx={{fontSize:"2rem"}}/>
                </IconButton>
                </Box>
            </Stack>
        </Box>
    </Container>
  )
}

export default TodoForm
