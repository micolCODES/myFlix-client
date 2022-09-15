import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Row, Col, Card, Container, Form, Button } from 'react-bootstrap';
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
                    alert('Unable to register the user');
                });
        }
    };

    return (
        <Container className="mt-5">
          <Row className="justify-content-sm-center">
            <Col xs={12} sm={9} md={7} lg={6} xl={5}>
              <Card variant="light" bg="light">
                <Card.Body>
                  <h1>Sign Up</h1>
                  <Form>
                    <Form.Group className="mt-4 mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter your username"
                      />
                      {values.usernameErr && (
                        <p className="validation-message">{values.usernameErr}</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                      />
                      {values.passwordErr && (
                        <p className="validation-message">{values.passwordErr}</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                      />
                      {values.emailErr && (
                        <p className="validation-message">{values.emailErr}</p>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Birthdate</Form.Label>
                      <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(event) => setBirthday(event.target.value)}
                        // placeholder="Enter your birthdate."
                        // pattern="/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/"
                      />
                      {values.birthdayErr && (
                        <p className="validation-message">{values.birthdayErr}</p>
                      )}
                    </Form.Group>
                    <Button
                      className="mt-3"
                      type="submit"
                      variant="success"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
                <Card.Footer className="pr-0 my-0">
                  <Link to="/">
                    <Button className="col-10 offset-1" variant="link">
                      Already registered? Log In
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }

    /*return (
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

                    }
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
};*/