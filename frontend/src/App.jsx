import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [issues, setIssues] = useState([])
  const [newIssue, setNewIssue] = useState({ title: '', description: '' })
  const [successMessage, setSuccessMessage] = useState('')

  const fetchIssues = async () => {
    const response = await axios.get('http://localhost:5000/api/issues')
    setIssues(response.data)
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const maxId = issues.reduce((max, issue) => {
      return issue.id > max ? issue.id : max;
    }, 0)

    const id = maxId + 1
    const newIssueWithId = { id, ...newIssue }
    await axios.post('http://localhost:5000/api/issues', newIssueWithId)
    setNewIssue({ title: '', description: '' })
    fetchIssues()
    setSuccessMessage('You have successfully created an issue.')
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/issues/${id}`)
    fetchIssues()
    setSuccessMessage('You have successfully deleted an issue.')

  }

  return (
    <>
      <h1>Current Issues</h1>
      <h4 id='success-message'>{successMessage}</h4>
      {issues.map((issue) => (
        <div key={issue.id}>
          <span>{issue.id} - {issue.title} - {issue.description}</span>
          <button>Edit</button>
          <button onClick={() => handleDelete(issue.id)}>Delete</button>
        </div>
      ))}
      <h2>Create an Issue</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Title'
          value={newIssue.title}
          onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={newIssue.description}
          onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
        />
        <button type="submit">Create Issue</button>
      </form>
    </>
  )
}

export default App
