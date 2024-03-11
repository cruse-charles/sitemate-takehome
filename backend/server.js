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

app.get('/api/issues/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const issue = issues.find((issue) => issue.id === id)
    console.log('Issue requested - ', issue)
    res.send('Found Issue')
})

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    issues.push(newIssue)
    console.log('New issue created - ', newIssue)
    res.send('Issue created successfully')
})

app.put('/api/issues/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updatedIssue = req.body
    issues = issues.map((issue) => issue.id === id ? updatedIssue : issue)
    console.log('Issue updated - ', updatedIssue)
    res.send('Issue updated successfully')
})

app.listen(3000, () => {
    console.log('Server Running...')
})