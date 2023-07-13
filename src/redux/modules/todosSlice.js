import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { v4 as uuidv4 } from 'uuid';
/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const initialState = {
    list: [{ id: 1, title: 'react를 배워봅시다.', body: '함수형 컴포넌트는?', isDone: false }],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            // action.payload를 사용하여 새로운 todo를 state.list에 추가
            const newTodo = action.payload;
            state.list.push(newTodo);
        },
        deleteTodo: (state, action) => {
            // action.payload를 사용하여 특정 id를 가진 todo를 state.list에서 삭제
            const todoId = action.payload;
            state.list = state.list.filter(todo => todo.id !== todoId);
        },
    },
});

export const __addToDo = createAsyncThunk('__addToDo', async (payload, thunkAPI) => {
    try {
        const { id, title, body } = payload; // payload에서 필요한 값을 비구조화 할당하여 가져옵니다
        await waitTwoSeconds();
        thunkAPI.dispatch(
            addTodo({
                id,
                title,
                body,
            }),
            console.log(addTodo.id),
        ); // payload를 전달하여 addTodo 액션을 dispatch
    } catch (error) {
        console.error('Error adding todo:', error);
    }
});

export const __deleteTodo = createAsyncThunk('todos/__deleteTodo', async (payload, thunkAPI) => {
    try {
        const { id, title, body } = payload;
        await waitTwoSeconds();
        thunkAPI.dispatch(
            deleteTodo({
                id,
                title,
                body,
            }),
        );
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
});

todosSlice.reducer = todosSlice.reducer.bind(todosSlice);
export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
