import React from 'react';
import axios from 'axios';

class Item extends React.Component {
    constructor() {
        super();
        this.state = {
            item:{
                ingredients:{
                    hops:[],
                    malt:[]
                },
                food_pairing: []
            }
        };
    }
    componentDidMount() {
        axios.get(`https://api.punkapi.com/v2/beers/${this.props.match.params.id}`)
            .then((response) => {
                console.log('response', response.data[0])
                this.setState({item: response.data[0]});
            });
    }
    get styles() {
        const img = {
            maxWidth: '100px'
        };
        const wrapper = {
            marginTop: '10px'
        };
        return { img, wrapper };
    }
    render() {
        const item = this.state.item;
        const hops = item.ingredients.hops.map((hopsItem, i) => (
            <span key={i}>{hopsItem.name} ({hopsItem.amount.value} {hopsItem.amount.unit}){i+1!==item.ingredients.hops.length? ', ' : '' } </span>
        ));
        const malts = item.ingredients.malt.map((maltItem, i) => (
            <span key={i}>{maltItem.name} ({maltItem.amount.value} {maltItem.amount.unit}){i+1!==item.ingredients.malt.length? ', ' : '' } </span>
        ));
        const pairings = item.food_pairing.map((pairing, i) => (
            <span key={i}>{pairing}{i+1 !== item.food_pairing.length ? ', ' : '' } </span>
        ));
        return (
            <div style={this.styles.wrapper}>
                <div className="col-xs-2"><img style={this.styles.img} src={item.image_url} /></div>
                <div className="col-xs-9">
                    <h1>{item.name}</h1>
                    <h3>{item.tagline}</h3>
                    <h4>{item.description}</h4>
                    <dl className="dl-horizontal">
                        <dt>ABV</dt>
                        <dd>{item.abv}%</dd>
                        <dt>IBU</dt>
                        <dd>{item.ibu}</dd>
                        <dt>Hops</dt>
                        <dd>{hops}</dd>
                        <dt>Malts</dt>
                        <dd>{malts}</dd>
                        <dt>Yeast</dt>
                        <dd>{item.ingredients.yeast}</dd>
                        <dt>Pairs with</dt>
                        <dd>{pairings}</dd>
                        <dt>Brewer's tips</dt>
                        <dd>{item.brewers_tips}</dd>
                   </dl>
                </div>
            </div>
        );
    }
}
export default Item;

