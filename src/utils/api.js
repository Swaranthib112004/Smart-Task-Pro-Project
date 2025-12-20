import { loadTasks, saveTasks } from "./tasks";

const DELAY = 500; // ms to simulate network latency

export function fetchTasks() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(loadTasks()), DELAY);
  });
}

export function addTaskApi(task) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = loadTasks();
      const next = [task, ...tasks];
      saveTasks(next);
      console.debug('api.addTaskApi saved ->', task, next);
      resolve(task);
    }, DELAY);
  });
}

export function updateTaskApi(updated) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = loadTasks().map((t) => (t.id === updated.id ? updated : t));
      saveTasks(tasks);
      resolve(updated);
    }, DELAY);
  });
}

export function deleteTaskApi(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasks = loadTasks().filter((t) => t.id !== id);
      saveTasks(tasks);
      resolve(id);
    }, DELAY);
  });
}
