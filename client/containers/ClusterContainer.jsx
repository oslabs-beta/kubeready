import React from 'react';
// Importing all ClusterContainer children here
import CpuContainer from './CpuContainer.jsx';
import MemoryContainer from './MemoryContainer.jsx';
import NodesContainer from './NodesContainer.jsx';

const ClusterContainer = () => {
  return (
    <div>
      <CpuContainer />
      <MemoryContainer />
      <NodesContainer />
    </div>
  );
};

export default ClusterContainer;
