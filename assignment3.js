/**
 * data structures, assignment 3 
 * Write a script that makes a request to the Texas A&M Geoservices Geocoding APIs for each address, 
 * using the address data you parsed in Weekly Assignment 2. 
 * @author feiyi xu <xuf889@newschool.edu>
 * @date 09/27/18
 */

/**
 * Initialize variables 
 */
var request = require('request'); // npm install request
var async = require('async'); // npm install async, is a utility module which provides straight-forward, 
                              //powerful functions for working with asynchronous JavaScript
var fs = require('fs');
var addresses = []; // create an empty array to store the addresses in a required format. 
var apiKey = process.env.MY_KEY; // environment variable can affect the way running processes will behave on a computer. 

var meetingsData = []; // create an empty array to store the API data. 

var content = fs.readFileSync('data/addressesM09.txt'); //read the addresses file obtained from the previous assignment. 

/**
 * Modify the address data to prepare them for the API queries and store them in an array. 
 */
// Seperate each address by line. 
var tmp = content.toString().split('\n'); 
// Save each address to an array as required. 
for (var i=0; i < tmp.length - 1; i++){
     addresses.push(tmp[i].split(",")[0]); 
}

/**
 * Request the API data from Texas A&M Geoservices Geocoding APIs website. 
 */
// eachSeries in the async module iterates over an array and operates on each item in the array in series

async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20'); // apiKey, version, streetAddress, city, state, 
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey; //%20 space in url 
    apiRequest += '&format=json&version=4.01';
    // streetAddress = 66%20Fifth%20Avenue&city=New%20York&state=NY%20...;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            // Create a variable to store geo info of the addresses obtain from GeoServices 
            var tamuGeo = JSON.parse(body);
            
            // Create an object with keys (street, latitude, longitude) to store the corresponding values. 
            var tmp={};
            tmp.street = tamuGeo.InputAddress.StreetAddress; 
            tmp.latitude = tamuGeo.OutputGeocodes[0].OutputGeocode.Latitude; 
            tmp.longitude = tamuGeo.OutputGeocodes[0].OutputGeocode.Longitude; 
            meetingsData.push(tmp); 
        }
    });
    setTimeout(callback, 2000);
}, function() {
    //Print the latitude and longtude info of the streetes to a JSON file and name it as "first.json" under the directory, "data." 
    fs.writeFileSync('data/first.json', JSON.stringify(meetingsData));
});