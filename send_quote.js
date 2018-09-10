let process = require('process');
var fs = require('fs');


// fs.readFile('file.txt', function(err, data) {
//     if(err) throw err;
//     var array = data.toString().split("\n");
//     for(i in array) {
//         console.log(array[i]);
//     }
// });


// read the project1.tasks
// process each line
// split line in pieces
// find last piece (should be a number)

// print cost


function makeQuote(fileName){
    let hour_cost = 20;
    // print the total project cost.
    let vat = 0.19;
    let total = 0;
    fs.readFile(fileName, function(err, data) {
        if(err) throw err;
        var array = data.toString().split("\n");
        for(i in array) {
            let line = array[i];
            let parts = line.split(';');
            let taskName = parts[0];
            let duration = parseInt(parts[1],10);
            total += duration * hour_cost;

            console.log(parts[1]);


        }
        console.log("\n total="+ total);
        console.log("total with vat is ",total*vat);
    });
}

function main(){
    let fileName = process.argv[2];
    makeQuote(fileName);
}
main();
