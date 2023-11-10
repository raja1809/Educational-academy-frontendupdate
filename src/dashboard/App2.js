import React, { useEffect, useState } from "react";
import ToDo from "./components2/ToDo";
import { addToDo, getAllToDo, deleteToDo } from "./utils2/HandleApi";
import DriveLinkConverter from "./components2/DriveLinkConverter";

function App2() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="box">
          <DriveLinkConverter />
        </div>
        
        <h1>Add Advertisement</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={() => addToDo(text, setText, setToDo)}
          >
            Add
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App2;
