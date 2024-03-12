import React, { useState } from 'react';

const EditIssue = ({ issue, onSubmit }) => {
    const [editedIssue, setEditedIssue] = useState(issue);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedIssue(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(editedIssue);
    }

    return (
        <>
            <h2>Edit an Issue</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Title'
                    name="title"
                    value={editedIssue.title}
                    onChange={handleChange}
                />
                <input
                    placeholder="Description"
                    name="description"
                    value={editedIssue.description}
                    onChange={handleChange}
                />
                <button type="submit">Confirm</button>
            </form>
        </>
    );
}

export default EditIssue;
