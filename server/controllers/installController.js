// import { spawn, spawnSync } from 'child_process';
const { spawn, spawnSync } = require('child_process');

const installController = {
  installPrometheus: (req, res, next) => {
    //Add the Prometheus repository to Helm.
    const addRepo = spawnSync(
      'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts',
      { stdio: 'inherit', shell: true }
    );

    if (addRepo.stderr) {
      console.log(
        `helm repo add prometheus community error: ${addRepo.stderr}`
      );
      return next({
        log: 'Error on installPrometheus middleware.',
        status: 500,
        message: {
          err: 'An error occurred when trying to add the prometheus-community helm charts repo.',
        },
      });
    }

    //Update the prometheus-community repository.
    const updateRepo = spawnSync('helm repo update', {
      stdio: 'inherit',
      shell: true,
    });

    if (updateRepo.stderr) {
      console.log(`helm repo update error: ${updateRepo.stderr}`);
      return next({
        log: 'Error on installPrometheus middleware.',
        status: 500,
        message: {
          err: 'An error occurred when trying to update Helm repositories.',
        },
      });
    }

    //Install the kube-prometheus-stack Helm chart from the prometheus-community repository.
    //I'm not sure why we would need this if we have our own dashboard.
    const installKubePromStack = spawnSync(
      'helm install prometheus prometheus-community/kube-prometheus-stack',
      { stdio: 'inherit', shell: true }
    );

    if (installKubePromStack.stderr) {
      console.log(
        `helm install prometheus prometheus-community/kube-prometheus-stack error: ${installKubePromStack.stderr}`
      );
      return next({
        log: 'Error on installPrometheus middleware.',
        status: 500,
        message: {
          err: 'An error occurred when trying to install Prometheus.',
        },
      });
    }

    return next();
  },

  recreatePromGraf: (req, res, next) => {
    console.log('We entered the recreatePromGraf in the Install Controller');

    const deleteConfigmap = spawnSync(
      'kubectl delete configmap prometheus-grafana',
      { stdio: 'inherit', shell: true }
    );

    if (deleteConfigmap.stderr) {
      console.log(
        `deleting prometheus-grafana configmap error: ${deleteConfigmap.stderr}`
      );
      return next({
        log: 'Error on recreatePromGraf middleware.',
        status: 500,
        message: {
          err: 'An error occurred when trying to delete the prometheus-grafana Configmap.',
        },
      });
    }

    //  Applying custom yaml file
    const applyPromGrafYaml = spawnSync(
      'kubectl apply -f prometheus-grafana.yaml',
      { stdio: 'inherit', shell: true }
    );

    if (applyPromGrafYaml.stderr) {
      console.log(
        `creating new prometheus-grafana configmap error: ${applyPromGrafYaml.stderr}`
      );
      return next({
        log: 'Error on recreatePromGraf middleware. An error occurred when trying to create a new configmap with prometheus-grafana.yaml',
        status: 500,
        message: {
          err: 'An error occurred when trying to create a new configmap with prometheus-grafana.yaml.',
        },
      });
    }

    // Get a list of pods to find the full prometheus-grafana pod name, since this name varies by user.
    const kubectlGetPods = spawnSync('kubectl', ['get', 'pods'], {
      encoding: 'utf-8',
    });

    if (kubectlGetPods.stderr) {
      console.log(`kubectl get pods error: ${kubectlGetPods.stderr} `);
      return next({
        log: 'Error on recreatePromGraf middleware. An error occurred when trying get a list of kubernetes pods',
        status: 500,
        message: {
          err: 'An error occurred when trying get a list of kubernetes pods.',
        },
      });
    }

    //In an array, separate each line of the result of running "kubectl run pods".
    const kubectlGetPodsText = kubectlGetPods.stdout.split('\n');

    //Find the pod that contains "prometheus-grafana".
    let pod;
    kubectlGetPodsText.forEach((line) => {
      if (line.includes('prometheus-grafana')) pod = line.split(' ')[0];
    });

    //  Delete old prometheus-grafana pod
    const deletePromGrafPod = spawnSync(`kubectl delete pod ${pod}`, {
      stdio: 'inherit',
      shell: true,
    });

    if (deletePromGrafPod.stderr) {
      console.log(`deleting old pod error: ${deletePromGrafPod.stderr}`);
      return next({
        log: 'Error on recreatePromGraf middleware. An error occurred when trying to delete the old pod.',
        status: 500,
        message: {
          err: 'An error occurred when trying to delete the old pod.',
        },
      });
    }

    return next();
  },

  portForward: (req, res, next) => {
    //Declare a port to independently display and access Grafana.
    const PORT = 3000;

    //Asyncronously forward prometheus-grafana to the PORT.
    // const portFw = 
    spawn(
      `kubectl port-forward deployment/prometheus-grafana ${PORT}:80`,
      { shell: true }
    );
    

    //When the process has started, move on to the next middleware.
    portFw.on('spawn', () => {
      console.log(
        `The process of port forwarding to ${PORT} has started successfully.`
      );
      return next();
    });

    //If there's an error,
    portFw.stderr.on('data', (data) => {
      console.log(
        `port forwarding prometheus-grafana to PORT ${PORT} \n error: ${portFw.stderr} \n data: ${data}`
      );
      return next({
        log: 'Error on portForward middleware.',
        status: 500,
        message: {
          err: `An error occurred when trying to forward the prometheus-grafana port to PORT ${PORT}.`,
        },
      });
    });

    setTimeout(() => {
      return next();
    }, 2000);

    // return next();
  },
};

module.exports = installController;
