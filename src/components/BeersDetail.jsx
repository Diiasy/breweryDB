import React, { Component } from 'react';

class BeersDetail extends Component {
    render() {
        console.log(this.props.beers)
        let beers = this.props.beers;
        let beer = beers.find(beer => beer.id === this.props.match.params.id);
        if (beer === undefined){
          return <h1>Select a beer</h1>
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
                        <td>ABV</td>
                        <td>{beer.abv}%</td>
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