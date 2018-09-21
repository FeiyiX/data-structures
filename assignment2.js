/**
 * data structures, assignment 2 
 * Read the assigned AA text file, 
 * write a program in Node.js that will write a new text file 
 * that contains the street address for every meeting in your assigned AA file. 
 * @author feiyi xu <xuf889@newschool.edu>
 * @date 09/20/18
 * 
 */
 
// npm install cheerio

/**
 * Initialize variables
 */
// File System: the fs module provodes an API for interacting with the file system
// in a manner closely modeled aroudn standard POSIX functions. 
// All file system operations have synchronous and asynchronous forms. 
var fs = require('fs');

// Cheerio is a fast, flexible, and lean implementation of core jQuery (a JavaScript library) designed 
// specifically for the server. 
// In Cheerion, we use selectors to select tags of an HTML document, 
// The selector syntax was borrowed from jQuery. 
var cheerio = require('cheerio');

// Load the meeting text file into a variable, `content`
// this is the file that we created in the starter code from last week
// readFileSync() does not need a callback function. 
var content = fs.readFileSync('data/m09.txt');

// Load `content` into a cheerio object
var $ = cheerio.load(content);

/**
 * Locate the targeted street addresses and store the addresses to a varaible initialized as "result"
 */
// each() method is a cheerio loop 
var result= ""; 
$('td').each(function(i, elem){
    if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px") {
         result += $(elem).html().split("<br>")[2].trim()+'\n'; 
    }
}); 

/**
 * Print the targeted addresses to a text file and name it as "addressM09.txt" under the directory, "data." 
 */ 
fs.writeFileSync('data/addressesM09.txt', result);
    

