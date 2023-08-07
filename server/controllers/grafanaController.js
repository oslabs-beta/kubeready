//imports
// we will create a panels folder that houses a custom generated dashboard in a json file.
//require dashboard from panels folder where custom dashboard lives.

//initialize an empty object that will house dashboard URL
const urlStorage = {};
//declare grafanaController object
const grafanaController = {
  //add generateDashboard method that takes in 3 objects: req, res, next
  generateDashboard: (req, res, next) => {
    //initialize a property on res.locals called generatedDash assigned to false
    //tracks the creation of a new dashboard for now default to false bc no dashboard has been created
    res.locals.generatedDash = false;
    //look up property on res.locals (URL) if that property exists return next passes control to next middleware or route handler
    //why: if URL property is truthy/exists would not need to fetch using POST method
    //bc the value for URL has already been set
    //dashboard already been generated and that URL exists so pass control to next mw in chain
    if (res.locals.URL) return next();
    //making a fetch req to to create a new dashboard on grafana server
    //send post req to specifiic URL with req body that contains details of dashboard to be generated
    fetch(localhost, {
      //add to method param of fetch req: to specify which HTTP method used in request
      method: 'POST',
      //add to headers param of fetch req: accept: to specify the content client will handle in response usually JSON format
      headers: {
        Accept: 'application/json',
        // add content type specifies what format the data in req body is being sent in (usually JSON Format)
        'Content-Type': 'application/json',
      },
      //add to body parameter of fetch request, will need to use stringify method to convert JS object
      //to a JSON string (send data over internet via http req put into format that is easily read)
      body: JSON.stringify({
        //add object that represents dashboard
        dashboard: {
          //null indicates new dashboard
          id: null,
          //null generates a new UID. UID: another unique identifier
          uid: null,
          //title of our dashboard in grafana
          title: 'kubeready',
          //add array of tags-assume these will be individual tags we can add to a the dashboard (CPU/Memory/etc?)
          tags: ['templated'],
          //timezone setting of dashboard, set to browser means will use timezone of user's browser
          timezone: 'browser',
          //version nums of schema, dashboard.
          schemaVersion: 16,
          version: 0,
          //dashboard will have a 25s refresh rate
          refresh: '25s',
          //kubernet added a panels property assuming we will have one also
          panels: importedVariableName,
        },
        folderID: 0,
        folderUid: someNumber, //access from grafana? kuberready left this out, link talked about how this overrides folderid?
        //commit message for version properties above
        message: '',
        //set overwrite to true to overwrite existing dashboard if UID matches, if set to false wont overwrite existing dashboard -confused about this, when would we
        //ever have matching UIDs?
        overwrite: false,
      }),
    })
      //extract response data from fetch request parse as JSON, invoke json() to convert data to JS object(parse)
      .then((data) => data.json())
      //handle promise from last then block passing in parsed data
      .then((data) => {
        //destructure uid property from data object
        //uid is how we will generate dashboard url
        const { uid } = data;
        //assign newly generated dashboard url using uid to url storage
        urlStorage.importedVariableName = //link with uid wrapped in TL
          //if new dashboard has been created and URL is stored in urlStorage update generatedDash to true
          res.locals.generatedDash = true;
        //pass control to next middleware or route handler
        return next();
      })
      //error at fetching or promise chaining route to this catch block
      .catch((error) => {
        console.log(`could not fetch data or resolve promise, ${error}`);
        //from here would go to global error handler to overwrite error
        return next(error);
      });
  },
};
//HELPFUL LINKS SENT BY DIANE/SERENA: ACCESSING THESE WILL HELP YOU GET A BETTER UNDERSTANDING OF MY THINKING REGARDING CODE IMPLEMENTATION!
// https://grafana.com/docs/grafana/latest/developers/http_api/dashboard/
// https://github.com/oslabs-beta/Kubernet/blob/main/server/controllers/grafanaController.ts

//export controller
export default grafanaController;