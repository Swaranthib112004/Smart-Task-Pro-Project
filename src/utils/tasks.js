const STORAGE_KEY = "tasks:v1";

export function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    const parsed = JSON.parse(raw);
    console.debug('tasks.loadTasks ->', parsed);
    return parsed;
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  console.debug('tasks.saveTasks ->', tasks);
}

export function addTask(tasks, { text, dueDate = "", priority = "Normal" }) {
  const id = Date.now();
  const newTask = { id, text, done: false, dueDate, priority };
  const next = [newTask, ...tasks];
  saveTasks(next);
  return next;
}

export function toggleTask(tasks, id) {
  const next = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks(next);
  return next;
}

export function deleteTask(tasks, id) {
  const next = tasks.filter((t) => t.id !== id);
  saveTasks(next);
  return next;
}
