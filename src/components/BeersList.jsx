import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import BeersDetail from './BeersDetail';
import '../layouts/BeersList.css'
import axios from 'axios';


class BeersList extends Component {

  constructor(props) {
    super(props);
    this.searchBeers = this.searchBeers.bind(this);
    this.getBeers = this.getBeers.bind(this);
    this.getNextPage = this.getNextPage.bind(this);
    this.getCountryList = this.getCountryList.bind(this);
  }

  state = {
    beers: [],
    filteredBeers: [],
    countries: [],
    chosenCountry: "",
    page: 1,
    nbOfPages: 1,
    error: null
  }

  componentDidMount(){
    this.getCountryList();
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/beers/`,
      params: {
        withBreweries: "Y",
        p: `${this.state.page}`,
        key: `${process.env.REACT_APP_API_KEY}`
      }
    })
    .then(response => {
      debugger
      let beers = response.data.data;
      this.setState({beers, filteredBeers: beers, nbOfPages: response.data.numberOfPages});
    })
    .catch (error => {
      this.setState({error});
    })
  }

  getBeers() {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/beers`,
      params: {
        withBreweries: "Y",
        p: `${this.state.page+1}`,
        key: `${process.env.REACT_APP_API_KEY}`
      }
    })
    .then(response => {
      debugger
      let beers = response.data.data;
      this.setState({beers: beers, filteredBeers: beers, nbOfPages: response.data.numberOfPages});
    })
    .catch (error => {
      this.setState({error});
    })
  }

  searchBeers(e){
    let searchTerm = e.target.value;
    if (searchTerm.length === 0){
        return this.setState({filteredBeers: this.state.beers})
    }
    axios({
        method: 'GET',
        url:`${process.env.REACT_APP_BASE_URL}/search?q=${searchTerm}`,
        params: {
            key: `${process.env.REACT_APP_API_KEY}`
        }
    })
    .then(response => {
      (response.data.data === undefined) ?
        this.setState({filteredBeers: []}) :
        this.setState({filteredBeers: response.data.data});
    })
    .catch (error => {
        this.setState({error});
    })
  }

  getCountryList() {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/locations/`,
      params: {
        key: `${process.env.REACT_APP_API_KEY}`
    }
    })
    .then(response => {
        debugger
        let locations = response.data.data;
        let countries =[];
        locations.map(loc => {
          if (!countries.includes(loc.countryIsoCode)) countries.push(loc.countryIsoCode);
          return countries;
        })
        this.setState({ countries });
        console.log(this.state.countries);
    })
    .catch((error)=> {
      this.setState({error})
    })
  }

  chooseCountry(e){
    e.preventDefault();
    let chosenCountry = this.state.chosenCountry;
    chosenCountry[e.target.name] = e.target.value;
    this.setState({chosenCountry})
    this.getBeers();
  }

  getNextPage() {
    this.setState({page: this.state.page + 1});
    this.getBeers();
  }

  render() { 
    return (
      <div>
        <div>
          <input
          type="text"
          className="input search-bar"
          placeholder="Search"
          name="search"
          onChange={this.searchBeers}
          />
          <label for="country-select">Choose a country:</label>
          <select id="country-select">
              <option value="">--Please choose a country--</option>
              {this.state.countries.map(country => (
                <option key={country} value={country}>
                    {country}
                </option>
              ))}
          </select>
        </div>
        <div className="container">
          <div className="row">
            <button className="col-md-3 col-12" onClick={this.getNextPage}>Next page</button>
            <p className="col-md-2 col-12">Page {this.state.page}/{this.state.nbOfPages}</p>
          </div>
          <div className="row">
            <div className="beerslist col-md-5 col-12">
              <div className="list-group">
                {
                  this.state.filteredBeers === 0 ?
                  <h1>Loading...</h1>:
                  this.state.filteredBeers.map(beer => 
                    <div key={beer.id}>
                      <Link className="list-group-item list-group-item-action" to={`/beer/${beer.id}`}>
                        {(beer.labels === undefined || beer.labels.icon === undefined) ? <img src="https://i.pinimg.com/originals/c6/1c/a5/c61ca5bebd5fac190227f602ab0d6fe8.png" alt="beer"/> : <img src={beer.labels.icon} alt={beer.name}/>}
                        {beer.nameDisplay}
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="col-md-7 col-12">
              <Route path="/beer/:id" component={BeersDetail} />
            </div>        
          </div>
        </div>
      </div>
    );
  }
}

export default BeersList;