import React, { Component } from 'react'
import SearchForm from '../components/SearchForm';

export default class NavBar extends Component {
  render() {
    return (
        <header className="App-header circles">
          <h1 className="App-title">Food Recipes</h1>
          <SearchForm />
          
        </header>
    )
  }
}
