import React, { useState } from 'react';
import Layout from './layout';
import '../styles/about.css';
import person1 from '../images/chandler.png'; //me
import person2 from '../images/picofme.png';  //vrinda
import person3 from '../images/picofme (4).png'; //amritesh
import person4 from '../images/picofme (6).png'; //saakshi


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
        <p>Meet our secret society of talented individuals. Together, we make magic happen.</p>
        <div className="team-members">
          {/* Person 1 */}
          <div className="team-member">
            <img src={person1} alt="Person 1" className="team-member-image" />
            <h1 className="team-member-name">Chandan</h1>
          </div>
          {/* Person 2 */}
          <div className="team-member">
            <img src={person2} alt="Person 2" className="team-member-image" />
            <h1 className="team-member-name">Vrinda</h1>
          </div>
          {/* Person 3 */}
          <div className="team-member">
            <img src={person3} alt="Person 3" className="team-member-image" />
            <h1 className="team-member-name">Amritesh</h1>
          </div>
          {/* Person 4 */}
          <div className="team-member">
            <img src={person4} alt="Person 4" className="team-member-image" />
            <h1 className="team-member-name">Saakshi</h1>
          </div>
        </div>
        <button className='buy-coffee-btn' onClick={handleOpenPopup}>Buy Me Coffee</button>
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

export default About;
