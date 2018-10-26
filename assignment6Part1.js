/**
 * data structures, assignment6, part1
 * write and execute a SQL query for your AA data to filter meetings 
 * based on parameters that would makes sense for your planned map. 
 * @author feiyi xu <xuf889@newschool.edu>
 * @date 10/21/18
 */
const { Client } = require('pg');
const cTable = require('console.table');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'xuf889';
db_credentials.host = 'mydbinstance.c4glsuhehspc.us-east-1.rds.amazonaws.com';
db_credentials.database = 'mydb';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query meetings on Monday and for beginners: 
var thisQuery = "SELECT mtgday, mtgperiod, mtglocation, mtgstaddress, mtgname mtgtype FROM aadata WHERE mtgday= 'Monday' and mtgtype = 'B = Beginners meeting';";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});