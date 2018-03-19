


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBhIiXRXVN1zcAYYUbpcBp5jVfYAa4mFFY",
    authDomain: "train-times-813ec.firebaseapp.com",
    databaseURL: "https://train-times-813ec.firebaseio.com",
    projectId: "train-times-813ec",
    storageBucket: "",
    messagingSenderId: "779829375271"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

//   button for adding train info
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // create var. grab user input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var trainTime = $("#trainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    console.log(trainName, destination, trainTime, frequency)

    // Creates temp var to hold train data
    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        time: trainTime 
    };

    // uploads employee data to database
    database.ref().push(newTrain);

    // console logs info
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);

    // clears all of the text boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");
});

// Creates firebase event for adding trains to database and a row in the html when a user adds a train.
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    // console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().time;


    var converted = moment(trainTime, "HH:mm").subtract(1, "years");

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(converted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var minutesTilTrain = frequency - tRemainder;

    
    console.log(minutesTilTrain)
// nextTrain needs to go to html
    var nextTrain = moment().add(minutesTilTrain, "minutes");
    console.log("arrival time: " + moment(nextTrain).format("HH:mm"));

    var nextArrival = moment(nextTrain).format("HH:mm");

    $("#train-table > tbody").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival + "</td><td>" + minutesTilTrain + "</td></tr>");
  

})