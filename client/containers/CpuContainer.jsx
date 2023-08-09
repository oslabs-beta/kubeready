// Importing all relevant components pertaining to CPU metrics
import CpuLimits from '../components/CpuLimits.jsx';
import CpuReq from '../components/CpuReq.jsx';
import CpuUtReq from '../components/CpuUtReq.jsx';

const CpuContainer = () => {
  return (
    <div>
      <CpuLimits />
      <CpuReq />
      <CpuUtReq />
    </div>
  );
};
export default CpuContainer;
