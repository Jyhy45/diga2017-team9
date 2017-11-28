import axios from 'axios';

// Get all region level data
function getRegionLevels() {
// axios.get("url", {crossdomain: true})
  return new Promise((resolve, reject) => {
    axios.get("http://melatupa.azurewebsites.net/regionLevels")
    .then(results => {
        console.log("GET WAS SUCCESFULL");
        console.log(results);
        resolve(results.data);
    }).catch(error => {
        console.log(error);
        reject("Something went wrong @getRegionLevels()");
    })
});
}

// Get region data for a single region level
function getRegionLevelById(regionId) {
    return new Promise((resolve, reject) => {
    axios.get("http://melatupa.azurewebsites.net/regionLevels/" + regionId + "/regions")
    .then(results => {
        console.log("GET WAS SUCCESFULL regionId:" + regionId);
        console.log(results);
        resolve(results.data);
    }).catch(error => {
        console.log(error);
        reject("Something went wrong @getRegionLevelById()");
    })
});
}

// Get all data of a scenario collection
function getScenarioCollectionById(regionId, scenarioCollectionId) {
  return new Promise((resolve, reject) => {
    axios.get("http://melatupa.azurewebsites.net/scenarioCollection/" + scenarioCollectionId 
    + "/region/" + regionId)
    .then(results => {
        console.log("GET WAS SUCCESFULL regionId:" + regionId
        + " scenarioCollectionId:" + scenarioCollectionId);
        console.log(results);
        resolve(results.data);
    }).catch(error => {
        console.log(error);
        reject("Something went wrong @getScenarioCollectionById()");
    })
});
}

export default { getRegionLevels, getRegionLevelById, getScenarioCollectionById };