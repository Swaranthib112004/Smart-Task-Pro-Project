import React, { useEffect, useState, useCallback } from "react";
import { Card, Button, TextField, Select, MenuItem, Box, Snackbar, Alert, IconButton, List, ListItem, InputAdornment, Grow, Collapse, Slide } from "@mui/material";
import Skeleton from '@mui/material/Skeleton'
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import TaskItem from "../components/TaskItem";
import { useNotifications } from '../context/NotificationContext'
import { loadTasks } from "../utils/tasks";
import { fetchTasks, addTaskApi, updateTaskApi, deleteTaskApi } from "../utils/api";
const EditTaskDialog = React.lazy(() => import('../components/EditTaskDialog'));

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTasks().then((list) => {
      setTasks(list);
      setLoading(false);
      console.debug('Tasks: initial fetch ->', list);
    });
    console.log("Tasks: fetched");
  }, []);

  const [recentAdded, setRecentAdded] = useState(null);
  const { notify, dismiss } = useNotifications() || {}
  const pendingDeletesRef = React.useRef({});

  const handleAdd = useCallback(() => {
    if (!text.trim()) return setToast("Please enter a task");
    const newTask = { id: Date.now(), text: text.trim(), done: false, dueDate, priority };
    setLoading(true);
    addTaskApi(newTask).then(() => fetchTasks()).then((list) => {
      setTasks(list);
      setLoading(false);
      console.debug('Tasks: after add ->', list);
      setToast("Task added");
      setRecentAdded(newTask.id);
      setTimeout(() => setRecentAdded(null), 800);
      notify && notify({ message: 'Task added', severity: 'success' });
    });
    setText("");
    setDueDate("");
  }, [text, dueDate, priority]);

  const handleToggle = useCallback((id) => {
    const t = tasks.find((x) => x.id === id);
    const updated = { ...t, done: !t.done };
    setLoading(true);
    updateTaskApi(updated).then(() => fetchTasks()).then((list) => {
      setTasks(list);
      setLoading(false);
    });
  }, [tasks]);

  const handleDelete = useCallback((id) => {
    // mark removing for animation, allow undo within 5s
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, removing: true } : t)));
    const timeoutId = setTimeout(() => {
      setLoading(true);
      deleteTaskApi(id).then(() => fetchTasks()).then((list) => {
        setTasks(list);
        setLoading(false);
        notify && notify({ message: 'Task deleted', severity: 'warning' });
      });
      delete pendingDeletesRef.current[id];
    }, 5000);
    pendingDeletesRef.current[id] = timeoutId;
    const key = notify && notify({ message: 'Task scheduled for deletion', severity: 'warning', duration: 5000, action: (
      <button onClick={() => {
        // cancel deletion
        clearTimeout(pendingDeletesRef.current[id]);
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, removing: false } : t)));
        delete pendingDeletesRef.current[id];
        dismiss && dismiss(key);
        notify && notify({ message: 'Delete canceled', severity: 'info' });
      }} style={{ marginLeft: 12, background: 'transparent', border: 'none', color: 'inherit', fontWeight: 700 }}>Undo</button>
    ) });
  }, []);

  const handleEdit = useCallback((task) => {
    setEditing(task);
  }, []);

  const handleSaveEdit = useCallback((updated) => {
    setLoading(true);
    updateTaskApi(updated).then(() => fetchTasks()).then((list) => {
      setTasks(list);
      setLoading(false);
      setToast("Task updated");
      setEditing(null);
    });
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h2>Tasks</h2>

      <Card sx={{ mb: 2, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField label="New task" value={text} onChange={(e) => setText(e.target.value)} sx={{ flex: 1 }} />
          <TextField type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Normal">Normal</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
          <Button variant="contained" onClick={handleAdd}>Add</Button>
        </Box>
      </Card>

      <Box sx={{ mt: 1 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
          <TextField
            placeholder="Search tasks"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>, 'aria-label': 'Search tasks' }}
            sx={{ flex: 1 }}
          />
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} size="small" inputProps={{ 'aria-label': 'Filter tasks' }}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="done">Completed</MenuItem>
          </Select>
        </Box>
        {loading && (
          <Box sx={{ display: 'grid', gap: 1 }}>
            {[1,2,3].map((i) => (
              <Card key={i} sx={{ p: 1, width: '100%', display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ ml: 1, flex: 1 }}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </Box>
              </Card>
            ))}
          </Box>
        )}
        {tasks.length === 0 && !loading && <div>No tasks yet</div>}
        <List aria-label="Tasks list">
          {React.useMemo(() => tasks
            .filter((t) => (filter === 'all' ? true : filter === 'active' ? !t.done : t.done))
            .filter((t) => t.text.toLowerCase().includes(query.toLowerCase())), [tasks, filter, query])
            .map((t) => (
              <ListItem key={t.id} sx={{ p: 0, mb: 1 }}>
                <Collapse in={!t.removing} timeout={260} appear>
                  {/* Keep items visible by default; only animate when this item was just added */}
                  <Grow in={recentAdded === null || recentAdded === t.id} style={{ transformOrigin: '0 0 0' }} timeout={360} appear>
                    <Card sx={{ width: '100%', p: 1, display: 'flex', alignItems: 'center' }}>
                      <TaskItem task={t} onToggle={handleToggle} onDelete={handleDelete} onEdit={() => handleEdit(t)} />
                    </Card>
                  </Grow>
                </Collapse>
              </ListItem>
            ))}
        </List>
      </Box>

      <Snackbar open={Boolean(toast)} autoHideDuration={2500} onClose={() => setToast("")} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} TransitionComponent={Slide}>
        <Alert severity={toast.includes('deleted') ? 'warning' : 'success'} sx={{ width: '100%' }}>{toast}</Alert>
      </Snackbar>

      <React.Suspense fallback={null}>
        <EditTaskDialog open={Boolean(editing)} task={editing} onClose={() => setEditing(null)} onSave={handleSaveEdit} />
      </React.Suspense>
    </div>
  );
}
