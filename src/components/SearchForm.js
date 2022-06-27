import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, fetchBreadcrumb, searchPosts } from '../reduxtools/actions/postActions';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class SearchForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: ''
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name] : e.target.value})
    
    //Execute fetchPosts if typing more than 3 letters
    if(e.target.value.length > 3){  
      this.props.searchPosts(e.target.value, 1)
      this.props.fetchBreadcrumb(e.target.value)
      
    }else if(e.target.value.length === 0){
      
      this.props.fetchPosts("all", 1)
      this.props.fetchBreadcrumb("all")
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
        
          <FormGroup onSubmit={this.onSubmit}>
            <InputGroup>
              <InputGroup.Addon  className="custom-search-icon" >
                <Glyphicon glyph="search" />
              </InputGroup.Addon>
              <FormControl 
                name="search" 
                type="text" 
                placeholder="Search food recipes" 
                className="custom-search-bar"
                value={this.state.search} onChange={this.onChange}  />
            </InputGroup>            
          </FormGroup>          
        
    )
  }
}

SearchForm.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  searchPosts: PropTypes.func.isRequired,
  fetchBreadcrumb: PropTypes.func.isRequired,
}

export default connect(null, { fetchPosts, fetchBreadcrumb, searchPosts })(SearchForm);