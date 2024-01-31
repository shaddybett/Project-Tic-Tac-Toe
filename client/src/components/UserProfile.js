import React, { useState, useEffect } from 'react';


const UserProfile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        // Fetch user data when component mounts
        fetch('/profile')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setUserDetails(data)
        })
        .catch(error => setError(error.error));
    }, []);
    
    console.log(userDetails)
    const handleUpdate = (e) => {
        e.preventDefault();

        // Validate user input
        if (!user.username || !user.email) {
            setError('Username and email are required.');
            return;
        }

        // Update user data
        fetch(`/profile/${userDetails.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setUserDetails(data))
        .catch(error => setError(error.error));
    };

    const handleDelete = () => {
        // Delete user profile
        fetch(`/profile/${userDetails.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        })
        .then(() => setUserDetails({}))
        .catch(error => setError(error.error));
    };

    return (
        <div className='profile-div'>
            <h1>User Profile: {userDetails.username}</h1>
            {error && <p>{error.message}</p>}
            <form onSubmit={handleUpdate}>
                <label>
                    Username:
                    <input className='input-field' type="text" value={user.username} onChange={e => setUser({...user, username: e.target.value})} required />
                </label>
                <label>
                    Email:
                    <input className='input-field' type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})} required />
                </label>
                <button className='profile-btn' type="submit">Update Profile</button>
            </form>
            <button className='profile-btn' onClick={handleDelete}>Delete Profile</button>
        </div>
    );
};

export default UserProfile;
