import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, Grow } from "@mui/material";

export default function EditTaskDialog({ open, task, onClose, onSave }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Normal");
  const inputRef = useRef(null);

  useEffect(() => {
    if (task) {
      setText(task.text);
      setDueDate(task.dueDate || "");
      setPriority(task.priority || "Normal");
      // focus input when dialog opens
      setTimeout(() => inputRef.current && inputRef.current.focus(), 80);
    }
  }, [task]);

  const save = () => {
    onSave({ ...task, text, dueDate, priority });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth TransitionComponent={Grow} aria-labelledby="edit-task-title">
      <DialogTitle id="edit-task-title">Edit Task</DialogTitle>
      <DialogContent>
        <TextField inputRef={inputRef} label="Task" value={text} onChange={(e) => setText(e.target.value)} fullWidth sx={{ mt: 1 }} />
        <TextField type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} fullWidth sx={{ mt: 2 }} />
        <Select value={priority} onChange={(e) => setPriority(e.target.value)} fullWidth sx={{ mt: 2 }}>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Normal">Normal</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={save}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
