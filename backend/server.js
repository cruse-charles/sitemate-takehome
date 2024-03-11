const express = require('express')

const app = express()
app.use(express.json())

let issues = [
    {id: 1, title: 'Issue 1', description: 'Description 1'},
    {id: 2, title: 'Issue 2', description: 'Description 2'},
]

app.get('/api/issues', (req, res) => {
    res.json(issues)
})

app.listen(3000, () => {
    console.log('Server Running...')
})