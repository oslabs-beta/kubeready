# OSP1-41

Intended Setup structure:

- Monitored app deployed as container in Docker and managed with K8
- Prometheus and Grafana exist independently of monitored app within Docker



Questions:

- How does Helm interact with Docker?
- How is ChartJS used - independently of Grafana?



Currently understood process (7/28/23):

- Install Minikube: `brew install minikube`
- Install Helm: `brew install helm`

- Start Minikube in Docker: `minikube start --driver=docker`

PROMETHEUS INSTALLATION
- Add official Prometheus Helm chart: `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`

  - (Comes from searching for Prometheus chart in Helm: `helm search hub prometheus`)

- Ensure charts are the most up to date version: `helm repo update`
- Install Prometheus with Helm: `helm install prometheus prometheus-community/prometheus`


- Lists everything deployed within Minikube: `kubectl get all`



CODE CLEANUP 8/8/23
- delete actions directory and actions.js?
- delete reducers and all enclosed files?
- App.jsx 
  - still has Serena's name on it AFAIK
  - cluster container??
- delete login.html?
- delete store.js?
- delete authController?
- i think i will need someone to cleanup grafana controller
- delete models and samplemodel.js?


