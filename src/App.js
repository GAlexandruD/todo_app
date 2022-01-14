import { useEffect, useState } from "react";
import { Button, Input, InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
  where,
  query,
  orderBy,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //I want to read all the todos in the database and add them to the initial state.

  useEffect(() => {
    onSnapshot(
      query(collection(db, "todos"), orderBy("timestamp", "asc")),
      (snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      }
    );
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    const addToDotoDB = async () => {
      await addDoc(collection(db, "todos"), {
        todo: input,
        timestamp: serverTimestamp(),
      });
    };
    addToDotoDB();
    setInput("");
  };

  return (
    <div className="App">
      <h1>It works! 🇷🇴</h1>
      <form>
        <FormControl>
          <InputLabel>Write a ToDo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          variant="contained"
          type="submit"
          onClick={addTodo}
        >
          Add ToDo
        </Button>
      </form>

      <ul>
        {todos.map((todo, i) => (
          <Todo todo={todo} key={i} />
        ))}
      </ul>
    </div>
  );
}

export default App;
