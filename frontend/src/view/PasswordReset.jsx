import React, { useState } from 'react';
import axios from 'axios';

const PasswordReset = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/password/email', { email });
            // Display success message to user
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordReset;