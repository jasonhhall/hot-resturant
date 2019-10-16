// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var currentReservation = [
  {
    resName: "Jason Hall",
    resPhoneNumber: "615-111-2222",
    resEmailAddress: "Jhall@test.net",
    res_id: "jhall-10-16-2019"
  }
];
var waitingList = [ 
    {
        resName: "Kate Rodgers",
        resPhoneNumber: "615-333-4444",
        resEmailAddress: "Krodgers@test.net",
        res_id: "krodger-10-16-2019"
    }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

// Displays all current reservation
app.get("/api/tables", function(req, res) {
  return res.json(characters);
});

// Displays all waiting list
app.get("/api/waitlist", function(req, res) {
    return res.json(characters);
  });


// Create New Characters - takes in JSON input
app.post("/api/reservation", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newRes = req.body;

  console.log(newRes);

  if( currentReservation.length < 5 ){

    currentReservation.push(newRes);
  }
  else{
    waitingList.push(newRes);
  }

  res.json(newRes);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
