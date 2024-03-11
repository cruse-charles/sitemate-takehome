import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [issues, setIssues] = useState([])
  const [newIssue, setNewIssue] = useState({ title: '', description: '' })

  const fetchIssues = async () => {
    const response = await axios.get('http://localhost:5000/api/issues')
    setIssues(response.data)
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/issues/${id}`)
    fetchIssues()
  }

  return (
    <>
      <h1>Current Issues</h1>
      {issues.map((issue) => (
        <div key={issue.id}>
          <span>{issue.title} - {issue.description}</span>
          <button>Edit</button>
          <button onClick={() => handleDelete(issue.id)}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default App
