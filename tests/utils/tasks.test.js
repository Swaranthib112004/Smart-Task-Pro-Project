import { describe, it, expect, beforeEach } from 'vitest'
import { loadTasks, saveTasks, addTask, toggleTask, deleteTask } from '../../src/utils/tasks'

describe('tasks utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves and loads tasks', () => {
    const tasks = [{ id: 1, text: 'a', done: false }]
    saveTasks(tasks)
    const loaded = loadTasks()
    expect(loaded).toEqual(tasks)
  })

  it('adds a task', () => {
    let tasks = []
    tasks = addTask(tasks, { text: 'new', dueDate: '2025-12-31', priority: 'High' })
    expect(tasks.length).toBe(1)
    expect(tasks[0].text).toBe('new')
    expect(loadTasks().length).toBe(1)
  })

  it('toggles a task', () => {
    let tasks = []
    tasks = addTask(tasks, { text: 't1' })
    const id = tasks[0].id
    tasks = toggleTask(tasks, id)
    expect(tasks[0].done).toBe(true)
    tasks = toggleTask(tasks, id)
    expect(tasks[0].done).toBe(false)
  })

  it('deletes a task', () => {
    let tasks = []
    tasks = addTask(tasks, { text: 't1' })
    const id = tasks[0].id
    tasks = deleteTask(tasks, id)
    expect(tasks.length).toBe(0)
    expect(loadTasks().length).toBe(0)
  })
})
