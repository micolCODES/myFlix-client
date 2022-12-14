import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    console.log(movie)
    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.title}</div>;
  }
}