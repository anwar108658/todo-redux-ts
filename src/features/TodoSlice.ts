import {createSlice,nanoid} from '@reduxjs/toolkit';


interface Todo{
    id:string,
    text:string,
    isComplete:boolean,
}
interface TodosInial{
    todos:Todo[]
}
const initialState:TodosInial = {
    todos: [],
}

export const TodoSlice = createSlice({
    name: "Todo",
    initialState,
    reducers:{
        addTodo:(state,action) => {
            if(action.payload.trim() === "") return
            const todo:Todo={
                id:nanoid(),
                text:action.payload,
                isComplete:false,
            }
            state.todos.push(todo)
        },
        deleteTodo:(state,action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
            }
        },     
        checkTodo: (state, action) => {
            state.todos.map((todo,index) => {
                if (todo.id === action.payload) {
                    todo.isComplete = !state.todos[index].isComplete
                }
            })
        },
        localStorageTodo: (state,action) => {
            state.todos = action.payload
        } 
    }
})

export const {addTodo,deleteTodo,updateTodo,checkTodo,localStorageTodo} = TodoSlice.actions;
export default TodoSlice.reducer

