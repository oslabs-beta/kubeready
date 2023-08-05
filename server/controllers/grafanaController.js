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
