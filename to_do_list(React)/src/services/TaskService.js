import axios from 'axios';

const Api = 'http://localhost:8282/tasks'; 


const getAllTasks = () => {
    return axios.get(Api);
};

const getTaskById = (id) => {
    return axios.get(`${Api}/${id}`);
};
    
const createTask = (task) => {
    return axios.post(Api, task);
};

const updateTask = (id, task) => {
    return axios.put(`${Api}/${id}`, task);
};

const deleteTask = (id) => {
    return axios.delete(`${Api}/${id}`);
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};
