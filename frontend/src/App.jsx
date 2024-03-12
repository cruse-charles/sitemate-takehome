import { useState, useEffect } from 'react'
import axios from 'axios'
import CreateIssue from './Components/CreateIssue'
import EditIssue from './Components/EditIssue'
import './App.css'

function App() {
  const [issues, setIssues] = useState([])
  const [message, setMessage] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState(null)

  const fetchIssues = async () => {
    const response = await axios.get('http://localhost:5000/api/issues')
    setIssues(response.data)
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  const handleCreateIssue = async (newIssue) => {
    try {
      const maxId = issues.reduce((max, issue) => {
        return issue.id > max ? issue.id : max;
      }, 0)

      const id = maxId + 1
      const newIssueWithId = { id, ...newIssue }
      await axios.post('http://localhost:5000/api/issues', newIssueWithId)
      fetchIssues()
      setMessage('You have successfully created an issue.')
    } catch (error) {
      setMessage(error.response.data)
    }
  }

  const handleEditButtonClick = (issue) => {
    setSelectedIssue(issue);
    setEditMode(true)
  }

  const handleEditIssue = async (editedIssue) => {
    try {
      await axios.put(`http://localhost:5000/api/issues/${editedIssue.id}`, editedIssue)
      fetchIssues()
      setEditMode(false)
      setMessage('You have successfully updated an issue.');
    } catch (error) {
      setMessage(error.response.data)
    }


  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/issues/${id}`)
    fetchIssues()
    setMessage('You have successfully deleted an issue.')
  }

  return (
    <>
      <h1>Current Issues</h1>
      <h4 id='message'>{message}</h4>
      {issues.map((issue) => (
        <div key={issue.id}>
          <span>{issue.id} - {issue.title} - {issue.description}</span>
          <button onClick={() => handleEditButtonClick(issue)}>Edit</button>
          <button onClick={() => handleDelete(issue.id)}>Delete</button>
        </div>
      ))}
      {editMode ? <EditIssue issue={selectedIssue} onSubmit={handleEditIssue} /> : <CreateIssue onSubmit={handleCreateIssue} />}


    </>
  )
}

export default App
