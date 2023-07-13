import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    Button,
    InputContainer,
    PageWrapper,
    TodoCard,
    TodoContainer,
    TodoHeader,
    TodoListContainer,
} from './components/styles';
import { useDispatch, useSelector } from 'react-redux';
import { __addToDo, __deleteTodo } from './redux/modules/todosSlice';
// const nextId = nextId();
function App() {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.list);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const onAddTodo = () => {
        //const id = nextID(); // 새로운 ID 생성
        const newTodo = {
            id: uuidv4(), // nextId 함수를 호출하여 고유한 ID 생성
            title: title,
            body: body,
        };
        dispatch(__addToDo(newTodo)); // addTodo 액션을 dispatch하고 newTodo를 전달
        resetInputs();
    };

    const onSubmit = e => {
        //기본이벤트(새로고침) 방지
        e.preventDefault();
    };

    const onDeleteTodo = id => {
        dispatch(__deleteTodo(id)); // deleteTodo 액션을 dispatch하고 id를 전달
    };

    const resetInputs = () => {
        /**
         * 입력 값을 초기화하고 싶다면 사용하세요.
         */
        setTitle('');
        setBody('');
    };
    const onChange = e => {
        setTitle(e.target.value);
    };
    const onChangeBody = e => {
        setBody(e.target.value);
    };

    return (
        <PageWrapper>
            <TodoContainer>
                <TodoHeader>🐢 SLOW TODO LIST 🐢</TodoHeader>
                <InputContainer onSubmit={onSubmit}>
                    <span>제목: </span>
                    <input value={title} placeholder="할 일 제목" onChange={onChange} />
                    <span>내용: </span>
                    <input value={body} placeholder="할 일 내용" onChange={onChangeBody} />

                    <Button type="submit" onClick={onAddTodo}>
                        + 추가하기
                    </Button>
                </InputContainer>
                <TodoListContainer>
                    {todos.map(todo => (
                        <TodoCard key={todo.id}>
                            <span>제목: {todo.title}</span>
                            <span>할 일: {todo.body}</span>
                            <Button onClick={() => onDeleteTodo(todo.id)}>삭제하기</Button>
                        </TodoCard>
                    ))}
                </TodoListContainer>
            </TodoContainer>
        </PageWrapper>
    );
}

export default App;
