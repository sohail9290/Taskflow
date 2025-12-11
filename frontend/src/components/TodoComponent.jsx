import React from 'react'
import { useState, useEffect } from 'react'
import { addTodo } from '../services/TodoService';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodoById, updateTodo } from '../services/TodoService';


const TodoComponent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();


    function saveOrUpdateTodo(e) {
        e.preventDefault();
        const todo = { title, description, completed };
        console.log("Todo to be saved: ", todo);

        if (id) {
            updateTodo(id, todo).then((response) => {
                console.log("Todo updated successfully", response.data);
                navigate('/todos');
            }).catch(error => {
                console.log("Error while updating todo", error);
            });
        } else {
            addTodo(todo).then((response) => {
                console.log("Todo added successfully", response.data);
                navigate('/todos');
            }).catch(error => {
                console.log("Error while adding todo", error);
            });
        }
    }

    function pageTitle() {
        if (id) {
            return <h3 className='text-center'>Update Task</h3>
        } else {
            return <h3 className='text-center'>Add Task</h3>
        }
    }

    useEffect(() => {
        if (id) {
            getTodoById(id).then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setCompleted(response.data.completed);
            }).catch(error => {
                console.log("Error while fetching todo details", error);
            });
        }
    }, [id]);

    return (
        <div className='container'>
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <br />
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Title</label>
                                <input
                                    type='text'
                                    placeholder='Enter task title'
                                    name='title'
                                    className='form-control'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Description</label>
                                <input
                                    type='text'
                                    placeholder='Enter task description'
                                    name='description'
                                    className='form-control'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Status</label>
                                <select
                                    className='form-control'
                                    value={completed}
                                    onChange={(e) => setCompleted(e.target.value)}
                                >
                                    <option value={false}>Pending</option>
                                    <option value={true}>Completed</option>
                                </select>
                            </div>
                            <div>
                                <button className='btn btn-success' type='submit' onClick={(e) => saveOrUpdateTodo(e)}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoComponent