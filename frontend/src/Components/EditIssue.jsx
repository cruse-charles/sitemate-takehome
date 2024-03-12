import React, { useState } from 'react';

const EditIssue = ({ onSubmit }) => {
    const [newIssue, setNewIssue] = useState({ title: '', description: '' });

    const handleSubmit = async (e) => {
        e.preventDefault()
        onSubmit(newIssue)
        setNewIssue({ title: '', description: '' })
    }

    return (
        <>
            <h2>Edit an Issue</h2>
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

export default EditIssue;