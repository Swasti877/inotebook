import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import confiData from '../config.json';

export default function Login(props) {
    const { showAlert } = props;
    const [creadential, setCreadential] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(confiData.SERVER_URL_AUTH + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: creadential.email, password: creadential.password })
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //save token for session only.
            localStorage.setItem('token', json.authToken);
            //redirect to Home page.
            navigate('/');
            showAlert('Login Successfully', 'success');
        } else {
            showAlert('Invalid Credential', 'danger');
        }
    }
    const onChange = (e) => {
        setCreadential({ ...creadential, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h2 className='mt-2'>Login Page</h2>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" >Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={creadential.email} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={creadential.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}