import React, { useState } from 'react';
import configData from '../config.json';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
    const [creadential, setCreadential] = useState({ name: "", email: "", password: "", cpassword: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = creadential;
        const response = await fetch(configData.SERVER_URL_AUTH + '/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            // props.showAlert('Account created Successfully', 'success');
            props.showAlert('Account Created Successfully', 'success');

        } else {
            props.showAlert('Invalid Credential', 'danger');
        }
    }

    const onChange = (e) => {
        setCreadential({ ...creadential, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h2 className='mt-2'>Signup Page</h2>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} value={creadential.name} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={creadential.email} required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={creadential.password} minLength={5} required />
                        <div id="passwordHelp" className="form-text">Minimum length of password must be 5</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={creadential.cpassword} required />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={creadential.password.length < 5}>Submit</button>
                </form>
            </div>
        </>
    )
}