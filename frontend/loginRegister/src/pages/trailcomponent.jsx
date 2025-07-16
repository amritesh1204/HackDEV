import React, { useState } from 'react';
import { useTrail, a } from '@react-spring/web';
import '../styles/modules.css'; // Import CSS file

const TrailItem = ({ height, style, children }) => (
  <a.div style={{ ...style, height }} className="trailsText"> {/* Apply class name */}
    {children}
  </a.div>
);

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 80 : 0, // Adjust height to match CSS
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div className="container"> {/* Apply class name */}
      {trail.map(({ height, ...style }, index) => (
        <TrailItem key={index} height={height} style={style}>
          {items[index]}
        </TrailItem>
      ))}
    </div>
  );
};

const ReusableTrailComponent = () => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => setOpen((prevState) => !prevState);

  return (
    <div onClick={toggleOpen}>
      <Trail open={open}>
        <span>You live in</span>
        <span>sunlight,</span>
        <span>I grew</span>
        <span>in dark</span>
      </Trail>
    </div>
  );
};

export default ReusableTrailComponent;
