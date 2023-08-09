// Importing all components pertaining to memory metrics
import MemoryReq from '../components/MemoryReq.jsx';
import MemoryUtAct from '../components/MemoryUtAct.jsx';
import MemoryLimits from '../components/MemoryLimits.jsx';

const MemoryContainer = () => {
  return (
    <div>
      <MemoryReq />
      <MemoryUtAct />
      <MemoryLimits />
    </div>
  );
};
export default MemoryContainer;
