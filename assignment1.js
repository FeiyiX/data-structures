/**
 * data structures, assignment 1 
 * Make a request for each of the ten "Meeting List Agenda" pages for Manhattan, 
 * and save each of the body as a text file to the "local" environment  
 * @author feiyi xu <xuf889@newschool.edu>
 * @date 09/13/18
 * 
 */
 
// npm: makes it easy for JavaScript developers to share and reuse code, 
// and makes it easy to update the code that you're sharing. 

// install: node -v, npm -v, 
// To update npm: npm install npm@latest -g  

// request: the Request interface of the Fetch API represets a resource request. 
// Encounter a Request object 

// mkdir data

// Initialize variables 
var request = require('request');
var fs = require('fs');

var urlsBase = "https://parsons.nyc/aa/"; 
var urlsBranch = ["m01", "m02","m03","m04", "m05", "m06", "m07", "m08", "m09", "m10"]; 
var urlsTail = ".html"; 

/*
Notes 
let: Block Scope variables 
const:Block Scope constants 
var:  

Differences between let, var and const
const: the identifier cannot be reassigned
let: use 'let' when nned to reassign a variable, loops or mathematical algorithm 
var: 
source: https://dzone.com/articles/javascript-difference-between-var-let-and-const-ke 

asynchronicity: in a synchronous programming model,things happen one at a time. When you call a funtion that performs a long-running action, 
it returns only when the action has finished and it can return the result. This stops your program for the time the action takes. 
sournce: 
https://eloquentjavascript.net/11_async.html
https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5
*/

/*
for (var i = 0; i < urlsBranch.length; i++ ){
    console.log(urlsBranch[i]); 
    
    request(urlsBase+urlsBranch[i]+urlsTail, function(error, response, body){
        console.log(urlsBranch[i]); 
        if (!error && response.statusCode == 200) {
        
            fs.writeFileSync("/home/ec2-user/environment/Assignment1/data/"+urlsBranch[i]+".txt", body);
         }
        else {console.log("Request failed!")}
    });
}
*/

// forEach loop: executes a provided function once for each array element and is able to minimize asynchronicity 

/**
 * A method to make a request of each of the ten "Meeting List Agenda" pages for Manhattan
 * and save the body as a taxt file to a 'local' environment. 
 */ 
urlsBranch.forEach(function(branch) {
    request(urlsBase+branch+urlsTail, function(error, response, body){
        if (!error && response.statusCode == 200) {
        
            fs.writeFileSync("/home/ec2-user/environment/Assignment1/data/"+branch+".txt", body);
         }
        else {console.log("Request failed!")}
    });
    
});





