console.log("hooked up");

var firebaseConfig = {
    apiKey: "AIzaSyD9l1BlRJzvoLbms79VJylZyTzBbC3BXXA",
    authDomain: "train-time-scheduler-54673.firebaseapp.com",
    databaseURL: "https://train-time-scheduler-54673.firebaseio.com",
    projectId: "train-time-scheduler-54673",
    storageBucket: "",
    messagingSenderId: "542954358785",
    appId: "1:542954358785:web:a63a5b1e2901a237f6d800"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

  // GLOBAL VARIABLES
var trainName;
var trainDestination;
var trainFrequency;
var firstTrain;

// EVERYTHING ABOVE ^^^^ GOES IN THE DATABASE
var trainNextArrival;
var trainMinutesAway;

// POPULATE FIREBASE DATABASE WITH INITIAL DATA

// CREATE ON CLICK EVENT TO CAPTURE FORM VALUES
$("#add-train").on("click", function(event) {

  event.preventDefault();

  trainName = $("#train-input").val().trim();
  trainDestination = $("#destination-input").val().trim();
  trainFrequency = $("#frequency-input").val().trim();
  firstTrain = $("#time-input").val().trim();

  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(firstTrain);

  database.ref().push({

    dbtrainName: trainName,
    dbtrainDestination: trainDestination,
    dbtrainFrequency: trainFrequency,
    dbfirstName: firstTrain

  })

    alert("Train added...!")

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#time-input").val("");

});