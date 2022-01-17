import { useEffect, useState } from "react";
import { Button, Input, InputLabel } from "@mui/material";
import { FormControl } from "@mui/material";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

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
    const addToDoToDB = async () => {
      try {
        await addDoc(collection(db, "todos"), {
          todo: input,
          timestamp: serverTimestamp(),
        });
      } catch (e) {
        console.error(e);
      }
    };
    addToDoToDB();
    setInput("");
  };

  return (
    <div className="App">
      <h1>ToDo List 🇷🇴</h1>
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
          <Todo todo={todo} key={i} line={i + 1} />
        ))}
      </ul>
    </div>
  );
}

export default App;
