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
    this.recyleItem.S = recyleItem; 
    //this.recyleItem.itermName.S = recyleItem[0].toString();
    //this.recyleItem.specialNeed.BOOL = recyleItem[1]; 


    this.addressLocation = {};
    this.addressLocation.SS = addressLocation;
    //this.addressLocation.onCampus.BOOL = addressLocation[0]; 
    //this.addressLocation.wasteSeparation.S = addressLocation[1].toString();  
    //this.addressLocation.buildingInfo.S = addressLocation[2].toString(); 
    //this.addressLocation.streetAddress.S = addressLocation[3].toString(); 
    //this.addressLocation.specialNote.BOOL = addressLocation[4]; 

    
    this.hours = {}; 
    this.hours.SS = hours; 
    //this.hours.day.S = hours[0].toString(); 
    //this.hours.period.S = hours[1].toString(); 

    if (meteringAndControl != null){
      this.meteringAndControl = {}; 
      this.meteringAndControl.SS = meteringAndControl; 
    }

    
    //this.meteringAndControl.activity.S = meteringAndControl[0].toString(); 
    //this.meteringAndControl.energyType.S = meteringAndControl[1].toString(); 
    //this.meteringAndControl.amount.S = meteringAndControl[2].toString(); 

    }
}

//recyleEntries.push(new recyleEntry(["batteries", false], [true, "Batteries", "Sheila C.Johnson Design Center, 1st Floor", "66 Fifth Ave.", false], ["Friday", "7:30 a.m. - 11:00 p.m."], ["none", "none", "none"]));
//recyleEntries.push(new recyleEntry(["used computer", false], [true, "EWaste", "IT Central", "78 Fifth Ave.", false], ["Monday", "8:30 a.m. - 8:30 p.m."], ["none", "none", "none"]));
//recyleEntries.push(new recyleEntry(["cereal", false], [true, "food", "12th Floor Cafe", "6 East 16th St.", false], ["Tuesday", "4:00 a.m. - 6:30 p.m."], ["none", "none", "none"]));
recyleEntries.push(new recyleEntry("batteries", ["Batteries", "Sheila C.Johnson Design Center, 1st Floor", "66 Fifth Ave."], ["Friday", "7:30 a.m. - 11:00 p.m."]));
recyleEntries.push(new recyleEntry("used computer", ["EWaste", "IT Central", "78 Fifth Ave."], ["Monday", "8:30 a.m. - 8:30 p.m."]));
recyleEntries.push(new recyleEntry("cereal", ["food", "12th Floor Cafe", "6 East 16th St."], ["Tuesday", "4:00 a.m. - 6:30 p.m."], ["none", "none", "none"]));
console.log(recyleEntries);

/**
 * part3: populate your database  
 */
var async = require('async');
var i = 0; 
async.eachSeries(recyleEntries, function(value, callback) {
  var AWS = require('aws-sdk');
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = process.env.AWS_ID;
  AWS.config.secretAccessKey = process.env.AWS_KEY;
  AWS.config.region = "us-east-1";
  var dynamodb = new AWS.DynamoDB();

  var params = {};
  params.Item = recyleEntries[i]; 
  params.TableName = "recyleLog";
  i = i + 1; 
  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
  

  setTimeout(callback, 1000); 
}); 
