// Not being used currently

import React from 'react';
import kubereadylogo_transparent from '../assets/kubereadylogo_transparent.jpg';

const Header = () => {
  return (
    <div className='header'>
      <div className='content'>
        <img
          src={kubereadylogo_transparent}
          alt='Header Image'
          style={{ width: '200px', height: 'auto' }}
        />
      </div>
    </div>
  );
};

export default Header;
