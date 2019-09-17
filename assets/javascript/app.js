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

var currentTime = moment();

// POPULATE FIREBASE DATABASE WITH INITIAL DATA

// CREATE ON CLICK EVENT TO CAPTURE FORM VALUES
$("#add-train").on("click", function(event) {

  event.preventDefault();

  trainName = $("#train-input").val().trim();
  trainDestination = $("#destination-input").val().trim();
  trainFrequency = $("#frequency-input").val().trim();
  firstTrain = $("#time-input").val().trim();

  //Console.log
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFrequency);
  console.log(firstTrain);

  database.ref().push({

    dbtrainName: trainName,
    dbtrainDestination: trainDestination,
    dbtrainFrequency: trainFrequency,
    dbfirstTrain: firstTrain

  })

  alert("Train added...!")

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#time-input").val("");

})

  database.ref().on("child_added", function(snap) {
    console.log(snap.val());

    var tName = snap.val().dbtrainName;
    var tDestination = snap.val().dbtrainDestination;
    var tFrequency = snap.val().dbtrainFrequency;
    var tFirstTrain = snap.val().dbfirstTrain;

    // Time calculations and conversions

    var tFirstTrainConverted = moment(tFirstTrain, "HH:mm").subtract(1, "years");
    console.log(tFirstTrain);
    console.log(tFirstTrainConverted);

    var currentTime = moment();
    console.log(currentTime);


    var diffTime = moment().diff(moment(tFirstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    trainMinutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trainMinutesAway);

    trainNextArrival = moment().add(trainMinutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(trainNextArrival).format("hh:mm"));




    var tr = $("<tr>")
    tr.append(
      "<td>" + tName + "</td>",
      "<td>" + tDestination + "</td>",
      "<td>" + tFrequency + "</td>",
      "<td>" + moment(trainNextArrival).format("hh:mm") +"</td>",
      "<td>" + trainMinutesAway + "</td>",
    )
    $("tbody").append(tr)
});

