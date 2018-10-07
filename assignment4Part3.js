/**
 * data structures, assignment 4, part 3 
 * Populate your database
 * Use the pg module in Node to insert your AA data in the database you created.  
 * @author feiyi xu <xuf889@newschool.edu>
 * @date 10/05/18
 */

// node-postagres is a collection of node.js modules for interfacing with your PostgreSQL database. 
const { Client } = require('pg');
var async = require('async');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object(); // initialize a new variable, db_credentials to store the AWS RDS Postgres database login credentials 
db_credentials.user = 'xuf889'; // user name
db_credentials.host = 'mydbinstance.c4glsuhehspc.us-east-1.rds.amazonaws.com'; // database endpoint address
db_credentials.database = 'mydb'; // database name 
db_credentials.password = process.env.AWSRDS_PW; // user password
db_credentials.port = 5432; // port #

// initialize a variable to store the json file, an output from assignment4, as an object. 
var addressesForDb = require('./first.json');

/**
 *	Insert the values of "street", "latitude", and "longitude" to the table created in assignment4, part 2 in your database. 
 */
async.eachSeries(addressesForDb, function(value, callback) {
    // create an object with the AWS RDS Postgres database login credentials 
    const client = new Client(db_credentials);
    // connect to the database
    client.connect();
    
    // the values of "street", "latitude", and "longitude" and insert them to the table  
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.street + "', " + value.latitude + ", " + value.longitude + ");";
    
     // error messages
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    // callback function
    setTimeout(callback, 1000); 
}); 