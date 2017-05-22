import React from 'react';
import ItemList from './ItemList.jsx';
import axios from 'axios';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        const term = this.refs.search.value;
        if (!term) return;
        this.props.history.push(`/search/${term}`);
    }
    getItems(term) {
        if (!term) return;
        // api page limit is 80
        axios.get(`https://api.punkapi.com/v2/beers?per_page=80&beer_name=${term}`)
            .then((response) => {
                console.log('resp',response.data);
                this.setState({items: response.data});
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
        this.getItems(newProps.match.params.term);
    }
    componentDidMount() {
        this.getItems(this.props.match.params.term);
    }
    render() {
        return (
            <div style={this.styles.wrapper}>
                <form style={this.styles.form} onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input className="form-control" placeholder="Search beer keyword" ref="search"></input>
                    </div>
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>

                <div style={this.state.items.length === 0 ? {display: 'inherit'} : {display: 'none'}}>
                    Search by beer keyword above.
                </div>
                <div style={this.state.items.length === 0 ? {display: 'none'} : {display: 'inherit'}}>
                    <div>Results for {this.props.match.params.term}:</div>
                    <ItemList list={this.state.items} />
                </div>
            </div>
        );
    }
}
export default Search;
