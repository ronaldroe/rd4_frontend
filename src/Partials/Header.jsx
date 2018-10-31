import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';

import { shuffle } from '../Functions';

export default class Header extends Component{

  constructor() {

    super();

    this.state = {
      
      headerH1Loaded: false,
      headerH2Loaded: false,
      headerH1: '',
      headerH2: '',

    };

  }

  render(){

    return(

      <header className={`site_header ${!this.props.mainLoading && !this.props.dataLoading ? 'loaded' : ''}`}>

        <div className="logo">
          <Link to="/">
            <h1 className={`logo_name ${this.state.headerH1Loaded ? 'loaded' : ''}`}>{this.state.headerH1}</h1>
          </Link>
          <Link to="/">
            <h2 className={`logo_tagline ${this.state.headerH2Loaded ? 'loaded' : ''}`}>{this.state.headerH2}</h2>
          </Link>
        </div>

        <div className="menu_button" onClick={this.props.toggleMenuPanel}>
          <FaBars size="3vmax" />
        </div>

        <div className="error">

          {this.props.errorText !== null ? this.props.errorText : null}

        </div>

      </header>

    );

  }

  componentDidMount(){

    // Start header animation
    let taglines = [
      'React Developer',
      'JavaScript Coder',
      'Frontend Dev',
      'Full Stack Developer',
      'Node.js Developer',
      'Code Warrior',
      'MERN Stack Dev'
    ];

    taglines = shuffle(taglines);
    
    taglines.push('</ > Web Developer');

    let startHeader = window.setInterval(() => {

      if(document.readyState === 'complete'){

        this.writeHeader('headerH1', 'headerH1Loaded', 'Ronald Roe', '<h1>', '_</h1>')
        .then(() => {

          this.writeHeader('headerH2', 'headerH2Loaded', '</ > Web Developer', '<h2>', '_</h2>')
          .then(() => {

            this.props.toggleMainLoading(false);

            let iterator = 0;

            let cycleHeader = window.setInterval(() => {
              
              if(iterator === taglines.length){
                
                window.clearInterval(cycleHeader);
                
              } else {

                this.writeHeader('headerH2', 'headerH2Loaded', taglines[iterator], '', '');

                iterator++;

              }


            }, 3000);

          });
          
        });

        window.clearInterval(startHeader);

      }

    }, 50);

  }

  writeHeader = (stateName, stateLoaded, textIn, leftTag, rightTag) => {

    let iterator = 0;

    return new Promise((res, rej) => {

      let writeInterval = window.setInterval(() => {

        this.setState({
          [stateName]: leftTag + textIn.slice(0, iterator) + rightTag
        }, () => {

          if(iterator === textIn.length){
            
            window.setTimeout(() => {
              
              this.setState({

                [stateName]: textIn,
                [stateLoaded]: true

              }, () => {

                window.clearInterval(writeInterval);
                res('done');

              });
              
            }, 300);
            
          }
          
        });
        
        iterator++;
        
      }, 100);
      
    });

  }

};