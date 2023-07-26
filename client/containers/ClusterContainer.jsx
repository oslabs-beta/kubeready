import React from 'react';
//import all of ClusterContainer children here
//makes sense bc ClusterContainer holds all various containers so should be parent to all of them
import CpuContainer from './CpuContainer.jsx';
import MemoryContainer from './MemoryContainer.jsx';
import NodesContainer from './NodesContainer.jsx';

const ClusterContainer = () => {
  //add state stuff here
  return (
    <div>
      {/* invoke other containers in cluster container */}
      <CpuContainer />
      <MemoryContainer />
      <NodesContainer />
    </div>
  );
};
//export it
export default ClusterContainer;
