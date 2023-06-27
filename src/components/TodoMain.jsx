import { useEffect, useState } from "react";
import ToDo from "./ToDo";
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom'
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "../utils/HandleApi";


function TodoMain() {

  const navigate = useNavigate();
  const [userName, setUsername] = useState('')
  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState("")


  //  Call the useffect and get the token from localstorage

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem('token');
        navigate('/')
      } else {
        getAllToDo(setToDo, setUsername)
      }
    } else {
      navigate('/')
    }

  }, []);

  // Update todo item 

  const updateTodoItem = () => {

    updateToDo(toDoId, text, setToDo, setText, setIsUpdating)

  }

  // Add todo item 

  const addTodoItem = () => {

    addToDo(text, setText, setToDo)

  }

  // Update todo handle 

  const updateModeHandle = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  // Logout the user and clear the token

  const logOutUser = () => {
    localStorage.clear();
    navigate('/')
  }

  return (
    <div className="App">

      <div className="container">

        <h1>ToDo App</h1>
        <h1>Hello {userName} !</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="add-btn" disabled={text ? false : true}
            onClick={isUpdating ? updateTodoItem
              : addTodoItem}>
            {isUpdating ? "Update" : "Add"}
          </button>

        </div>

        <div className="list">

          {toDo.map((item) => <ToDo
            key={item._id}
            text={item.text}
            updateModeHandle={() => updateModeHandle(item._id, item.text)}
            deleteToDo={() => deleteToDo(item._id, setToDo)} />)}

        </div>

        {userName && <button onClick={logOutUser} className="btn">Logout</button>}

      </div>

    </div>
  );
}

export default TodoMain;
