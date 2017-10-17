var inquirer = require("inquirer");
var fs = require("fs");

var choices = ["standard", "cloze"];

var standardArray = [];
var clozeArray = [];

function deleteCard() {

  inquirer.prompt([{
    name: "confirm",
    type: "confirm",
    message: "Would you like to delete a flashcard?"
  }]).then(function(answer) {

    if (answer.confirm === true) {

      inquirer.prompt([{
        name: "typeCard",
        type: "list",
        message: "Which type of card would you like to delete?",
        choices: choices
      }]).then(function(typeDelete) {
        if (typeDelete.typeCard === "standard") {
          deleteStand();
        } else if (typeDelete.typeCard === "cloze") {
          deleteCloze();
          console.log("you chose cloze delete");
        }
      });
    } else {
      console.log("Session over");
    }
  });

}

function deleteStand() {
  fs.readFile("standard.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
      standardArray = [];
      myData = JSON.parse(data);
      for (i = 0; i < myData.length; i++) {
        standardArray.push(myData[i].front);
      }
      inquirer.prompt([{
        name: "front",
        type: "list",
        message: "Which card would you like to delete?",
        choices: standardArray
      }]).then(function(response) {
        var number = 0;
        for (var i = 0; i < standardArray.length; i++) {
          if (myData[i].front === response.front) {
            number = i;
          }
        }
        myData.splice(number, 1);
        fs.writeFile("standard.txt", JSON.stringify(myData, null, 4), function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Content Removed!");
            deleteCard();
          }
        });
      });
    }
  });
}

function deleteCloze() {
  fs.readFile("cloze.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
      clozeArray = [];
      myData = JSON.parse(data);
      for (i = 0; i < myData.length; i++) {
        clozeArray.push(myData[i].fullText);
      }
      inquirer.prompt([{
        name: "fullText",
        type: "list",
        message: "Which card would you like to delete?",
        choices: clozeArray
      }]).then(function(response) {
        var number = 0;
        for (var i = 0; i < clozeArray.length; i++) {
          if (myData[i].fullText === response.fullText) {
            number = i;
          }
        }
        myData.splice(number, 1);
        fs.writeFile("cloze.txt", JSON.stringify(myData, null, 4), function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log("Content Removed!");
            deleteCard();
          }
        });
      });
    }
  });
}

module.exports = { deleteCard };