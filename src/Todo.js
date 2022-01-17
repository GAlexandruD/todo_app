import {
  Button,
  Input,
  List,
  ListItem,
  ListItemText,
  Modal,
} from "@mui/material";
import React, { useState } from "react";
import "./Todo.css";
import db from "./firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

function Todo(props) {
  const [open, setOpen] = useState(false);

  const deleteToDo = async () => {
    try {
      await deleteDoc(doc(db, "todos", props.todo.id));
    } catch (e) {
      console.error(e);
    }
  };

  const [input, setInput] = useState("");

  const updateToDo = async () => {
    setOpen(false);
    if (input) {
      try {
        await updateDoc(doc(db, "todos", props.todo.id), {
          todo: input,
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit ToDo
          </Typography>
          <Input
            fullWidth
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          ></Input>
          <Button
            sx={{ margin: "5px" }}
            variant="contained"
            type="submit"
            onClick={updateToDo}
          >
            Update ToDo
          </Button>
        </Box>
      </Modal>

      <List className="todo_list">
        <ListItem>
          <DeleteForeverIcon
            sx={{ cursor: "pointer" }}
            onClick={(event) => deleteToDo()}
          ></DeleteForeverIcon>
          <ModeEditIcon
            sx={{ margin: "10px", cursor: "pointer" }}
            onClick={(e) => setOpen(true)}
          ></ModeEditIcon>
          <ListItemText
            primary={props.todo.todo}
            secondary={`Line: ${props.line}. Edit by pressing the pencil.`}
          />
        </ListItem>
      </List>
    </>
  );
}

export default Todo;
