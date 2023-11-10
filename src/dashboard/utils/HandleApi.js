import axios from 'axios';

const baseUrl = "https://educational-academy-backend1.onrender.com"

const getAllToDo =(setToDo)=>{
    axios
    .get(baseUrl)
    .then(({data})=>{
        console.log('data --->',data);
        setToDo(data)
    })
}

const addToDo = (text, description, setText, setDescription, setToDo) => {
    axios
        .post(`${baseUrl}/save`, { text, description })
        .then((data) => {
            console.log(data);
            setText("");
            setDescription("");
            getAllToDo(setToDo);
        })
        .catch((err) => console.log(err));
}

const updateToDo = (toDoId, text, description, setToDo, setText, setDescription, setIsUpdating) => {
    axios
        .put(`${baseUrl}/update`, { _id: toDoId, text, description })
        .then((data) => {
            setText("");
            setDescription("");
            setIsUpdating(false);
            getAllToDo(setToDo);
        })
        .catch((err) => console.log(err));
}


const deleteToDo = (_id, setToDo) => { // Pass _id as an argument
    axios
    .delete(`${baseUrl}/delete`, { data: { _id } }) // Send _id in the request body
    .then((data) => {
        console.log(data);
        getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
}


export { addToDo, deleteToDo, getAllToDo, updateToDo };
