/**
 *
 * SideBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Link, NavLink } from 'react-router-dom';
import './style.scss'

function SideBar(props) {
  console.log('SideBar', props)

  const { auth, isLogged, history, headermenu } = props

  const current = props.routes.filter((route)=>route.current)
  const routes = current.length ? current[0].children : [];

  const linkTo = (path) => {
    history.push(`${path}`)
  };


  const isCurrentPage = (pagePath) => {
    // console.log(pagePath, props.location.pathname)
    return new RegExp(`^\/${pagePath.replace("/", "\/")}(.*?)`).test(props.location.pathname);
  };


  return routes && routes.length > 0 ? (
    <div className="sidebar">
      <div className="scrollbar-container sidebar-nav ps ps-container">
        <ul className="nav">
          {routes.map((route) => (
            <li key={route.name} className="nav-item">
              <a className="nav-link" href={`${route.url ? route.url : route.path}`}>{route.name}</a>
            </li>)
          )}
        </ul>
      </div>
    </div>
  ) : null
}

SideBar.propTypes = {};

export default SideBar;