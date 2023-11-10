import axios from 'axios';

const baseUrl = "https://educational-academy-backend2.onrender.com"

const getAllToDo =(setToDo)=>{
    axios
    .get(baseUrl)
    .then(({data})=>{
        console.log('data --->',data);
        setToDo(data)
    })
}

const addToDo = (text,setText,setToDo)=>{
    axios
    .post(`${baseUrl}/save`,{text})
    .then((data)=>{
        console.log(data);
        setText("")
        getAllToDo(setToDo)
    })
    .catch((err) => console.log(err))
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


export { addToDo, deleteToDo, getAllToDo };
