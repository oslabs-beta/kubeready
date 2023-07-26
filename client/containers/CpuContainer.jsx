//import all relevant components regarding CPU metrics
import CpuLimits from '../components/CpuLimits.jsx';
import CpuReq from '../components/CpuReq.jsx';
import CpuUtReq from '../components/CpuUtReq.jsx';

const CpuContainer = () => {
  //invoke children within this parent container
  return (
    <div>
      <CpuLimits />
      <CpuReq />
      <CpuUtReq />
    </div>
  );
};
export default CpuContainer;
