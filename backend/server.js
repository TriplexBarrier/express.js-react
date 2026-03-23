import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

let tasks = [
  { id: 1, title: 'Вивчити React', completed: false },
  { id: 2, title: 'Зробити лабораторну', completed: true }
]

// GET всі задачі
app.get('/tasks', (req, res) => {
  res.json(tasks)
})

// POST додати
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  }
  tasks.push(newTask)
  res.json(newTask)
})

// DELETE
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  tasks = tasks.filter(t => t.id !== id)
  res.json({ success: true })
})

// PATCH (редагування)
app.patch('/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  tasks = tasks.map(t =>
    t.id === id ? { ...t, ...req.body } : t
  )
  res.json({ success: true })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))