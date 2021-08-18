import React from 'react';
import { Router } from '@reach/router'
import WelcomeToMovies from './components/WelcomeToMovies';
import Details from './components/Details';
import Favorites from './components/Favorites';
import Header from './components/Header';
import Login from './components/Login';
import LogReg from './views/LogReg';
import './App.css';

function App(props) {
  return (
    <div>
    <Header />
    <Router>
      <LogReg path='/logreg' />
      <Login path='/login'/>
      <WelcomeToMovies default path="/movie" />
      <Details  path="/movie/:id" />
      <Favorites path="/movie/favorites"/>
    </Router>
    </div>
  );
}

export default App;
