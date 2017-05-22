import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
  Link
} from 'react-router-dom'
import Search from './Search.jsx';
import Item from './Item.jsx';

// functional stateless
const App = ({}) => (
    <Router history={hashHistory}>
        <div>
            <ul className="nav nav-tabs">
                <li><Link to="/">Search</Link></li>
            </ul>
            <Route exact path="/" render={(props)=><Search {...props} />} />
            <Route path="/search/:term" render={(props)=><Search {...props} />} />
            <Route path="/item/:id" render={(props)=><Item {...props} />} />
        </div>
    </Router>
);

export default App
