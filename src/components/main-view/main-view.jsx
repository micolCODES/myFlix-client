import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { NavBar } from '../nav-bar/nav-bar';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { connect } from 'react-redux';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://micolsmovieapp.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log('Error: ' + error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  /*setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }*/

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }



  render() {
    let { movies } = this.props;
    let { user } = this.state;

    /*if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>*/
    
    if (!movies)
    return <div className="main-view">The list is empty</div>;


    return (
      <Router>
        <NavBar user={user} />
        <Row className="main-view justify-content-md-center">
        <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            // #6
            return <MoviesList movies={movies}/>;
          }} />

          <Route
            path="/register"
            render={() => {
              return <RegistrationView />;
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => (
              <MovieView
                movie={movies.find((m) => m._id === match.params.movieId)}
              goBack={history.goBack}
              />
            )}
            />

            <Route
              path="/directors/:directorName"
              render={({ match, history }) => (
                <DirectorView
                  director={
                    movies.find(
                      (m) => m.director.name === match.params.directorName
                    ).director
                  }
                  directorMovies={movies.filter(
                    (m) => m.director.name === match.params.directorName
                  )}
                  goBack={history.goBack}
                />
              )}
            />

            <Route
              path="/genres/:genreName"
              render={({ match, history }) => (
                <GenreView
                  genreMovies={movies.filter(
                    (movie) => movie.genre.name === match.params.genreName
                  )}
                  genre={
                    movies.find(
                      (movie) => movie.genre.name === match.params.genreName
                    ).genre
                  }
                  goBack={history.goBack}
                />
              )}
            />

            <Route
              path="/users/:username"
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <ProfileView user={this.state.user} goBack={history.goBack} />
                );
              }}
            />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);