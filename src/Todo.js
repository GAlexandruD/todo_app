import { List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import "./Todo.css";
import db from "./firebase";
import { doc, deleteDoc } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Todo(props) {
  const deleteToDo = async () => {
    await deleteDoc(doc(db, "todos", props.todo.id));
  };

  return (
    <List className="todo_list">
      <ListItem>
        <ListItemText primary={props.todo.todo} secondary="Dummy deadline" />
      </ListItem>
      <DeleteForeverIcon onClick={(event) => deleteToDo()}></DeleteForeverIcon>
    </List>
  );
}

export default Todo;
