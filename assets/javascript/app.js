// Initialize Firebase
var config = {
    apiKey: "AIzaSyCIW0PtxnyUa3isUKBiSOZB4EZvzMQhpBM",
    authDomain: "rps-multiplayer-333d6.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-333d6.firebaseio.com",
    projectId: "rps-multiplayer-333d6",
    storageBucket: "rps-multiplayer-333d6.appspot.com",
    messagingSenderId: "225094184358"
};
firebase.initializeApp(config);

var database = firebase.database();

var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

var playersRef = database.ref("/players");

var playerCount = 0;

//ID of the player for the session
var playerID;


////on load setup
$(".playerBoxContent").hide();

connectedRef.on("value", function(snap) {
    if (snap.val()) {
        var con = connectionsRef.push(true);

        con.onDisconnect().remove();
    };
})


$("#logIn").on("click", function(event) {
    event.preventDefault();

    var player = {
        name: $("#userNameInput").val().trim(),
        wins: 0,
        losses: 0
    }
     
    var playerConnection = playersRef.push(player);
    playerConnection.onDisconnect().remove();

    $("#logInForm").hide();

    //playerCount is updated by playersRef.on("value", function...) (below)
    if (playerCount === 1) {
        playerID = 1;
        $("#test").text("You are player " + playerID);
    }
    else if (playerCount === 2) {
        playerID = 2;
        $("#test").text("You are player " + playerID);
    }
})


// listen for change to playersRef; record # of players (numChildren) to playerCount
playersRef.on("value", function(snap) {
    playerCount = snap.numChildren();
    
    $("#playerCount").text(playerCount);
})

// this is to handle disconnection by a player; the remaining player's playerID should be assigned to 1.
playersRef.on("child_removed", function(snap) {
    // alert("A child was removed!");
    playerID = 1;

    // eventually, remove this
    $("#test").text("You are player " + playerID);
})



// just for testing
connectionsRef.on("value", function(snap) {
    $("#testUserCount").text(snap.numChildren());
})




$(document).on("click", ".choiceButton", function(){
    alert("You clicked " + $(this).text());
})