import React, { Component } from 'react';
import axios from 'axios';

class BeersDetail extends Component {
    state = {
        beer: [],
        error: null
    }

    componentDidUpdate(){
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_BASE_URL}/beer/${this.props.match.params.id}/`,
            params: {
            withBreweries: "Y",
              key: `${process.env.REACT_APP_API_KEY}`
            }
          })
        .then(response => {
            let beer = response.data.data;
            this.setState({beer});
          })
          .catch (error => {
            this.setState({error});
          })
    }

    render() {
        // let beer = this.state.beers.find(beer => beer.id === this.props.match.params.id);
        let beer = this.state.beer;
        if (beer.length === 0){
            return <h1>Loading...</h1>
        } 
        return (
          <div className="beersdetail">
            <table className="table">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{beer.nameDisplay}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        {(beer.style === undefined || beer.style.description === undefined) ? <td>No description</td> : <td>{beer.style.description}</td>}
                    </tr>
                    <tr>
                        <td>Organic</td>
                        {beer.isOrganic === "Y" ? <td>Yes</td> : <td>No</td>}
                    </tr>
                </tbody>
            </table>
          </div>
        );
    }
}
  
export default BeersDetail;