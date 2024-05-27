import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Signup.css'; // Import custom CSS

function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", Geolocation: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/CreateUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.Geolocation
            })
        });
        const json = await response.json();
        console.log(json);
        if (!json.success) {
            alert("Enter valid credentials");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div className="signup-container d-flex align-items-center justify-content-center">
            <div className="signup-form-container p-4 rounded shadow">
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            placeholder="Enter email"
                            required
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="Geolocation"
                            value={credentials.Geolocation}
                            onChange={onChange}
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button type="submit" className="btn btn-primary sandybrown-bg">Submit</button>
                        <Link to="/login" className="btn btn-danger">Already a user</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
