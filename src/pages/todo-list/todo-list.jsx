
import React, { useState,useEffect } from 'react';
import TodoTable from './components/todo-table/todo-table.jsx';
import TodoForm from './components/todo-form/todo-form.jsx';
import "../../App.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  // 从localStorage获取初始待办事项（如果有的话）  
  useEffect(() => {
    const savedTodos =todos&&todos.length?JSON.parse(localStorage.getItem('todos')):''
    if (savedTodos&&savedTodos.length) {
      setTodos(savedTodos);
    }
  }, []); // 空数组作为依赖项，确保只在组件加载时运行一次  

  // 在待办事项发生变化时更新localStorage  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // 当todos变化时运行  

  // 新增list
  const addTodo = (todoText) => {
    const updatedTodos = [...todos];
    setTodos([...updatedTodos, todoText]);
  };
  // 更改todolist完成状态
  const toggleTodo = (id) => {
    const updatedTodos = [...todos];
    const todoToEdit = todos.find((todo) => todo.id === id);
    todoToEdit.completed = !todoToEdit.completed
    setTodos(updatedTodos);
  };
  // 删除
  const deleteTodo = (id) => {
    const updatedTodos = [...todos];
    const todoToDelete = updatedTodos.filter((todo) => todo.id !== id);
    setTodos(todoToDelete ? todoToDelete : []);
  };



  return (
    <div className="App">
      <TodoForm onAddTodo={addTodo} />
      <TodoTable
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
        onSetTodos={setTodos}
      />
    </div>
  );
}

export default TodoList;