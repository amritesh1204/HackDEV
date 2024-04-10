import React, { useState } from 'react';
import Layout from './layout';
import '../styles/about.css'

const About = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Layout>
      <div className='typewriter'>
        This is an example of how we are going to add a page here
        <button onClick={handleOpenPopup}>Buy Me Coffee</button>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <button onClick={handleClosePopup}>Close</button>
            <iframe src="https://rzp.io/l/HBD9xgr" title="Buy Me Coffee"></iframe>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default About
