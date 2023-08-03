import { spawn, spawnSync } from 'child_process';

const installControler = {
  //Install Prometheus
  installPrometheus: (req, res, next) => {
    
    //Add the Prometheus repository to Helm. 
    const addRepo = spawnSync(
      'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts',
      { stdio: 'inherit', shell: true }
    )

    if (addRepo.stderr) {
      console.log(`helm repo add prometheus community error: ${addRepo.stderr}`);
      return next({
        log: 'Error on installPrometheus middleware.',
        status: 500,
        message: {err: 'An error occurred when trying to add the prometheus-community helm charts repo.'}
      })
    }

    //Update the prometheus-community repository. 
    const updateRepo = spawnSync(
      'helm repo update',
      { stdio: 'inherit', shell: true }
    )

    if (updateRepo.stderr) {
      console.log(`helm repo update error: ${updateRepo.stderr}`);
      return next({
        log: 'Error on installPrometheus middleware.',
        status: 500,
        message: {err: 'An error occurred when trying to update Helm repositories.'}
      })
    }

    //Install the kube-prometheus-stack Helm chart from the prometheus-community repository.
    //I'm not sure why we would need this if we have our own dashboard. 
    const installKubePromStack = spawnSync(
      'helm install prometheus prometheus-community/kube-prometheus-stack',
      { stdio: 'inherit', shell: true }
    )

    if (installKubePromStack.stderr) {
      console.log(`helm install prometheus prometheus-community/kube-prometheus-stack error: ${installKubePromStack.stderr}`);
      return next({
        log: 'Error on installPrometheus middleware.',
        status: 500,
        message: {err: 'An error occurred when trying to install Prometheus.'}
      })
    }
  },

  recreatePromGraf: (req, res, next) => {
    const kubectlGetPods = spawnSync('kubectl', ['get', 'pods'], { encoding: 'utf-8' });

    if (kubectlGetPods.stderr) {
      console.log(`kubectl get pods error: ${kubectlGetPods.stderr}`);
      return next({
        log: 'Error on embedGrafana middleware.',
        status: 500,
        message: {err: 'An error occurred when trying get a list of kubernetes pods.'}
      })
    }

    //  Assigning the console statement to a constant
    const kubectlGetPodsText = kubectlGetPods.stdout.split('\n');
    
    kubectlGetPodsText.forEach(line => {
      if (line.includes('prometheus-grafana')) pod = line.split(' ')[0];
    })

    //  Searching for the prometheus-grafana pod
    let pod;
    kubectlGetPodsText.forEach((line) => {
      if (line.includes('prometheus-grafana')) {
        pod = line.split(' ');
      }
    });

    const deleteConfigmap = spawnSync(
      'kubectl delete configmap prometheus-grafana', 
      { stdio: 'inherit', shell: true }
    );

    if (deleteConfigmap.stderr) {
      console.log(`deleting prometheus-grafana configmap error: ${deleteConfigmap.stderr}`);
      return next({
        log: 'Error on embedGrafana middleware.',
        status: 500,
        message: {err: 'An error occurred when trying to delete the prometheus-grafana Configmap.'}
      })
    };

    //  Applying custom yaml file
    const applyPromGrafYaml = spawnSync(
      'kubectl apply -f prometheus-grafana.yaml', 
      { stdio: 'inherit', shell: true }
    );

    if (applyPromGrafYaml.stderr) {
      console.log(`creating new prometheus-grafana configmap error: ${applyPromGrafYaml.stderr}`);
      return next({
        log: 'Error on embedGrafana middleware.',
        status: 500,
        message: {err: 'An error occurred when trying to create a new configmap with prometheus-grafana.yaml.'}
      })
    };

    //  Delete old prometheus-grafana pod
    const deletePromGrafPod = spawnSync(
      `kubectl delete pod ${pod}`, 
      { stdio: 'inherit', shell: true }
    );

    if (deletePromGrafPod.stderr) {
      console.log(`deleting prometheus-grafana configmap error: ${applyPromGrafYaml.stderr}`);
      return next({
        log: 'Error on embedGrafana middleware.',
        status: 500,
        message: {err: 'An error occurred when trying to delete the prometheus-grafana Configmap.'}
      })
    };

    const deleteOldPod = spawnSync(
      `kubectl delete pod ${pod}`, 
      { stdio: 'inherit', shell: true }
    );
  }
}

export default installController;