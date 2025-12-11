import axios from 'axios';
import { getToken } from './AuthService';


const API_URL = 'http://localhost:8080/api/todos';


// Add a request interceptor
axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
}
);


export function getAllTodos() {
    return axios.get(API_URL);
}

export function addTodo(todo) {
    return axios.post(API_URL, todo);
}

export function getTodoById(id) {
    return axios.get(`${API_URL}/${id}`);
}

export function updateTodo(id, todo) {
    return axios.put(`${API_URL}/${id}`, todo);
}

export function deleteTodo(id) {
    return axios.delete(`${API_URL}/${id}`);
}

export function completeTodo(id) {
    return axios.patch(`${API_URL}/${id}/complete`);
}

export function pendingTodo(id) {
    return axios.patch(`${API_URL}/${id}/in-complete`);
}

