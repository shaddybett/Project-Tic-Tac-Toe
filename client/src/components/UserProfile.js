import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        // Fetch user data when component mounts
        fetch('/profile')
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error(error));
    }, []);

    const handleUpdate = () => {
        // Update user data
        fetch('/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    };

    const handleDelete = () => {
        // Delete user profile
        fetch('/profile', {
            method: 'DELETE',
        })
        .then(() => setUser({}))
        .catch(error => console.error(error));
    };

    return (
        <div className='profile-div'>
            <h1>User Profile</h1>
            <p>Name: {user.username}</p>
            <label>Username</label>
            <input type="text" value={user.username} onChange={e => setUser({...user, username: e.target.value})} /><br></br>
            <label>Email</label>
            <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} /> <br></br>
            <button className='profile-btn' onClick={handleUpdate}>Update Profile</button>
            <button className='profile-btn' onClick={handleDelete}>Delete Profile</button>
        </div>
    );
};

export default UserProfile;
