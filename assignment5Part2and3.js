/**
 * data structures, assignment5, part2 and 3 
 * @author feiyi xu <xuf889@newschool.edu>
 * @date 10/12/18
 */

 /**
  * part2: create some data for the table in your database 
  */
var recyleEntries = [];

class recyleEntry {
  constructor(recyleItem, addressLocation, hours, meteringAndControl) {
    this.recyleItem = {};
    this.recyleItem.itermName = recyleItem[0].toString();
    this.recyleItem.specialNeed = recyleItem[1]; 


    this.addressLocation = {};
    this.addressLocation.onCampus = addressLocation[0]; 
    this.addressLocation.wasteSeparation = addressLocation[1].toString();  
    this.addressLocation.buildingInfo = addressLocation[2].toString(); 
    this.addressLocation.streetAddress = addressLocation[3].toString(); 
    this.addressLocation.specialNote = addressLocation[4]; 

    
    this.hours = {}; 
    this.hours.day = hours[0].toString(); 
    this.hours.period = hours[1].toString(); 

    this.meteringAndControl = {}; 
    this.meteringAndControl.activity = meteringAndControl[0].toString(); 
    this.meteringAndControl.energyType = meteringAndControl[1].toString(); 
    this.meteringAndControl.amount = meteringAndControl[2].toString(); 

    }
}

recyleEntries.push(new recyleEntry(["batteries", false], [true, "Batteries", "Sheila C.Johnson Design Center, 1st Floor", "66 Fifth Ave.", false], ["Friday", "7:30 a.m. - 11:00 p.m."], ["none", "none", "none"]));
recyleEntries.push(new recyleEntry(["used computer", false], [true, "EWaste", "IT Central", "78 Fifth Ave.", false], ["Monday", "8:30 a.m. - 8:30 p.m."], ["none", "none", "none"]));
recyleEntries.push(new recyleEntry(["cereal", false], [true, "food", "12th Floor Cafe", "6 East 16th St.", false], ["Tuesday", "4:00 a.m. - 6:30 p.m."], ["none", "none", "none"]));
console.log(recyleEntries);

/**
 * part3: populate your database  
 */
var async = require('async');
var i = 0; 
async.eachSeries(recyleEntries, function(value, callback) {
  var AWS = require('aws-sdk');
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIAJEGF3IOZRX5PGM6A"; //process.env.AWS_ID;
  AWS.config.secretAccessKey = "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"; //process.env.AWS_KEY;
  AWS.config.region = "us-east-1";
  var dynamodb = new AWS.DynamoDB();

  var params = {};
  params.Item = recyleEntries[i]; 
  params.TableName = "recyleLog";
  i++; 

  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });


  setTimeout(callback, 1000); 
}); 
