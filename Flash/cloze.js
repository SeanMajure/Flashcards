var inquirer = require("inquirer");
var fs = require("fs");

var clozeCards = function(fullText, cloze, partial) {
  this.fullText = fullText;
  this.cloze = cloze;
  this.partial = fullText.replace(cloze, "...");
};

var clozeArray = [];

function createCloze() {
  fs.readFile("cloze.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
      myData = JSON.parse(data);

      for (i = 0; i < myData.length; i++) {
        clozeArray.push(myData[i]);
      }
    }
  });
  subCreate();

  function subCreate() {

    inquirer.prompt([{
      name: "fullText",
      message: "What statement do you want on your flashcard?"
    }, {
      name: "cloze",
      message: "What text do you want removed?"
    }]).then(function(answers) {
      var clozeCard = new clozeCards(answers.fullText, answers.cloze);
      clozeArray.push(clozeCard);

      inquirer.prompt([{
        name: "confirm",
        type: "confirm",
        message: "Would you like to make a another flashcard?"
      }]).then(function(next) {
        if (next.confirm === true) {
          subCreate();
        } else {
          console.log("You have finished making flashcards.");
          fs.writeFile("cloze.txt", JSON.stringify(clozeArray, null, 4), function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Content Added!");
            }
          });
        }
      });
    });
  }
}

function getCloze(data) {
  fs.readFile("cloze.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    myData = JSON.parse(data);
    var length = myData.length;
    var random = Math.floor((Math.random() * length));

    inquirer.prompt([{
      name: "front",
      message: myData[random].partial + " <press enter>"
    }, {
      name: "confirm",
      type: "confirm",
      message: "Ready for answer?"
    }]).then(function(answers) {
      if (answers.confirm === true) {
        console.log(myData[random].fullText);
        inquirer.prompt([{
          name: "confirm",
          type: "confirm",
          message: "Would you like another flashcard?"
        }]).then(function(next) {
          if (next.confirm === true) {
            getCloze(data);
          } else {
            console.log("Study Session Over.");
          }
        });
      } else {
        console.log("Study Session Over - Come back when you have more time.");
      }
    });
  });
}

module.exports = {
  clozeCards,
  createCloze,
  getCloze
};