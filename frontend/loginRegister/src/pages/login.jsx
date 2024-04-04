import React, { useState } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Get the navigate function

    axios.defaults.withCredentials=true

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/login", { email, password });
            if (response.data.status === 'success' && response.data.role === 'admin') { // Check for status === 'success' and role === 'admin'
                // Redirect to /dashboard if login is successful and user role is "admin"
                navigate('/');
            } else if (response.data.status === 'success') {
                alert("Login successful. You are not authorized to access the dashboard.");
            } else {
                alert("Login failed. Please try again.");
            }
            // Clear form fields on successful or failed login
            setEmail('');
            setPassword('');
        } catch (err) {
            setError('Login failed. Please try again.'); // Update error state
            console.error('Login error:', err);
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
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
                    {loading ? 'Logging in...' : 'Login'} {/* Change button text based on loading state */}
                </button>
            </form>
        </div>
    );
}
