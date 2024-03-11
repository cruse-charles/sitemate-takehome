import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [issues, setIssues] = useState([])

  const fetchIssues = async () => {
    const response = await axios.get('http://localhost:5000/api/issues')
    setIssues(response.data)
  }

  useEffect(() => {
    fetchIssues()
  }, [])

  return (
    <>
      <div>hi</div>
      {issues.map((issue) => (
        <div key={issue.id}>{issue.title}</div>
      ))}
    </>
  )
}

export default App
