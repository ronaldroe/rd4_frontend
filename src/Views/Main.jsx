import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header, MenuPanel } from '../Partials';

import { Blog, Post } from '.';

const DATAURL = 'http://54.90.211.180/wp-json/wp/v2/posts';

export default class Main extends Component{

  constructor(){

    super();

    this.state = { 

      mainLoading: true,
      dataLoading: false,
      posts: [],
      errorText: null,
      menuPanelOpen: false

    };

  }

  render(){

    return (

      <Router>

        <Fragment>
  
          <Header
            headerH1={this.state.headerH1}
            headerH2={this.state.headerH2}
            headerH1Loaded={this.state.headerH1Loaded}
            headerH2Loaded={this.state.headerH2Loaded}
            mainLoading={this.state.mainLoading}
            dataLoading={this.state.dataLoading}
            writeHeader={this.writeHeader}
            toggleMainLoading={this.toggleMainLoading}
            errorText={this.state.errorText}
            toggleMenuPanel={this.toggleMenuPanel}
          />

          <div className={`main ${!this.state.mainLoading && !this.state.dataLoading ? 'loaded' : ''}`} onClick={() => this.toggleMenuPanel(false)}>

            <Route path="/blog" exact render={rProps => <Blog {...rProps} posts={this.state.posts} />} />

            <Route path="/404" exact  render={rProps => <Blog {...rProps} posts={this.state.posts} />} />

            <Route path="/blog/:post_slug" exact render={rProps => <Post {...rProps} posts={this.state.posts} />} />

          </div>

          <MenuPanel mainLoading={this.state.mainLoading} dataLoading={this.state.dataLoading} menuPanelOpen={this.state.menuPanelOpen} />

        </Fragment>

      </Router>

    );

  }

  toggleMenuPanel = setPanel => {

    this.setState(prevState => ({
      menuPanelOpen: typeof setPanel === 'boolean' ? setPanel : !prevState.menuPanelOpen
    }));

  }

  componentDidMount(){

    this.setState({dataLoading: true});

    fetch(DATAURL)
    .then(res => res.json())
    .then(posts => {

      localStorage.setItem('posts', JSON.stringify(posts));

      this.setState({posts: posts}, () => {
        this.setState({dataLoading: false});
        console.log(this.state.posts);
      });

    })
    .catch(err => {

      if(localStorage.getItem('posts')){

        this.setState({posts: JSON.parse(localStorage.getItem('posts'))}, () => {

          this.setState({
            dataLoading: false,
            errorText: 'Blog post data failed loading, but we loaded cached data so that you may continue browsing. You can also try refreshing the page, or come back later.'
          });

        });

      } else {

        this.setState({

          dataLoading: false,
          errorText: 'Blog post data failed loading. The remainder of the site is accessible, but to see blog posts, please come back later.'

        });

      }

    });

  }

  toggleMainLoading = setLoading => {

    this.setState(prevState => ({
      mainLoading: typeof setLoading === 'boolean' ? setLoading : !prevState.mainLoading
    }));

  }

};