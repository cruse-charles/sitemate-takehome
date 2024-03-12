const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let issues = [
    {id: 1, title: 'Issue 1', description: 'Description 1'},
    {id: 2, title: 'Issue 2', description: 'Description 2'},
]

app.get('/api/issues', (req, res) => {
    console.log('Issues - ', issues)
    res.json(issues)
})

app.get('/api/issues/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const issue = issues.find((issue) => issue.id === id)
        console.log('Issue requested - ', issue)
        res.send(issue)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: error.message})
    }
})

app.post('/api/issues', (req, res) => {
    try {
        const newIssue = req.body;
        const {title, description} = newIssue

        if (!title || !description) {
            res.status(400).send('Missing title or description')
        } else {
            issues.push(newIssue)
            console.log('New issue created - ', newIssue)
            res.send('Issue created successfully')
        }

    } catch (error) {
        console.error(error)
        res.status(500).send('Internal Server Error')
    }

})

app.put('/api/issues/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedIssue = req.body;

        const existingIssue = issues.find((issue) => issue.id === id);
        if (!existingIssue) {
            res.status(404).send('Issue not found');
            return;
        }

        if (!updatedIssue.title || !updatedIssue.description) {
            res.status(400).send('Title and description are required');
            return;
        }

        issues = issues.map((issue) => (issue.id === id ? updatedIssue : issue));
        console.log('Issue updated - ', updatedIssue);
        res.send('Issue updated successfully');
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/issues/:id', (req, res) => {

    try {
        const id = parseInt(req.params.id)

        const existingIssue = issues.find((issue) => issue.id === id);
        if (!existingIssue) {
            res.status(404).send('Issue not found')
        }

        const deletedIssue = issues.find((issue) => issue.id === id)
        issues = issues.filter((issue) => issue.id != id)
        console.log('Issue deleted - ', deletedIssue)
        res.send('Issue deleted successfully')
    } catch (error) {
        console.error(error.message)
        res.status(500).json({message: error.message})
    }

})

app.listen(5000, () => {
    console.log('Server Running...')
})