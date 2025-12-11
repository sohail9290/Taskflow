import React, { useEffect, useState } from 'react'
import { getAllTodos } from '../services/TodoService';
import { useNavigate } from 'react-router-dom';
import { deleteTodo, completeTodo, pendingTodo } from '../services/TodoService';
import { isAdminUser } from '../services/AuthService';

const ListTodoComponent = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();
    const isAdmin = isAdminUser();

    useEffect(
        () => {
            listTodos();
        }, [])

    function listTodos() {
        getAllTodos().then((response) => {
            setTodos(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    function addNewTodo() {
        console.log("Add new todo clicked");
        navigate('/add-todo');
    }

    function updateTodo(id) {
        console.log("Update todo clicked: " + id);
        navigate(`/update-todo/${id}`);
    }

    function removeTodo(id) {
        console.log("Delete todo clicked: " + id);
        deleteTodo(id).then((response) => {
            console.log("Todo deleted successfully", response.data);
            listTodos();
        }).catch(error => {
            console.log("Error while deleting todo", error);
        });
    }

    function markcompleteTodo(id) {
        console.log("Mark as completed clicked: " + id);
        completeTodo(id).then((response) => {
            console.log("Todo marked as completed successfully", response.data);
            listTodos();
        }).catch(error => {
            console.log("Error while marking todo as completed", error);
        });
    }

    function markpendingTodo(id) {
        console.log("Mark as pending clicked: " + id);
        pendingTodo(id).then((response) => {
            console.log("Todo marked as pending successfully", response.data);
            listTodos();
        }).catch(error => {
            console.log("Error while marking todo as pending", error);
        });
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Tasks</h2>
            {
                isAdmin && <button className='btn btn-primary mb-2' onClick={addNewTodo}>Add Task</button>
            }
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo =>
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.completed ? "Completed" : "Pending"}</td>
                                <td>
                                    {
                                        isAdmin && <button className='btn btn-info' onClick={() => updateTodo(todo.id)}>Update</button>
                                    }
                                    {
                                        isAdmin && <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => removeTodo(todo.id)}>Delete</button>
                                    }
                                    <button style={{ marginLeft: "10px" }} className='btn btn-success' onClick={() => markcompleteTodo(todo.id)}>Completed</button>
                                    <button style={{ marginLeft: "10px" }} className='btn btn-info' onClick={() => markpendingTodo(todo.id)}>Pending</button>
                                </td>
                            </tr>
                        )
                    }
                    <tr>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ListTodoComponent