import React from 'react';

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
    componentDidMount(){
        fetch(`https://api.punkapi.com/v2/beers/${this.props.match.params.id}`).then((response)=>response.json())
            .then((response) => {
                console.log('response', response[0])
                this.setState({item: response[0]});
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
        // should be shorter line
        const hops = item.ingredients.hops.map((hopsItem, i) => (<span key={i}>{hopsItem.name} ({hopsItem.amount.value} {hopsItem.amount.unit}){i+1!==item.ingredients.hops.length? ', ' : '' } </span>));
        const malts = item.ingredients.malt.map((maltItem, i) => (<span key={i}>{maltItem.name} ({maltItem.amount.value} {maltItem.amount.unit}){i+1!==item.ingredients.malt.length? ', ' : '' } </span>));
        const pairings = item.food_pairing.map((pairing, i) => (<span key={i}>{pairing}{i+1 !== item.food_pairing.length ? ', ' : '' } </span>));
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

//abv: 4.6attenuation_level: 81.4boil_volume: {value: 25, unit: "liters"}brewers_tips: "Start the fermentation off at 20 ̊C and allow it to rise as high as 25 ̊C. This will increase the fruity character of the yeast."contributed_by: "Sam Mason <samjbmason>"description: "A session IPA brewed with a diverse grain bill, hopped with Simcoe and Amarillo and fermented with saison yeast, for an incredible level of depth in a low ABV beer. Spicy, fruity, complex, refreshing and dry."ebc: 15first_brewed: "06/2014"food_pairing: (3) ["Halibut with caper brown butter", "Creamy gorgonzola and satsuma salad", "Spicy Daal with garlic naan bread"]ibu: 30id: 61image_url: "https://images.punkapi.com/v2/61.png"ingredients: {malt: Array(6), hops: Array(2), yeast: "Wyeast 3711 - French Saison™"}method: {mash_temp: Array(1), fermentation: {…}, twist: "Cumin: 0.5g at end, Caraway: 1g at end, Peppercorns (Pink): 5g at end, Grains of Paradise: 5g at end"}name: "Magic Stone Dog (w/Magic Rock & Stone Brewing Co.)"ph: 4.4srm: 7.5tagline: "Session Farmhouse IPA - Stone / Magic Rock Collab."target_fg: 1008target_og: 1043volume: {value: 20, unit: "liters"}__proto__: Object
