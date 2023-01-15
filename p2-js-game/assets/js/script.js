/*================================================================
|                 GLOBAL GAME VARIABLE                            |
/================================================================*/

let difficulty = 3;
let correctAnswer;
let score = 0;
let landingTime = 7000;
let hasClicked = false;
let round;
let popOfHumans = 10000;
let popOfInvaders = 0;
let gameInstance;
let currentState = 1; // 1 - onResume, 2 - onPause, 3 - stopped, 4 - isGameOver

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

//pre-play controls
let prePlayOptions = document.querySelector('.pre-play-options');
let prePlayPlayButton = document.getElementById('pre-play-play-btn');

/*================================================================
|                 EVENT LISTENERS                                 |
/================================================================*/
// callbacks
function disableButton(btn) {
  btn.disabled = true;
};

function enableButton(btn) {
  btn.disabled = false;
};

function disableChoices(){
  choices.forEach((e) => disableButton(e));
};

function getSelected(e) {
  hasClicked = true;
  if(e.target.innerText != correctAnswer){
    score = score <= 100 ? 0 : score - 100;
    popOfInvaders = popOfHumans <= 3000 ? popOfInvaders + popOfHumans : popOfInvaders + 3000;
    popOfHumans = popOfHumans <= 3000 ? 0 : popOfHumans - 3000;
  } else {
    score += 100;
  }

  disableChoices();
  updatePopulation();
  updateScore();
  // NEED TO SET VARIABLE FOR GAME STATE?
  
  // the hardest part of my code to code :(
  // this enables the functionality that when an option is clicked
  // the capsules will immediately landed, there will be a short pause, 
  // and then a new group will be sent falling
  capsuleContainer.classList.remove('moving-down');
  console.log(`reached line 90`);
  capsuleContainer.classList.add('at-bottom');
  void capsuleContainer.offsetWidth;
  console.log(`reached line 93`);
  setTimeout(() =>{
    capsuleContainer.classList.remove('at-bottom');
    capsuleContainer.classList.add('moving-down');
    clearInterval(round);
    round = setInterval(() => playRound(currentState), landingTime);
    console.log(`reached line 99`);
    sendAGroup();
  },1000);
  hasClicked = false;
}

function enableChoices(){
  choices.forEach((e) => enableButton(e));
}
// adding of event listeners

startBtn.addEventListener('click', startGame);
prePlayPlayButton.addEventListener('click', playGame)
prePlayPlayButton.addEventListener('click', hidePrePlayOptions)
prePlayPlayButton.addEventListener('click', initializeGame)



/*================================================================
|                 HELPER FUNCTIONS                                |
/================================================================*/

// need pa ba or update nalang using object properties?
function getCurrentState(){
  return currentState;
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
  };
}

// updates the population number and bar
function updatePopulation() {

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
  console.log(`score: ${score}`);
  document.getElementById('score-value').innerHTML = score;
}

/*================================================================
|                 MAIN FUNCTIONS                                  |
/================================================================*/

// gets a group from the groups created
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
function sendAGroup(){

  console.log(`--- STARTING A NEW ROUND ---`);

  enableChoices();

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

function initializeGame(){
  choices.forEach((e) => e.addEventListener('click', getSelected));
  document.querySelector('.capsule-container').classList.add('moving-down'); 
  sendAGroup();
  let element = document.querySelector('.moving-down');
  element.addEventListener('animationend', applyPenalty);
}

function playRound(currentState){
  // gameState 1 - resume, 2 - paused, 3  - stopped, 4 - game over
  switch (currentState){
    case 1: {
      console.log(`onResume`);

      updatePopulation();
      console.log(`updating scoressssssssssssssssssss`);
      updateScore();
      console.log(`scoressssssssssssssss updated`);
      break;
    }
    case 2: console.log(`onPause`); break;
    case 3: console.log(`stopped`); break;
    case 4: console.log(`isGameOver`); break;
    default: console.log(`onResume`);
  }

};

function hidePrePlayOptions(){
  //hide the preplay options
  prePlayOptions.classList.add('hide');
}
function playGame() {
  round = setInterval(() => playRound(currentState), landingTime);
};

function renderInitialDisplay(){

  disableChoices();

  document.querySelector('.game-container').classList.remove('hide');
  
  //creates a loading indicator
  let loading = document.createElement('div')
  loading.textContent = 'Loading Game...';
  loading.style.cssText = 'font-size: 2rem; position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; text-align: center;';
  document.querySelector('main').appendChild(loading);
  
  setTimeout(function(){
    console.log(`loading game...`);
    loading.classList.add('hide');
    document.querySelector('.pre-play-options').classList.remove('hide');
  },400);
};

function loadGameData() {
  //builds and populate the data needed to run the game
  //thinking of dividing this large function but since all these will be called
  //just a single time and only on the creation of the game data, decided in the end
  //not to break it down into smaller functions

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
};

function startGame(){
  loadGameData();
  renderInitialDisplay();
  // playGame();// to remove if nailagay na sa button
};
// TODO
function runIntro(){
  // startGame(); // to remove kapag nalagay na sa button
};

function run(){
  runIntro();
}

run();