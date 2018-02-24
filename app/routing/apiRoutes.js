var tableData = require("../data/friends");
module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(tableData);
    });

    app.post("/api/friends", function (req, res) {
        tableData.push(req.body);
        var inputData = req.body.scores;
        var difArray = [];
        for (var tableI = 0; tableI < tableData.length - 1; tableI++) {
            console.log(`${tableData[tableI].name} ${tableData[tableI].scores}`);
            console.log(`User: ${inputData}`);
            var scoreArray = tableData[tableI].scores; // locate scores array within object
            var sumNumDif = 0; // setting sum of score differential

            // ~ Compare User Input results + Matches Input results 
            for (var compI = 0; compI < scoreArray.length; compI++) {
                var numDif = scoreArray[compI] > inputData[compI] ? scoreArray[compI] - inputData[compI] : inputData[compI] - scoreArray[compI]; // find number dif
                sumNumDif += numDif; // add all score difs
                var totalDif = sumNumDif; // pull out total dif
                console.log(`~numDif: (${scoreArray[compI]}) - (${inputData[compI]}) = ${numDif} / ~sumNumDif (${sumNumDif})`)
            }

            console.log("total diff: " + totalDif);
            tableData[tableI].dif = totalDif; // assign dif vale to totalDif
            difArray.push(totalDif); // push total dif to difArray
            console.log("difArray: " + difArray);
            console.log("-------------------------------");
        }

        console.log("Least Dif: " + Math.min(...difArray));
        const matchPosition = difArray.indexOf(Math.min(...difArray)); // index of lowest number
        console.log("~matchPosition: " + matchPosition);
        console.log("TableData: " + tableData[matchPosition].name);
        var endResult = tableData[matchPosition];
        console.log('End Result: ' + endResult);
        // module.exports = endResult;
        // return endResult;

        res.json(endResult);
    });

    app.post("/api/clear", function () {
        tableData = [];
        console.log(tableData);
    });
};