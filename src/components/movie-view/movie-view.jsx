import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';
//import { BrowserRouter as Router, Route } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, goBack, handleFavorite } = this.props;
    if (!movie) return <div></div>;
    return (
      <Row className="justify-content-center">
        <Col
          className="container p-3 justify-content-center"
          md={9}
          lg={7}
          xl={6}
        >
          <Row className="justify-content-start">
            <Col sm={6}>
              <img
                crossOrigin="anonymous"
                className="poster"
                src={movie.imageURL}
                alt="Poster from the movie"
              />
            </Col>
            <Col sm={6}>
              <div className="mt-2">
                <div className="title">{movie.title} </div>
                <div className="specs mt-2 bg-info">
                  <span className="mx-2">{movie.year}</span>
                </div>
                <div className="mt-3">
                  <span className="fw-bold">Genre: </span>
                  <Link to={`/genres/${movie.genre.name}`}>
                    <Button
                      variant="outline-dark"
                      className="ml-4 value text-uppercase"
                    >
                      {movie.genre.name}{' '}
                    </Button>
                  </Link>
                </div>

                <div className="mt-2">
                  <span className="fw-bold">Director: </span>
                  <Link to={`/directors/${movie.director.name}`}>
                    <Button variant="outline-dark" className="value ml-2">
                      {movie.director.name}
                    </Button>
                  </Link>
                </div>

                <div className="mt-2">
                  <span className="fw-bold">Overview</span>
                  <span className="value">: {movie.synopsis}</span>
                </div>
                <Link to={'/'}>
                  <Button className="my-4" variant="primary" onClick={() => { handleFavorite(movie._id, "add") }}>
                    Add to Favorites
                  </Button>
                </Link>

                <Button className="my-4" variant="warning" onClick={goBack}>
                  « Back
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );

    /*<div className="movie-view">
      <div className="movie-poster">
        <img src={movie.imageURL} />
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.title}</span>
      </div>
      <div className="movie-year">
        <span className="label">Year: </span>
        <span className="value">{movie.year}</span>
      </div>
      <div className="movie-director">
        <span className="label">Director: </span>
        <span className="value">{movie.director.name}</span>
        <Link to={`/directors/${movie.director.name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Route path="/directors/:name" render={({ match, history }) => {
          if (movies.length === 0) return <div className="main-view" />;
          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
        }
        } />
      </div>
      <div className="movie-actors">
        <span className="label">Actors: </span>
        <span className="value">{movie.actors}</span>
      </div>
      <div className="movie-genre">
        <span className="label">Genre: </span>
        <span className="value">{movie.genre.name}</span>
        <Link to={`/genres/${movie.genre.name}`}>
          <Button variant="link">Genre</Button>
        </Link>
      </div>
      <div className="movie-symnopsis">
        <span className="label">Synopsis: </span>
        <span className="value">{movie.synopsis}</span>
      </div>
      <button onClick={() => { onBackClick(null); }}>Back</button>

    </div>*/
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    imageURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number,
    description: PropTypes.string.isRequired,
  }).isRequired
};