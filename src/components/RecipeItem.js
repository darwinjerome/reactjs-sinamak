import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost } from '../reduxtools/actions/postActions';
import { Navbar, Glyphicon, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

let recipeId, recipeTitle, recipeImgsrc, recipeContent = "";

class RecipeItem extends Component {

  componentDidMount(){
    this.props.fetchPost(this.props.recipeid);
    window.scrollTo(0,0);
  }

  checkImgValue = (imgsrc) => {
    // This function handles undefined endpoints from json fetch
    // First check if featuredmedia is undefined, then check if valid source_url. Then it returns a valid image source.
    if (imgsrc._embedded['wp:featuredmedia'] === void(0) || imgsrc._embedded['wp:featuredmedia'] === undefined ){
      imgsrc = 'https://i.pinimg.com/originals/c5/e1/d6/c5e1d62c70209913d955cba454691728.gif';
      return imgsrc;
    }else{
      // if(imgsrc._embedded['wp:featuredmedia']['0'].media_details.sizes['square-thumbnail'].source_url === void(0) || imgsrc._embedded['wp:featuredmedia']['0'].media_details.sizes['square-thumbnail'].source_url === undefined){
      // }
      if (imgsrc._embedded['wp:featuredmedia']['0'].source_url === void(0) || imgsrc._embedded['wp:featuredmedia']['0'].source_url === undefined ){
        imgsrc = 'https://i.pinimg.com/originals/c5/e1/d6/c5e1d62c70209913d955cba454691728.gif';
        return imgsrc;
      }else{
        //return imgsrc._embedded['wp:featuredmedia']['0'].media_details.sizes['full'].source_url
        return imgsrc._embedded['wp:featuredmedia']['0'].media_details.sizes['square-thumbnail'].source_url
      }
    }
  }

  render() {
    if(this.props.post.title !== undefined){
      recipeId = this.props.post.id;
      recipeTitle = this.props.post.title.rendered;
      // recipeImgsrc = this.props.post._embedded['wp:featuredmedia']['0'].source_url;
      //recipeImgsrc = this.props.post._embedded['wp:featuredmedia']['0'].media_details.sizes['square-thumbnail-retina'].source_url;
      recipeImgsrc = this.checkImgValue(this.props.post);
      recipeContent = this.props.post.content.rendered.replace(/<img[^>]*>/g,"");
    }

    const navbar = (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={"/"}>
              <Button bsSize="large" bsClass="custom-button-back">
                <Glyphicon glyph="glyphicon glyphicon-chevron-left" aria-label="back" />
              </Button>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text>
            <Link to={"/"}>Home</Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to={"/"}>About</Link>
          </Navbar.Text>
          
        </Navbar.Collapse>
      </Navbar>
    )

    return (
      <div>
        <div className="parallax" style={{backgroundImage: 'url(' + recipeImgsrc + ')'}}>
          <div className="custom-spacer"></div>
        </div>
        
        <div className="recipe-container">
          {navbar}
          <div key={recipeId} className="custom-recipe custom-recipe-height-full">
            <h3>{recipeTitle}</h3>
            {/* <div className="img"><img width='160' alt={recipeTitle} src={recipeImgsrc} /></div> */}
            <p dangerouslySetInnerHTML={{__html: recipeContent}} className="resp-container" />         
          </div>
        </div>
      </div>
    )
  }
}

RecipeItem.propTypes = {
  fetchPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.posts.item
})

export default connect(mapStateToProps, { fetchPost })(RecipeItem);