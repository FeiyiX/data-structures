/**
 * data structures, assignment6, part2
 * write and execute a NoSQL query for your Dear Diary data in DynamoDB to filter diary entries 
 * based on parameters that would makes sense for your interface. 
 * @author feiyi xu <xuf889@newschool.edu>
 * @date 10/26/18
 */

// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "recycleLog",
    KeyConditionExpression: "#ws = :wasteSeparation and dt between :minDate and :maxDate", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#ws" : "wasteSeparation"
    },
    ExpressionAttributeValues: { // the query values
        ":wasteSeparation": {S: "batteries"},
        ":minDate": {N: new Date("September 1, 2018").valueOf().toString()},
        ":maxDate": {N: new Date("October 16, 2018").valueOf().toString()}
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});