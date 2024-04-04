import React, { useState } from 'react';
import '../styles/signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/register", { name, email, password });
            if (response.data.status === 'success') {
                setError(''); // Clear any previous error
                alert("Registered successfully"); // Show alert for success
                setName('');
                setEmail('');
                setPassword('');
                navigate('/login')
            } else {
                setError(response.data.error); // Update error message state
                navigate('/login')
            }
        } catch (err) {
            setError('Registration failed. Please try again.'); // Default error message
            console.error('Registration error:', err);
        }
        setLoading(false);
    };
    
    

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        minLength={6}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                <button type="submit" className="btn btn-primary" disabled={loading}> {/* Disable button during submission */}
                    {loading ? 'Submitting...' : 'Submit'} {/* Change button text based on loading state */}
                </button>
            </form>
        </div>
    );
}
