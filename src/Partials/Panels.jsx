import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const MenuPanel = props => {

  return (

    <ul className={`panel menu ${!props.mainLoading && !props.dataLoading && props.menuPanelOpen ? 'shown' : ''}`}>
    
      <MenuItem className="red" to="/blog"><FaEdit size="2vw" /> Writings</MenuItem>

    </ul>

  );

};

const MenuItem = props => (

  <li className={`menu_item ${props.className ? props.className : ''}`}>

    <Link to={props.to}>
    
      {props.children}
    
    </Link>

  </li>

);

export { MenuPanel };