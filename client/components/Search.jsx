import React from 'react';
import ItemList from './ItemList.jsx';
import { Link } from 'react-router-dom'
class Search extends React.Component {
    constructor() {
        super();
        this.state = {items:[]};
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        const term = this.refs.search.value;
        if (!term) return;
        this.props.history.push(`/search/${term}`);
    }
    getItems(term) {
        // api page limit is 80
        fetch(`https://api.punkapi.com/v2/beers?per_page=80&beer_name=${term}`)
            .then(response=>response.json())
            .then((response) => {
                console.log('resp',response);
                this.setState({items: response});
            });
    }
    get styles() {
        const wrapper = {
            margin: '10px'
        }
        const form = {
            marginBottom: '10px'
        }
        return { wrapper, form };
    }
    componentWillReceiveProps(newProps) {
        if (!newProps.match.params.term) return;
        this.getItems(newProps.match.params.term);
    }
    componentDidMount() {
        if (!this.props.match.params.term) return;
        this.getItems(this.props.match.params.term);
    }
    render() {
        // arbitrarily choosing 40 as the threshold for bitterness.
        const listItems = this.state.items.map((item) =>
            <div key={item.id}>
                <i className="fa fa-beer" aria-hidden="true"></i> <Link to={'/item/'+item.id}>{item.name}</Link> ({item.abv}% ABV, {item.ibu < 40 ? 'bitter' : 'not bitter'})
            </div>
        );
        return (
            <div style={this.styles.wrapper}>
                <form style={this.styles.form} onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input className="form-control" placeholder="Search beer name/style" ref="search"></input>
                    </div>
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>

                {((items) => {
                    // IIFE so a function can be in the jsx. theres probably a better way to do this
                    // only show if there are items in the list
                    if (items.length > 0) {
                        return (
                            <div>
                                <div>Results for {this.props.match.params.term}</div>
                                {listItems}
                            </div>
                        );
                    }
                })(listItems)}
            </div>
        );
    }
}
export default Search;
