import React from 'react';
import { Link } from 'react-router-dom';

import { FaEdit } from 'react-icons/fa';

const Blog = props => {

  let theExcerpts = renderExcerpts(props.posts);

  return(

    <div className="blog">

      <h2 className="page_title"><FaEdit size="2vmax" />Tips, Releases and Other Thoughts</h2>
    
      {theExcerpts}

    </div>

  );

}

const Excerpt = props =>{ 

  let thePost = props.post ? props.post : {};

  return(

    <article className={`post excerpt ${thePost.slug}`} >
    
    <header className="article_header">
    
      <Link to={`/blog/${thePost.slug}`}>
        <h3 dangerouslySetInnerHTML={{__html: thePost.title.rendered}}></h3>
      </Link>

    </header>

      <div dangerouslySetInnerHTML={{__html: thePost.excerpt.rendered}} className="the_content"></div>

    </article>

  );

};

const renderExcerpts = posts => {

  return posts.map((post, i) => (
    <Excerpt post={post} key={i} />
  ));

}

export default Blog;

export { Excerpt };