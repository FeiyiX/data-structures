/**
 * data structures, assignment 9, part 1 
 * Create a table(s) in your database. 
 * @author feiyi xu <xuf889@newschool.edu>
 * @date 11/21/18
 */

// node-postagres is a collection of node.js modules for interfacing with your PostgreSQL database. 
const { Client } = require('pg');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object(); // initialize a new variable, db_credentials to store the AWS RDS Postgres database login credentials 
db_credentials.user = 'xuf889'; // user name
db_credentials.host = 'mydbinstance.c4glsuhehspc.us-east-1.rds.amazonaws.com'; // database endpoint address
db_credentials.database = 'mydb'; // database name 
db_credentials.password = process.env.AWSRDS_PW; // user password
db_credentials.port = 5432; // port #

// create an object with the AWS RDS Postgres database login credentials 
const client = new Client(db_credentials);
// connect to the database
client.connect();

// Sample SQL statement to create a table: 
//var thisQuery = "DROP TABLE sensorData;"; // delete the entire table

var thisQuery = "CREATE TABLE sensorData (sensorValue boolean, sensorTime timestamp DEFAULT current_timestamp, lightLevel int);";
//var thisQuery = "SELECT * FROM sensorData;";

// error messages
client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});