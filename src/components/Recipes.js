import React from 'react';

const Recipes = (props) => {  
  
  return (
    <div className="recipe-container">
      <div className="breadcrumb">
        You're viewing {props.breadcrumb}.
        <hr className="hairline"/>
      </div>
      
      {props.posts}
    </div>
  )
}
export default Recipes;