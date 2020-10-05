import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import BeersDetail from './BeersDetail';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.searchBeers = this.searchBeers.bind(this);
    }

    state = {
        beers: null,
        filteredBeers: null
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
            this.setState({filteredBeers: response.data.data});
        })
        .catch (error => {
            this.setState({error});
        })
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
            </div>
            <div className="container">
            <div className="row">
              <div className="beerslist col-md-5 col-12">
                <div className="list-group">
                  {
                    this.state.filteredBeers === 0 ?
                    <h1>Loading...</h1>:
                    this.state.filteredBeers.map(beer => 
                      <Link className="list-group-item list-group-item-action" to={`/beer/${beer.id}`}>
                        {(beer.labels === undefined || beer.labels.icon === undefined) ? <img src="https://i.pinimg.com/originals/c6/1c/a5/c61ca5bebd5fac190227f602ab0d6fe8.png" alt="beer"/> : <img src={beer.labels.icon} alt={beer.name}/>}
                        {beer.nameDisplay}
                      </Link>
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
        )
    }
}
