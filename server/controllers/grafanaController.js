const { spawnSync } = require('child_process');
const apitoken = require('../grafana/apitoken.json');
const panels = require('../grafana/panels.json');

//initialize an empty object that will house dashboard URL
const urlStorage = {};
//declare grafanaController object
const grafanaController = {
  getApiToken: (req, res, next) => {
    console.log('entered getApiToken in Grafana Controller');

    const getToken = spawnSync(
      'curl -s -X POST -H "Content-Type: application/json" -H "Cookie: grafana_session=$session" -d \'{"name":"apikeycurl0", "role": "Admin"}\' http://localhost:3000/api/auth/keys > grafana/apitoken.json',
      { stdio: 'inherit', shell: true }
    );

    if (getToken.stderr) {
      console.log(
        `getting grafana API token error: ${getToken.stderr}`
      );
      return next({
        log: 'Error on grafanaController.getApiToken middleware.',
        status: 500,
        message: {
          err: 'An error occurred when trying to get the grafana API token.',
        },
      });
    }

    return next();
  },
  //add generateDashboard method that takes in 3 objects: req, res, next
  generateDashboard: (req, res, next) => {
    console.log('entered generateDashboard in Grafana Controller');
    //tracks the creation of a new dashboard
    res.locals.generatedDash = false;

    //if there's already a url, skip
    if (res.locals.URL) return next();

    //Send a POST request with details about the new dashboard.
    fetch('http://localhost:3000/api/dashboards/db', {
      //add to method param of fetch req: to specify which HTTP method used in request
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apitoken.key}`
      },
      body: JSON.stringify({
        dashboard: {
          id: null,
          uid: null,
          title: 'kubeready',
          tags: ['templated'],
          timezone: 'browser',
          schemaVersion: 16,
          version: 0,
          refresh: '25s',
          panels: panels,
        },
        folderID: 0,
        message: '',
        overwrite: false,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log('retrieved data back from POST request');
        //Create a dashboard URL from the returned data.
        const { uid } = data;
        urlStorage.dashboard = `http://localhost:3000/d/${uid}/kubereadyDashboard?orgId=1&refresh=5s`;
        res.locals.generatedDash = true;
        console.log('a dashboard has been created');

        return next();
      })
      .catch((error) => {
        return next({
          log: `could not fetch data or resolve promise to the Grafana API, ${error}`,
          status: 500,
          message: {
            err: error,
          }
        });
      });
  }
};

module.exports = grafanaController;
