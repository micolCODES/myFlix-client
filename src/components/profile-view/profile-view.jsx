import React from 'react';
import axios from 'axios';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
//import { FavoriteCard } from '../favorite-card/favorite-card';
import { Link } from "react-router-dom";
import '../profile-view/profile-view.scss';

export const ProfileView = (props) => {
  const { user, goBack, movies, handleFavorite } = props;
  console.log(props);
  const token = localStorage.getItem('token');

  const deleteAccount = () => {
    axios
      .delete(`https://micolsmovieapp.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert(`Your user account was deleted.`);
        localStorage.clear();
        window.open('/', '_self');
      })
      .catch((err) => console.log(err));
  };

  if (!user) {
      return <div>Loading userdetails..</div>;
  }
  console.log("User", user)
  return (
    
    <Container className="mt-4" style={{ width: '80%' }}>
      <h1>
        Profile of <span className="text-info">{user.Username}</span>
      </h1>
      <Button className="mb-4" variant="warning" onClick={goBack}>
        « Back
      </Button>

      <h3>
        Email: <span className="text-info fw-bold ml-4">{user.Email}</span>
      </h3>
      <h3>
        Birthday:{' '}
        <span className="text-info fw-bold">{`${user.Birthday.slice(
          5,
          7
        )}-${user.Birthday.slice(8, 10)}-${user.Birthday.slice(0, 4)}`}</span>
        <span id="mini" className="ml-2">
          (mm-dd-yyyy)
        </span>
      </h3>
      <h2 className="subtitle mt-4">Favorite Movies:</h2>
      {user.FavoriteMovies.length !== 0 ? (
        <Row className="justify-content-center mt-3">
          {user.FavoriteMovies.map((movieId) => {
            let movie = movies.find((m) => m._id === movieId);
            return (
              <Card>
                <Card.Img variant="top" src={movie.imageURL} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.synopsis}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
                  <Link to={`/users/${user.Username}`}>
                    <Button variant="primary" onClick={() => { handleFavorite(movie._id, "remove") }}>Remove</Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      ) : (
        <h2 className="subtitle">
          <span className="text-danger">
            You don't have movies in your favorite movies list.
          </span>
        </h2>
      )
      }
    </Container >
  );
};