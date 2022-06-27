import React, { Component } from 'react'
import Recipes from '../components/Recipes';
import Navbar from './NavBar'
import { connect } from 'react-redux';
import { fetchPosts } from '../reduxtools/actions/postActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Media, Grid, Row, Col } from 'react-bootstrap';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  componentDidUpdate(prevProps) {
    // If you receive next page on scroll: isLoading is false
    if (this.props.posts !== prevProps.posts) {
      this.setState({
        isLoading:false,
      })
    }
  }

  componentDidMount(){
    //First fetch
    if(this.props.posts.length === 0){
      this.props.fetchPosts("all", this.props.pagenum);
    }

    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if(
      (window.innerHeight+window.scrollY) >= (document.body.offsetHeight - 500) && 
      this.props.posts.length && !this.state.isLoading &&
      this.props.pagenum <= this.props.totalpages)
    {
        // update isLoading      
        this.setState({
          isLoading:true,
        })
        this.props.fetchPosts(this.props.breadcrumb, this.props.pagenum)  //fetch the next page of the request
    }
  }

  checkImgValue = (imgsrc) => {
    // This function handles undefined endpoints from json fetch
    // First check if featuredmedia is undefined, then check if valid source_url. Then it returns a valid image source.    
    if (imgsrc._embedded['wp:featuredmedia'] === void(0) || imgsrc._embedded['wp:featuredmedia'] === undefined ){
      imgsrc = 'https://i.pinimg.com/originals/c5/e1/d6/c5e1d62c70209913d955cba454691728.gif';
      return imgsrc;
    }else{
      if (imgsrc._embedded['wp:featuredmedia']['0'].source_url === void(0) || imgsrc._embedded['wp:featuredmedia']['0'].source_url === undefined ){
        imgsrc = 'https://i.pinimg.com/originals/c5/e1/d6/c5e1d62c70209913d955cba454691728.gif';
        return imgsrc;
      }else{
        return imgsrc._embedded['wp:featuredmedia']['0'].media_details.sizes['full'].source_url
      }
    }
  }

  mapPosts = () => {
    if (this.props.posts) {
      return (
        this.props.posts.map(
          recipe => (
            <Grid key={recipe.id}>
            <Row className="show-grid">              
              <Col xs={12} md={8} lg={6}>
                <Link className="custom-recipe-link" to={'/recipe/'+recipe.id} key={recipe.id}>
                  <Media className="custom-recipe custom-recipe-height-list">        
                    <Media.Left className="custom-recipe-img" style={{backgroundImage: 'url(' + this.checkImgValue(recipe) + ')'}} />
                    <Media.Body className="custom-margin-left">
                      <Media.Heading componentClass="h3">{recipe.title.rendered}</Media.Heading>
                      <p dangerouslySetInnerHTML={{__html: recipe.excerpt.rendered.replace(/<img[^>]*>/g,"").substring(0,200)}} />
                    </Media.Body>
                  </Media>
                </Link> 
              </Col>              
            </Row>
            </Grid>
          )
        )
      )
    }
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="spacer"></div>
        <div className="App-content">
          <Recipes keyword="all" posts={this.mapPosts()} breadcrumb={this.props.breadcrumb} />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  breadcrumb: state.posts.breadcrumb,
  pagenum: state.posts.pagenum,
  totalpages: state.posts.totalpages,
})

export default connect(mapStateToProps, { fetchPosts })(Home);