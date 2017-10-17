var inquirer = require("inquirer");
var fs = require("fs");

var standard = function(front, back) {
  this.front = front;
  this.back = back;
};

var basicArray = [];

function createStand() {
  fs.readFile("standard.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
      myData = JSON.parse(data);

      for (i = 0; i < myData.length; i++) {
        basicArray.push(myData[i]);
      }
    }
  });
  subCreate();

  function subCreate() {
    inquirer.prompt([{
      name: "front",
      message: "What question do you want on your flashcard?"
    }, {
      name: "back",
      message: "What is the answer to your question?"
    }]).then(function(answers) {
      var basic = new standard(answers.front, answers.back);
      basicArray.push(basic);

      inquirer.prompt([{
        name: "confirm",
        type: "confirm",
        message: "Would you like to make a another flashcard?"
      }]).then(function(next) {

        if (next.confirm === true) {
          subCreate();
        } else {
          console.log("You have finished making flashcards.");
          fs.writeFile("standard.txt", JSON.stringify(basicArray, null, 4), function(err) {
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

function getStand(data) {
  fs.readFile("standard.txt", "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    

    myData = JSON.parse(data);
    var length = myData.length;
    var random = Math.floor((Math.random() * length));

    	inquirer.prompt([{
    	  name: "front",
      	message: myData[random].front + " <press enter>"
    	}, {
     	 name: "confirm",
      	type: "confirm",
      	message: "Ready for answer?"
    		}]).then(function(answers) {
    		  if (answers.confirm === true) {
     		   console.log(myData[random].back);
        		inquirer.prompt([{
          		name: "confirm",
          		type: "confirm",
          		message: "Would you like another flashcard?"
        	}]).then(function(next) {
          	  if (next.confirm === true) {
            	getStand(data);
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
  standard,
  createStand,
  getStand
};