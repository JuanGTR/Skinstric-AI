import React from 'react';
import Button from './Button';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left-group">
        <span className="logo">SKINSTRIC</span>
        <nav className="main-nav">
          <ul>
            <li><a href="#" className="nav-item-intro">[ INTRO ]</a></li>
          </ul>
        </nav>
      </div>
      <Button className="enter-code-button">ENTER CODE</Button>
    </header>
  );
}

export default Header;