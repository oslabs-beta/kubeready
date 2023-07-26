//import all components regarding memory metrics
import MemoryReq from '../components/MemoryReq.jsx';
import MemoryUtAct from '../components/MemoryUtAct.jsx';
import MemoryLimits from '../components/MemoryLimits.jsx';

const MemoryContainer = () => {
  //invoke all children inside MemoryContainer
  return (
    <div>
      <MemoryReq />
      <MemoryUtAct />
      <MemoryLimits />
    </div>
  );
};
export default MemoryContainer;
