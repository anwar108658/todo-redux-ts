import { Box, Stack, Typography } from "@mui/material"
import TodoForm from "./component/TodoForm"
import TodoList from "./component/TodoList"
import {useSelector} from "react-redux"
import {TodayOutlined } from "@mui/icons-material"
function App() {
  const data = useSelector(store => store)
  return (
    <>
    <Box sx={{bgcolor:"#5e7d7f",width:"100%",margin:"4rem auto",maxWidth:"800px",padding:".9rem",borderRadius:"1rem"}}>
      <Stack direction={"row"} justifyContent={"space-evenly"}>
      <Typography variant="h4" sx={{marginBottom:".7rem",color:"black"}}>Todo App</Typography>
     
      <Stack direction={"row"} gap={".3rem"} alignItems={"center"} sx={{color:"#00eaffd4",bgcolor:"#000",marginBottom:".5rem",borderRadius:".4rem",padding:"0 .8rem"}}>
        <TodayOutlined sx={{fontSize:"2.3rem"}} />
      <Typography variant="h4" >{data.todos.length}</Typography>
      </Stack>
      </Stack>

      <TodoForm/>
      <TodoList/>
    </Box>
    </>
  )
}

export default App
