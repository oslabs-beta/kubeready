const { spawnSync } = require('child_process');
const apitoken = require('../grafana/apitoken.json');
const panels = require('../grafana/panels.json');
const path = require('path');

//initialize an empty object that will house dashboard URL
const urlStorage = {};

const grafanaController = {
  getApiToken: (req, res, next) => {
    console.log('entered getApiToken in Grafana Controller');


    //try catch block
    //throw error if apitoken.json file is empty

    // Updated on Friday, October 6
    try {
      console.log('entered try block')
      const getToken = spawnSync(
        // 'curl -s -X POST -H "Content-Type: application/json" -H "Cookie: grafana_session=$session" -d \'{"name":"apikeycurl0", "role": "Admin"}\' http://localhost:3000/api/auth/keys > grafana/apitoken.json',
        // 'curl -s -X POST -H "Content-Type: application/json" -H "Cookie: grafana_session=$session" -d '{"name":"apikeycurl0", "role": "Admin"}\' http://localhost:3000/api/auth/keys > "$(pwd)/grafana/apitoken.json"',
        { stdio: 'inherit', shell: true }
      )

      const apiTokenData = fs.readFileSync('../grafana/apitoken.json', 'utf8');

      // if the file is empty or does NOT contain JSON...
      if (!apiTokenData.trim()) {
        throw new Error('api token is empty or does not contain valid JSON');
      };

      // parse the JSON data
      const apiToken = JSON.parse(apiTokenData);

      // persist through res.locals
      res.locals.apiToken = apiToken;
    } catch (error) {
      return next ({
        log: 'Error on grafanaController.getApiToken middleware.',
        status: 500,
        message: {
          err: 'An error occurred when trying to get the grafana API token.',
        }
      });
    }

    // if (getToken.stderr) {
    //   console.log(`getting grafana API token error: ${getToken.stderr}`);
    //   return next({
    //     log: 'Error on grafanaController.getApiToken middleware.',
    //     status: 500,
    //     message: {
    //       err: 'An error occurred when trying to get the grafana API token.',
    //     },
    //   });
    // }

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
    fetch('http://admin:prom-operator@localhost:3000/api/dashboards/db', {
      //add to method param of fetch req: to specify which HTTP method used in request
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apitoken.key}`,
        //  Authorization: 'Basic ' + btoa('admin:prom-operator'), // Encode credentials
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
          },
        });
      });
  },
};

module.exports = grafanaController;

/*

import dashboard from '../dashboards/dashboard.json';

//initialize an empty object that will house dashboard URL
const urlStorage = {};
//declare grafanaController object
const grafanaController = {
  //add generateDashboard method that takes in 3 objects: req, res, next
  generateDashboard: (req, res, next) => {
    //tracks the creation of a new dashboard
    res.locals.generatedDash = false;

    //if there's already a url, skip
    if (res.locals.URL) return next();
    
    //Send a POST request with details about the new dashboard. 
    fetch(localhost, {
      //add to method param of fetch req: to specify which HTTP method used in request
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
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
          panels: dashboard,
        },
        folderID: 0,
        folderUid: someNumber, //access from grafana? kuberready left this out, link talked about how this overrides folderid?
        message: '',
        overwrite: false,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        //Create a dashboard URL from the returned data. 
        const { uid } = data;
        urlStorage.dashboard = `http://localhost:3000/d/${uid}/kubereadyDashboard?orgId=1&refresh=5s`;
        res.locals.generatedDash = true;

        return next();
      })
      .catch((error) => {
        console.log(`could not fetch data or resolve promise, ${error}`);
        return next(error);
      });
  },
};

export default grafanaController;


*/