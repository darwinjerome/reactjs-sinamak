import React, { Component } from 'react'
import RecipeItem from '../components/RecipeItem';

export default class Recipe extends Component {
  componentWillReceiveProps(){
    console.log("URL: " + this.props.post._embedded['wp:featuredmedia']['0'].source_url)
  }
  
  render() {
    return (
        <div className="App-content">
          <RecipeItem recipeid={this.props.match.params.id} ref="searchRecipe"/>
        </div>
    )
  }
}

