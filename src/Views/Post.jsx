import React, { Component, Fragment } from 'react';

import { prettify } from '../Functions';

export default class Post extends Component {

  constructor(){

    super();

    this.state = {

      thePost: null

    };

  }

  componentDidMount(){

    let foundPost = this.props.posts.length > 0 ? this.props.posts.find(post => post.slug === this.props.match.params.post_slug) : null;


    //TODO: This isn't working when a user goes directly to the page.
    if(foundPost !== null && typeof foundPost !== 'undefined'){

      this.setState({thePost: foundPost});

    } else {

      this.props.history.push('/404');

    }

    prettify();
    window.scrollTo(0, 0);

  }

  render(){
    
    let thePost = this.state.thePost !== null ? <PostInner post={this.state.thePost} /> : null;

    return(

      <article className="post single">

        {thePost}
      
      </article>

    );

  }

};

const PostInner = props => (

  <Fragment>
      
    <header>
  
      <h2 className='page_title post' dangerouslySetInnerHTML={{__html: props.post.title.rendered}} ></h2>
  
    </header>

    <div className="post_content" dangerouslySetInnerHTML={{__html: props.post.content.rendered}}></div>

  </Fragment>

);