    var express = require("express");
    var path = require("path");
    var bodyParser = require ("body-parser");
    var csv = require("ya-csv");

    var app = express();
    app.use(express.static(path.join(__dirname, "")));

    app.use(bodyParser.urlencoded({extended:true}));

    app.get("/hello", function(request, response){
        response.sendfile(path.join(__dirname, "welcome.html"));

    });

    app.get("/world", function(request, response){
        response.sendfile(path.join(__dirname, "burgers.html"));

    });

app.post("/booking", function(request, response) {
    var name = request.body.name;
    var email = request.body.email;

    var database = csv.createCsvFileWriter("booking.csv", {"flags": "a"});

    var data = [name, email];
    database.writeRecord(data);
    database.writeStream.end();

    response.send("Thanks " + name + "! Your booking is confirmed.");

});




    var server = app.listen(8080, function(){

        var host = server.address().address;
        var port = server.address().port;
        console.log("Web app runing at http://%s:%s", host, port);
    });