import React from 'react';
import { createStore } from 'react';
import moviesApp from './reducers/reducers';
import { provider} from 'react-redux';
import MainView from './components/main-view/main-view';

function App() {
    const myFlixStore = createStore(moviesApp)
    return (
        <Provider store={myFlixStore}>

        </Provider>
    );
}

export default App;