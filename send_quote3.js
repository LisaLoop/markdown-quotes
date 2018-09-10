let process = require('process');
var fs = require('fs');

// read the project1.tasks
// process each line
// split line in pieces
// find last piece (should be a number)

// print cost

// task groups phases
// start and end dates
// calculate the dates
// print out html report 
// 



function makeQuote(fileName){
    let payroll = {"R1":10,"R2":20};
    // print the total project cost.
    let vat = 0.19;
    let total = 0;
    fs.readFile(fileName, function(err, data) {
        if(err) throw err;
        var array = data.toString().split("\n");
        for(i in array) {
            let line = array[i];
            if(line[0]==="-"){
                continue;
            }


            let parts = line.split(';');
            let taskName = parts[0];
            let duration = parseInt(parts[1],10);

            let resourceName = parts[2];
            var cost = payroll[resourceName];
            
            total += duration * cost;

            // console.log(parts[1]);



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
