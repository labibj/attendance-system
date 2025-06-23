// In your Icon.js or wherever Icon is defined
import React from 'react';

const Icon = ({ className }) => {
  // Assuming it renders some SVG or a component from an icon library
  return (
    <svg className={className} /* ... */ >
      {/* SVG path data or other icon content */}
    </svg>
  );
};

export default Icon; // Or export { Icon };