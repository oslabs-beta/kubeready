

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
      'helm install prometheus prometheus-community/kube-prometheus-stack'
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

  embedGrafana: (req, res, next) => {
    const child = spawnSync('kubectl', ['get', 'pods'], { encoding: 'utf-8' });


  }
}

export default installController;