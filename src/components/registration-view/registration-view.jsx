import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './registration-view.scss';
//import { propTypes } from 'react-bootstrap/esm/Image';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [values, setValues] = useState({
        nameErr: '',
        usernameErr: '',
        passwordErr: '',
        emailErr: '',
    });

    const validate = () => {
        let isReq = true;
        if (!username) {
            setValues({ ...values, usernameErr: 'Username is required' });
            isReq = false;
        } else if (username.length < 5) {
            setValues({ ...values, usernameErr: 'Username must be 5 characters long' });
            isReq = false;
        }
        if (!password) {
            setValues({ ...values, passwordErr: 'Password is required' });
            isReq = false;
        } else if (password.length < 6) {
            setValues({ ...values, passwordErr: 'Password must be 6 characters long' });
            isReq = false;
        }
        if (!email) {
            setValues({ ...values, emailErr: 'Email is required' });
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({ ...values, emailErr: 'Email is invalid' });
            isReq = false;
        }

        return isReq;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isReq = validate();
        if (isReq) {
            axios.post('https://micolsmovieapp.herokuapp.com/users', {
                Name: name,
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful, go ahead and login!');
                    window.open('/', '_self');
                })
                .catch(response => {
                    console.error(response);
                    alert('unable to register');
                });
        }

        //console.log(username, password, email, birthday);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        // props.onRegistration(username);
    };

    return (
        <Row className='mt-5'>
            <Col md={12}>
                <Form>
                    <h3>Registration Page</h3>
                    <p></p>

                    <Form.Group constrolId="formUsername" className="reg-form-inputs">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        {values.usernameErr && <p>{values.usernameErr}</p>}
                    </Form.Group>

                    <Form.Group constrolId="formPassword" className="reg-form-inputs">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        {values.passwordErr && <p>{values.passwordErr}</p>}
                    </Form.Group>

                    <Form.Group constrolId="Email" className="reg-form-inputs">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        {values.emailErr && <p>{values.emailErr}</p>}
                    </Form.Group>

                    <Form.Group constrolId="updateBirthday" className="reg-form-inputs">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>

                    {/*<label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    Email-Id:
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <label>
                    Birthday:
                </label>
        <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)}/>*/}
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                    <p></p>
                    <p>Already registed? <Link to={'/'}>Click here</Link> to sign in</p>
                </Form>
            </Col>
        </Row>
    );
}

RegistrationView.propTypes = {
    //onRegistration: PropTypes.func.isRequired,
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
};