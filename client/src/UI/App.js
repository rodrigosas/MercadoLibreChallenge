import React, { Component } from 'react';
import ProductList from './_Components/ProductList.js'
import ProductDetail from './_Components/ProductDetail.js'
import SearchBar from './_Components/SearchBar'
import ItemsRules from '../Rules/ItemsRules'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = { query: "", itemsRes: {}, isFetching: false };
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange = (query) => {
    if (query==this.state.query) return;
    if(query=="") this.setState({query:""});
    this.setState({ query: query , isFetching:true})
    ItemsRules.getItemsByQuery(query).then((res) => {
        this.setState({itemsRes:res, isFetching:false});
    })
  }

  render() {
    return (<Router>
      <SearchBar onSearchChange={this.onSearchChange} query={this.state.query}>
      </SearchBar>

      <Switch className="content">
        <Route path="/items/:id" exact component={ProductDetail}>
          <ProductDetail></ProductDetail>
        </Route>
        <Route path="/items" exact render={(props) => (
          <ProductList {...props} items={this.state.itemsRes.items}
           categories={this.state.itemsRes.categories}
           isFetching={this.state.isFetching}
            onSearchChange={this.onSearchChange} />
        )}>
        </Route>
        <Route path="/" render={() => { return <div className="content"></div> }} exact>

        </Route>
      </Switch>
    </Router>
    )
  }
}



export default App;
