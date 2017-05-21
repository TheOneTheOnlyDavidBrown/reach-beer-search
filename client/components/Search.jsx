import React from 'react';
import ItemList from './ItemList.jsx';

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
        return (
            <div style={this.styles.wrapper}>
                <form style={this.styles.form} onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input className="form-control" placeholder="Search beer keyword" ref="search"></input>
                    </div>
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>

                {((items) => {
                    // IIFE so a function can be in the jsx. there's probably a better way to do this because this is ugly
                    // only show if there are items in the list
                    if (items.length > 0) {
                        return (
                            <div>
                                <div>Results for {this.props.match.params.term}:</div>
                                <ItemList list={this.state.items}/>
                            </div>
                        );
                    }
                    else {
                        return (<div>Search by beer keyword above.</div>)
                    }
                })(this.state.items)}
            </div>
        );
    }
}
export default Search;
