import React, { useState } from 'react';
import PropTypes from "prop-types";
import {Form, Button} from 'react-bootstrap';
import axios from 'axios';



export function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');
  // Declare hook for each input
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
  
  // validate user inputs
  const validate = () => {
      let isReq = true;
      if(!Username){
       setUsernameErr('Username Required');
       isReq = false;
      }else if(Username.length < 2){
       setUsernameErr('Username must be 2 characters long');
       isReq = false;
      }
      if(!Password){
       setPasswordErr('Password Required');
       isReq = false;
      }else if(Password.length < 6){
       setPasswordErr('Password must be 6 characters long');
       isReq = false;
      }

      return isReq;
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://micolsmovieapp.herokuapp.com/login', {
        Username: Username,
        Password: Password
      })
      .then(response => {
        console.log(response.data,'from handle');
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user', e)
      });
    }
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>

    </Form>
  );
}

LoginView.propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };
