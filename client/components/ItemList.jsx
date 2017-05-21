import React from 'react';
import { Link } from 'react-router-dom'

// functional stateless component
const ItemList = ({list}) => (
    // arbitrarily choosing 40 as the threshold for bitterness.
    <div>
        {list.map((item) =>
             <div key={item.id}>
                 <i className="fa fa-beer" aria-hidden="true"></i> <Link to={'/item/'+item.id}>{item.name}</Link> ({item.abv}% ABV, {item.ibu >= 40 ? 'bitter' : 'not bitter'})
             </div>
        )}
    </div>
);

export default ItemList;
