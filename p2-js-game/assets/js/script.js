/*================================================================
|                 GLOBAL GAME VARIABLE                            |
/================================================================*/

let difficulty = 3;
let correctAnswer;
let score = 0;
let cycleTime = 7000;
let hasClicked = false;
let cycle;
let popOfHumans = 10000;
let popOfInvaders = 0;
let isGameOver = false;
let isOnPause = false;
let isOnResume = true;

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
}

function enableButton(btn) {
  btn.disabled = false;
}

// adding of event listeners

startBtn.addEventListener('click', startGame);
prePlayPlayButton.addEventListener('click', playGame)
/*================================================================
|                 MAIN FUNCTIONS                                  |
/================================================================*/

function playGame() {
  //hide the preplay options
  prePlayOptions.classList.add('hide');

  
};

function renderInitialDisplay(){

  choices.forEach((e) => disableButton(e));

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
  },3000);
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