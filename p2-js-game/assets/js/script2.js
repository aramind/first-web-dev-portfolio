// GLOBAL VARIABLES

let difficulty = 3;
let correctAnswer;
let score = 0;
let cycleTime = 7000;
let hasClicked = false;
let cycle;
let popOfHumans = 10000;
let popOfInvaders = 0;
let isGameOver = false;

// arrays containing the group for choices
const easyGroups = [];
const moderateGroups = [];
const difficultGroups = [];
const difficulties = [1,2,3];

/*================================================================
|                 GLOBAL ELEMENTS                                 |
/================================================================*/
// population
let popOfHumansElement = document.querySelector('#pop-of-humans');
let popOfInvadersElement = document.querySelector('#pop-of-invaders');
popOfHumansElement.textContent = popOfHumans;
popOfInvadersElement.textContent = popOfInvaders;
// //population variables
// let popOfHumans = Number(popOfHumansElement.innerText);
// let popOfInvaders = Number(popOfInvadersElement.innerText);

// capsules
let capsuleContainer = document.querySelector('.capsule-container');
// choices
let choices = document.querySelectorAll('.choice');

let choicesDisplayedA = document.querySelector('#choice1');
let choicesDisplayedB = document.querySelector('#choice2');
let choicesDisplayedC = document.querySelector('#choice3');
let choicesDisplayedD = document.querySelector('#choice4');

// controls
let startBtn = document.getElementById('start-btn');

// EVENT LISTENERS
function disableButton(btn) {
  btn.disabled = true;
}

function enableButton(btn) {
  btn.disabled = false;
}

// adding of event listeners

startBtn.addEventListener('click',startGame);

// even listener for choices buttons
let getSelected = (e) => {

  e.stopPropagation();
  hasClicked = true;
  if(e.target.innerText != correctAnswer){
    score = score <= 100? 0 : score - 100;
    popOfInvaders = popOfHumans <= 3000? popOfInvaders + popOfHumans : popOfInvaders + 3000;
    popOfHumans = popOfHumans <= 3000? 0 : popOfHumans - 3000;
  } else {
    score += 100;
  }

  choices.forEach((e) => disableButton(e));

  updatePopulation();
  updateScore();
  checkForGameOver(popOfHumans);
  
  getNextCycle();  
};

// HELPER FUNCTIONS
// updates the population number and bar
function updatePopulation() {
  
  // popOfHumans = popOfHumans;
  // popOfInvaders = popOfInvaders;
  popOfHumansElement.textContent = popOfHumans;
  popOfInvadersElement.textContent = popOfInvaders;

  //updating the population bar
  let percentOfHumans = popOfHumans/(popOfHumans + popOfInvaders);
  let bar = document.getElementById('population-bar');
  let barWidth = bar.offsetWidth;
  let pxForHumans = Math.floor(percentOfHumans * barWidth);
  let string = `grid-template-columns: ${pxForHumans}px 1fr`;
  bar.style.cssText = string;
  console.log(`popOfHumans/popOfInvaders ${popOfHumans} / ${popOfInvaders}`);
}

// updates the score 
function updateScore(){
  // console.log(`score: ${score}`);
  document.getElementById('score-value').textContent = score;
}

// starts the next cycle after clicking one option 
function getNextCycle(){
  capsuleContainer.classList.remove('moving-down');
  capsuleContainer.classList.add('at-bottom');
  void capsuleContainer.offsetWidth;
  setTimeout(function(){
    capsuleContainer.classList.remove('at-bottom');
    capsuleContainer.classList.add('moving-down');
    clearInterval(cycle);
    cycle = setInterval(runGame, cycleTime);
    sendGroup();
  }, 1000);
  hasClicked = false;
}

// gets a group from the database
function getAGroup(fromDifficulties){
  switch (fromDifficulties) {
    case 1: {
      return easyGroups[Math.floor(Math.random() * easyGroups.length)];
    }
    case 2: {
      return moderateGroups[Math.floor(Math.random() * moderateGroups.length)];
    }
    case 3: {
      return difficultGroups[Math.floor(Math.random() * difficultGroups.length)];
    }
    default: {
      return easyGroups[0];
    }
  }  
};

//sending the selected group to be displayed on choices buttons
function sendGroup(){

  console.log(`--- STARTING A NEW CYCLE ---`);

  choices.forEach((e) => enableButton(e));

  let fromDifficulties = Math.ceil(Math.random() * difficulty);
  // console.log(`fromDifficulties: ${fromDifficulties}`);
  let currentGroup = getAGroup(fromDifficulties);
  console.log(`currentGroup: [${currentGroup['a']}][${currentGroup['b']}][${currentGroup['c']}][${currentGroup['d']}][${currentGroup['key']}]`);

  correctAnswer = currentGroup['key'];

  // thinking to convert the following assignments to forEach for lesser lines of code but might affect the other calls to the elements in the displayed page plus the additional complexity of looping through the properties of the object to be assigned....so decided not to, violating DRY principle but i think it easier to understand
  choicesDisplayedA.innerHTML = currentGroup['a'];
  choicesDisplayedB.innerHTML = currentGroup['b'];
  choicesDisplayedC.innerHTML = currentGroup['c'];
  choicesDisplayedD.innerHTML = currentGroup['d'];

  console.log(`correctAnswer: [${correctAnswer}]`);
  
}

// applies penalty if no choice was selected in a round
function applyPenalty(){
  console.log(`--- applying penalty---`);
  capsuleContainer.classList.remove('moving-down');
  void capsuleContainer.offsetWidth;
  capsuleContainer.classList.add('moving-down');
  if(!hasClicked){

    score = score <= 100? 0 : score - 100;
    popOfInvaders = popOfHumans <= 3000? popOfInvaders + popOfHumans : popOfInvaders + 3000;
    popOfHumans = popOfHumans <= 3000? 0 : popOfHumans - 3000;

    updatePopulation();
    updateScore();
  };
}

// checks game status for pause, game over
function checkGameStatus(){
  if (isGameOver){
    // disabling choices and movement at game over
    choices.forEach((e) => disableButton(e));
    capsuleContainer.classList.remove('moving-down');
    displayGameOver();
  }
}
// checks for gameover
function checkForGameOver(){
  if(popOfHumans <= 0 ){
    isGameOver = true;
  }
}
// ends the game
function displayGameOver(){
  let gameStatus = document.createElement('div');
  gameStatus.innerText = 'Game Over';
  document.querySelector('#body').appendChild(gameStatus);
  
  
  // alert('Game Over');

}

// loads the necessary things needed to run the game
function loadGameElements(){
  document.querySelector('.game-container').classList.remove('hide');
  choices.forEach((e) => e.addEventListener('click', getSelected));
  document.querySelector('.capsule-container').classList.add('moving-down');
  sendGroup();
  // adding the animation of capsules
  let element = document.querySelector('.moving-down');
  element.addEventListener('animationend', applyPenalty);

  updatePopulation();
  updateScore();
}

//builds and populate the data needed to run the game
//thinking of dividing this large function but since all these will be called
//just a single time and only on the creation of the game data, decided in the end
//not to break it down into smaller functions
function loadGameData(){

// function for creating the object containing the options for a group and the key for the correct answer
// - will create the object regardless of the level of the group
function createGroup(a, b, c, d, key){
  this.a = a; this.b = b; this.c = c; this.d = d; this.key = key;
}

// function for creating the groups and sorts them to levels
function addToGroups(a = 1, b = 0, c = 0, d = 0, key = 1, level = 1){
  switch(level){
    case 1: {
      easyGroups.push(new createGroup(a, b, c, d, key)); break;
    }
    case 2: {
      moderateGroups.push(new createGroup(a, b, c, d, key)); break;
    }
    case 3: {
      difficultGroups.push(new createGroup(a, b, c, d, key)); break;
    }
  }
};

//populating the groups
  // easy groups
addToGroups(14, 82, 70, 'AG', 'AG', 1);
addToGroups('🐳', '🐪', '🦓', '🐄', '🐳', 1);
addToGroups(14, 78, 13, 32, 13, 1);
addToGroups('toy', 'sea', 'gear', 'bar', 'gear', 1);
addToGroups('👄', '👀', '👂', '🔧', '🔧', 1);
addToGroups('🚲', '🚕', '🚌', '🚒', '🚲', 1);
addToGroups('🚲', '✈️', '🚌', '🏍', '✈️', 1);

  // moderate groups
addToGroups('49', '36', '55', '25', '55', 2);
addToGroups('🌍', '🏀', '🚗', '💍', '🚗', 2);
addToGroups('🧤', '💼', '🩲', '👖', '💼', 2);
addToGroups('24', '15', '11', '48', '11', 2);
addToGroups('gin', 'ego', 'owl', 'boy', 'gin', 2);
addToGroups('kg', 'lb', 'oz', 'cm', 'cm', 2);

  // difficult groups
addToGroups('10', '45', '21', '32', '32', 3);
addToGroups('3', '6', '28', '34', '34', 3);
addToGroups('Si', 'C', 'Ge', 'Au', 'Au', 3);
addToGroups('Fe', 'Cl', 'Ag', 'Au', 'Cl', 3);
addToGroups('🐍', '🐠', '🐄', '🐓', '🐄', 3);

}

function restartGame(){

}

function runGame(){
  checkForGameOver();

  checkGameStatus();
}
/*==================================================/
|          FUNCTION TO START THE GAME               |
/==================================================*/

function startGame(){
  loadGameData();
  loadGameElements();
  cycle = setInterval(runGame, cycleTime);
}


