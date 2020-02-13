import React from 'react';
import { Link } from 'react-router-dom';
import { BlockHeader, Logo } from './WithStyleHeader';

function Header() {
  // eslint-disable-next-line no-return-assign
  return (
    <div className="app">
      <BlockHeader>
        <Logo />
        <div>
          <i className="material-icons"></i>
          <Link to="/login" href="/login"><i className="fas fa-sign-out-alt" style={{ color: 'black' }}></i></Link>
        </div>
      </BlockHeader>
    </div>
  );
}
export default Header;
