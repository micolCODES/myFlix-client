import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Route } from "react-router-dom";


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
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

      </div>
    );
  }
}