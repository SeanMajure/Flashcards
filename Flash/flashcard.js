var standard = require("./standard.js");
var cloze = require("./cloze.js");
var discard = require("./discard.js");
var inquirer = require("inquirer");
var fs = require("fs");

var choices = ["standard", "cloze"];

inquirer.prompt([{
  name: "choice",
  type: "list",
  message: "What would you like to do?",
  choices: ["create a flashcard", "study", "delete a flashcard"]
}]).then(function(response) {
  if (response.choice === "create a flashcard") {
    inquirer.prompt([{
      name: "card",
      type: "list",
      message: "What type of flashcard?",
      choices: choices
    }]).then(function(responseCard) {
      if (responseCard.card === "standard") {
        console.log("Createing a standard flashcard...");
        standard.createStand();
      } else if (responseCard.card === "cloze") {
        console.log("Createingn a cloze flashcard...");
        cloze.createCloze();
      }
    });
  } else if (response.choice === "study") {
    console.log("You picked " + response.choice);
    inquirer.prompt([{
      name: "card",
      type: "list",
      message: "What type of card do you want to study with?",
      choices: choices
    }]).then(function(responseCard) {
      if (responseCard.card === "standard") {
        console.log("standard flashcards");
        standard.getStand();

      } else if (responseCard.card === "cloze") {
        console.log("You picked study with cloze flashcards");
        cloze.getCloze();
      }
    });
  } else if (response.choice === "delete a flashcard") {
    deleteCard.deleteCard();
  }
});