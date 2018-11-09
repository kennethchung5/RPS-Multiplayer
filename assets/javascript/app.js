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

var playerNum;

////on load setup
$("#choiceBox").hide();

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

    if (playerCount === 1) {
        $("#player1Box").append($("#choiceBox"));
        playerNum = 1;
        $("#test").text("You are player " + playerNum);
    }
    else if (playerCount === 2) {
        $("#player2Box").append($("#choiceBox"));
        playerNum = 2;
        $("#test").text("You are player " + playerNum);
    }

    $("#choiceBox").show();

})

playersRef.on("value", function(snap) {
    $("#playerNum").text(snap.numChildren());

    playerCount = snap.numChildren();

    // if (snap.numChildren() === 1) {

    // }

    // if (snap.numChildren() === 2) {
    //     alert("Ready to start the game!");
    //     // startGame();
    // }
})

connectionsRef.on("value", function(snap) {
    $("#testUserNum").text(snap.numChildren());
})

// function startGame() {
//     $("#choiceBox").show();
// }

$(document).on("click", ".choiceButton", function(){
    alert("You clicked " + $(this).text());
})