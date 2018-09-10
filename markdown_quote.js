let process = require('process');
var fs = require('fs');

// project title is #
// start date is *
// task groups phases are represented by ##
// tasks are represented by dashes
// tasks, may contain in any part of the line, the resource name
// start and end dates
// calculate the dates
// print out html report 
// task: - task name <duration> 
// comments: (stuff inside parenthesis)

function removeComments(str){
    var re = new RegExp("\\(.*\\)","gi");
    return str.replace(re,"").trim();
}
function parseDate(str){
    var parts = str.split("-");
    var year = parseInt(parts[0],10);
    var monthIndex = parseInt(parts[1],10) - 1; // *** substract one, js months go from 0-11
    var day = parseInt(parts[2],10);
    let dateObj = new Date(year, monthIndex, day)
    return dateObj;

}
function formatDate(date){
    let month=date.getMonth(); //returns num 0-11
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let monthName = monthNames[month];
    let dayOfMonth=date.getDate(); // day of month returns 1-31
    return monthName+" "+dayOfMonth;
}
function makeQuote(fileName){
    let payroll = {"R1":10,"R2":20};
    // print the total project cost.
    let vat = 0.19;
    let total = 0;
    let groupTotals = {};

    fs.readFile(fileName, function(err, data) {
        if(err) throw err;
        var currentGroup = "N/A";
        var array = data.toString().split("\n");
        var previousDate = new Date();// default 3 days in the future, if the file doesn't have a date.
        previousDate = addDaysToDate(3, previousDate);
        // console.log("previousDate ", previousDate);

        for(i in array) {
            
            let line = array[i];
            line = removeComments(line);
            if(line == ""||line.length==1){
    ///            console.log(line);
                continue
            }
            
            if(line[0] === '#' && line[1] === '#'){
                 currentGroup =line.substring(3);
            }
            if(line[0] === '*' ){ // * 2018-01-01

                previousDate = parseDate(line.substring(2).trim());
                console.log("previousDate on line 52 is ", previousDate);


           }


            // if line is task:
            // parse task
            


            // dash is a task
            if(line[0]==="-"){
                // parse line

                // determine duration

                // extract resource name
                // add total to groupTotals[currentGroup]

                let parts = line.split(new RegExp("\\s+","gi"));  
                //let taskName = parts[0];
                let duration = parseInt(parts[parts.length-1],10);
                
                //calculate dates:
                let dateCalc = addDaysToDate(duration,previousDate);
                
                var resource = "R1";
                for(var resourceName in payroll){
                    if(line.indexOf(resourceName) != -1){
                        resource = resourceName;
                        break;
                    }
                }
                // let resourceName = parts[2];
                var cost = payroll[resource];
                if(!(currentGroup in groupTotals)){
                    groupTotals[currentGroup] =0
                }
                groupTotals[currentGroup] += duration * cost;

                line +=' start:'+ formatDate(previousDate)+" end:"+ formatDate(dateCalc); 

                // move clock:
                previousDate = dateCalc;
            }
            console.log(line);
            // console.log(parts[1]);
        }
        console.log("\n### Summary\n");
        var total = 0;
        for(var i in groupTotals){
            console.log("* " + i+":"+groupTotals[i]);
            total += groupTotals[i]
        }
        // print all the group data and add it together
        console.log("### Total: "+ total);
        console.log("### VAT: ",total*vat);
    });
}
function addDaysToDate(days, dateObj){
    var date = new Date(dateObj);
    date.setDate(date.getDate() + days);
    // console.log("date is ",date);
    return date;
    
}
addDaysToDate(5,new Date());

function main(){
    let fileName = process.argv[2];
    makeQuote(fileName);
}
main();
