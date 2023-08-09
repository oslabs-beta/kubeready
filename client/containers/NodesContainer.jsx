// Importing all components pertaining to node metrics
import NodeNum from '../components/NodeNum.jsx';
import NodesNotReady from '../components/NodesNotReady.jsx';
import NodesReady from '../components/NodesReady.jsx';
import PodCurrentStatus from '../components/PodCurrentStatus.jsx';
import RunningPods from '../components/RunningPods.jsx';

const NodesContainer = () => {
  return (
    <div>
      <NodeNum />
      <NodesNotReady />
      <NodesReady />
      <PodCurrentStatus />
      <RunningPods />
    </div>
  );
};
export default NodesContainer;
