import axios from 'axios'

const baseUrl = "https://todo-app-vyrl.onrender.com"

// Get all todoitems 

const getAllToDo = (setToDo, setUsername) => {

    axios
        .get(`${baseUrl}`, {

            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        .then(({ data }) => {
            console.log('data ---> ', data);
            setToDo(data.todo)
             setUsername(data.user)
        })
        .catch((err) => console.log(err))
}

// Add todo items 

const addToDo = (text, setText, setToDo) => {

    axios
        .post(`${baseUrl}/save`, { text }, {

            headers: {
                'Content-Type':'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
        .then((data) => {
            console.log(data);
            setText("")
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))

}

// Update todo items 

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {

    axios
        .post(`${baseUrl}/update`, { _id: toDoId, text }, {

            headers: {
                'Content-Type':'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
        .then((data) => {
            setText("")
            setIsUpdating(false)
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))

}

// Delete todo items 

const deleteToDo = (_id, setToDo) => {

    axios
        .post(`${baseUrl}/delete`, { _id }, {

            headers: {
                'Content-Type':'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
        .then((data) => {
            console.log(data)
            getAllToDo(setToDo)
        })
        .catch((err) => console.log(err))

}



export { getAllToDo, addToDo, updateToDo, deleteToDo }