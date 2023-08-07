const allPanels = require('../panels/allPanels.json');

//initialize an empty object that will house dashboard URL
const urlStorage = {};
//declare grafanaController object
const grafanaController = {
  //add generateDashboard method that takes in 3 objects: req, res, next
  generateDashboard: (req, res, next) => {
    console.log('entered generateDashboard in Grafana Controller');
    //tracks the creation of a new dashboard
    res.locals.generatedDash = false;

    //if there's already a url, skip
    if (res.locals.URL) return next();

    console.log('res.locals.url DOES NOT EXIST YET');

    //Send a POST request with details about the new dashboard.
    fetch('http://localhost:3000/api/dashboards/db', {
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
          panels: allPanels,
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
        console.log(`could not fetch data or resolve promise, ${error}`);
        return next(error);
      });
  },
};

module.exports = grafanaController;
