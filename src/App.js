import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavbarApp from './components/Navbar';
import BeersList from './components/BeersList';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <NavbarApp />
      <Route path="/" component={BeersList}/>
      <Route exact path="/search" component={Search}/>
    </div>
  );
}

export default App;
