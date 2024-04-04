// Layout.js

import React from 'react';
import Navbar from './navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
