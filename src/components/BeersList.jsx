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
    this.chooseCountry = this.chooseCountry.bind(this);
    this.getTypeList = this.getTypeList.bind(this);
    this.chooseType = this.chooseType.bind(this);
  }

  state = {
    beers: [],
    filteredBeers: [],
    countries: [],
    chosenCountry: "",
    types: [],
    chosenType: "",
    page: 1,
    nbOfPages: 1,
    error: null
  }

  componentDidMount(){
    this.getCountryList();
    this.getTypeList();
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
        let locations = response.data.data;
        let countries =[];
        locations.map(loc => {
          if (!countries.includes(loc.countryIsoCode)) countries.push(loc.countryIsoCode);
          return countries;
        })
        this.setState({countries});
    })
    .catch((error)=> {
      this.setState({error})
    })
  }

  chooseCountry(e){
    e.preventDefault();
    this.setState({chosenCountry : e.target.value})
    this.getBeers();
  }

  getTypeList() {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/categories/`,
      params: {
        key: `${process.env.REACT_APP_API_KEY}`
    }
    })
    .then(response => {
        let categories = response.data.data;
        let types =[];
        categories.map(loc => {
          if (!types.includes(loc.name)) types.push(loc.name);
          return types;
        })
        this.setState({types});
    })
    .catch((error)=> {
      this.setState({error})
    })
  }

  chooseType(e){
    e.preventDefault();
    console.log(this.state.chosenType);
    this.setState({chosenType : e.target.value})
    this.getBeers();
  }

  getNextPage() {
    this.setState({page: this.state.page + 1});
    this.getBeers();
  }

  render() { 
    return (
      <div>
        <div className="countainer">
          <div className="row d-flex justify-content-around">
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="country-select">Country</label>
                </div>
                <select className="custom-select" id="country-select"  onChange={this.chooseCountry}>
                  <option value="">-- Choose --</option>
                  {this.state.countries.map(country => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="type-select">Type</label>
                </div>
                <select className="custom-select" id="type-select"  onChange={this.chooseType}>
                  <option value="">-- Choose --</option>
                  {this.state.types.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="search">Search</label>
                </div>
                <input
                className="form-control"
                id="search"
                type="text"
                placeholder="Search"
                name="search"
                onChange={this.searchBeers}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-md-5 col-12 d-flex justify-content-around align-items-center">
            <p className="m-2 p-0">Page {this.state.page}/{this.state.nbOfPages}</p>
            <button className="p-2 m-2 btn btn-outline-dark" onClick={this.getNextPage}>Next page</button>
          </div>
          <div className="row">
            <div className="beerslist col-md-5 col-12">
              <div className="list-group">
                {
                  this.state.filteredBeers === 0 ?
                  <h1>Loading...</h1>:
                  this.state.filteredBeers.map(beer => 
                    {if (this.state.chosenCountry === "" && this.state.chosenType === ""){
                      return (
                        <div key={beer.id}>
                          <Link className="list-group-item list-group-item-action" to={`/beers/${beer.id}`}>
                            {(beer.labels === undefined || beer.labels.icon === undefined) ? <img src="https://i.pinimg.com/originals/c6/1c/a5/c61ca5bebd5fac190227f602ab0d6fe8.png" alt="beer"/> : <img src={beer.labels.icon} alt={beer.name}/>}
                            {beer.nameDisplay}
                          </Link>
                        </div>
                      )} else if (beer.breweries !== undefined && beer.breweries[0].locations[0].countryIsoCode === this.state.chosenCountry && this.state.chosenType === "") {
                      return (
                        <div key={beer.id}>
                          <Link className="list-group-item list-group-item-action" to={`/beers/${beer.id}`}>
                            {(beer.labels === undefined || beer.labels.icon === undefined) ? <img src="https://i.pinimg.com/originals/c6/1c/a5/c61ca5bebd5fac190227f602ab0d6fe8.png" alt="beer"/> : <img src={beer.labels.icon} alt={beer.name}/>}
                            {beer.nameDisplay}
                          </Link>
                        </div>
                      )} else if (this.state.chosenCountry === "" && beer.style !== undefined && beer.style.category.name === this.state.chosenType) {
                        return (
                          <div key={beer.id}>
                            <Link className="list-group-item list-group-item-action" to={`/beers/${beer.id}`}>
                              {(beer.labels === undefined || beer.labels.icon === undefined) ? <img src="https://i.pinimg.com/originals/c6/1c/a5/c61ca5bebd5fac190227f602ab0d6fe8.png" alt="beer"/> : <img src={beer.labels.icon} alt={beer.name}/>}
                              {beer.nameDisplay}
                            </Link>
                          </div>
                        )} else if (beer.breweries !== undefined && beer.breweries[0].locations[0].countryIsoCode === this.state.chosenCountry && beer.style !== undefined && beer.style.category.name === this.state.chosenType) {
                          return (
                            <div key={beer.id}>
                              <Link className="list-group-item list-group-item-action" to={`/beers/${beer.id}`}>
                                {(beer.labels === undefined || beer.labels.icon === undefined) ? <img src="https://i.pinimg.com/originals/c6/1c/a5/c61ca5bebd5fac190227f602ab0d6fe8.png" alt="beer"/> : <img src={beer.labels.icon} alt={beer.name}/>}
                                {beer.nameDisplay}
                              </Link>
                            </div>
                          )} 
                    }
                  )
                }
              </div>
            </div>
            <div className="col-md-7 col-12">
              <Route path="/beers/:id" component={BeersDetail} />
            </div>        
          </div>
        </div>
      </div>
    );
  }
}

export default BeersList;