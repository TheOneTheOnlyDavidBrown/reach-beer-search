import React from 'react';

class ItemList extends React.Component {
    constructor() {
        super();
        this.state = {}
    }
    render() {
        const listItems = this.props.list.map((item) =>
          <li>{item.name}</li>
        );
        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}
export default ItemList;
