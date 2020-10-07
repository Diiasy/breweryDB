import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavbarApp from './components/Navbar';
import Home from './components/Home';
import BeersList from './components/BeersList';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NavbarApp />
      <Route exact path="/" component={Home}/>
      <Route path="/beers" component={BeersList}/>
      <Route exact path="/about" component={About}/>
      <Footer />
    </div>
  );
}

export default App;
