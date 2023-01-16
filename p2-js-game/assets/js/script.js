/*================================================================
|                 GLOBAL GAME VARIABLE                            |
/================================================================*/
// default value 
const defaultDifficulty = 3
const defaultLandingTime = 7000;
const defaultPopulation = 15000;


// initialization of variables
let difficulty = defaultDifficulty;
let correctAnswer;
let score = 0;
let landingTime = defaultLandingTime;
let hasClicked = false;
let round;
let popOfHumans = defaultPopulation;
let popOfInvaders = 0;
let gameInstance;
let currentState = 1; // 1 - onResume, 2 - onPause, 3 - stopped
let gameIsEnded = false;

let currentGroup;
let selectedButton;

const easyGroups = [];
const moderateGroups = [];
const difficultGroups = [];
const difficulties = [1,2,3];

// INTRO
const container = document.querySelector('.intro-container');
const slides = document.querySelectorAll('.slide');
/*================================================================
|                 GLOBAL ELEMENTS                                 |
/================================================================*/
// population
const popOfHumansElement = document.querySelector('#pop-of-humans');
const popOfInvadersElement = document.querySelector('#pop-of-invaders');
popOfHumansElement.textContent = popOfHumans;
popOfInvadersElement.textContent = popOfInvaders;
// //population variables
// let popOfHumans = Number(popOfHumansElement.innerText);
// let popOfInvaders = Number(popOfInvadersElement.innerText);

// capsules
const capsuleContainer = document.querySelector('.capsule-container');
// choices
const choices = document.querySelectorAll('.choice');

const choicesDisplayedA = document.querySelector('#choice1');
const choicesDisplayedB = document.querySelector('#choice2');
const choicesDisplayedC = document.querySelector('#choice3');
const choicesDisplayedD = document.querySelector('#choice4');

// controls
const startBtn = document.getElementById('start-btn');
const homeBtn = document.getElementById('home-btn');
const soundBtn = document.getElementById('sound-btn');
const pauseResumeBtn = document.getElementById('pause-resume-btn');
const restartBtn = document.getElementById('restart-btn');
const stopBtn = document.getElementById('stop-btn');
const quitBtn = document.getElementById('quit-btn');

//pre-play controls
const prePlayOptions = document.querySelector('.pre-play-options');
const prePlayPlayButton = document.getElementById('pre-play-play-btn');

// pre-play level buttons
const prePlayLvlBtns = document.querySelectorAll('.btn__pre-play--lvl');
const prePlayBtnLvl1 = document.getElementById('btn-lvl-1'); 
const prePlayBtnLvl2 = document.getElementById('btn-lvl-2'); 
const prePlayBtnLvl3 = document.getElementById('btn-lvl-3');

// audio
const bgMusic = document.getElementById('bg-music');
const prePlayBtnSound = document.getElementById('btn-preplay--sound');

// temporary message
// const tempMessageContainer = document.querySelector('.temp-display-message');
let msg = document.createElement('div');
msg.className = 'temp-display-msg';
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
  console.log(`---you selected ${e.target.innerText}---`);
  hasClicked = true;
  if(e.target.innerText != correctAnswer && !gameIsEnded){
    score = score <= 100 ? 0 : score - 100;
    popOfInvaders = popOfHumans <= 3000 ? popOfInvaders + popOfHumans : popOfInvaders + 3000;
    popOfHumans = popOfHumans <= 3000 ? 0 : popOfHumans - 3000;
  } else {
    score += 100;
  }

  disableChoices();
  updatePopulation();
  updateScore();
  
  // the hardest part of my code to code :(
  // this enables the functionality that when an option is clicked
  // the capsules will immediately landed, there will be a short pause, 
  // and then a new group will be sent falling
  // capsuleContainer.classList.remove('moving-down');
  stopFalling();
  console.log('HEY!')
  capsuleContainer.classList.add('at-bottom');
  void capsuleContainer.offsetWidth;
  setTimeout(() =>{
    capsuleContainer.classList.remove('at-bottom');
    capsuleContainer.classList.add('moving-down');
    clearInterval(round);
    round = setInterval(() => playRound(currentState), landingTime);
    console.log(`HEY AGAIN 3`);
    sendAGroup();
  },1000);
}

function enableChoices(){
  choices.forEach((e) => enableButton(e));
}

function goHome(){
  console.log(`go home btn was clicked`);
  container.style.display = 'flex';
  restartGame();
  cleanUp();
  run();
};

function toggleSound(){
  console.log(`toggleSound btn was called`);
  if(bgMusic.muted){
    unmuteBgMusic();
  } else {
    muteBgMusic();
  } 
};

function pauseGame(){
  muteBgMusic();
  choices.forEach((e) => e.textContent = `?`);
  stopFalling();
  disableChoices();
  clearInterval(round);
  currentState = 2; // 1 - on resume , 2 - on paused
  pauseResumeBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  round = setInterval(() => playRound(currentState), landingTime);
}

function resumeGame(){
  removeTempDisplayMsg();
  setTimeout(function() {
    choicesDisplayedA.innerHTML = currentGroup['a'];
    choicesDisplayedB.innerHTML = currentGroup['b'];
    choicesDisplayedC.innerHTML = currentGroup['c'];
    choicesDisplayedD.innerHTML = currentGroup['d'];
  }, 1000);
  enableChoices();
  capsuleContainer.classList.add('moving-down');
  currentState = 1;
  round = setInterval(() => playRound(currentState),landingTime);
  pauseResumeBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
};

function pauseResumeGame(){
  console.log(`pauseResume btn was clicked`);
  if(currentState === 1){
    pauseGame();
    showTempDisplayMsg('Game is Paused. Press play to continue.');
  } else if(currentState === 2){
    resumeGame();
  }
};

function restartGame(){
  console.log(`restart btn was clicked`);
  //resetting the variables
  stopGame();
  removeTempDisplayMsg();
  console.log(gameIsEnded);
  gameIsEnded = false;
  console.log(gameIsEnded);
  muteBgMusic();
  disableChoices();
  currentState = 1;
  score = 0;
  popOfHumans = defaultPopulation;
  popOfInvaders = 0;

  //updates score and population 
  updatePopulation();
  updateScore();
  if(prePlayOptions.classList.contains('hide')){
    prePlayOptions.classList.remove('hide');
  };
  
  //starts the game again
  playGame();
};

function stopGame(){
  console.log('stop game btn was clicked');
  showTempDisplayMsg('Game is stopped. Press reset to start again.');
  muteBgMusic();
  stopFalling();
  clearInterval(round);
  currentState = 3;
  round = setInterval(() => playRound(currentState), landingTime);
  disableChoices();
};

function quitGame(){
  console.log(`quit game btn was clicked`);
  pauseGame();
  let askAgain = true;
  do{
    let confirmQuit = prompt('Are you sure you want to quit?<y/n>');
    if(confirmQuit.trim().toLowerCase() == 'y'){
      muteBgMusic();
      restartGame();
      createByePage();
      askAgain = false;
    } else if(confirmQuit.trim().toLowerCase() == 'n'){
      askAgain = false;
      resumeGame();
    }
  } while(askAgain);
};

/*================================================================
|                 ATTACHING EVENT LISTENERS                       |
/================================================================*/

// controls
startBtn.addEventListener('click', startGame);
homeBtn.addEventListener('click', goHome);
soundBtn.addEventListener('click', toggleSound);
pauseResumeBtn.addEventListener('click', pauseResumeGame);
restartBtn.addEventListener('click', restartGame);
stopBtn.addEventListener('click', stopGame);
quitBtn.addEventListener('click', quitGame);

prePlayPlayButton.addEventListener('click', playGame)
prePlayPlayButton.addEventListener('click', hidePrePlayOptions)
prePlayPlayButton.addEventListener('click', initializeGame)

// pre-play buttons

// updates the difficulty based on the level selected
prePlayBtnLvl1.addEventListener('click', () => difficulty = 1);
prePlayBtnLvl2.addEventListener('click', () => difficulty = 2);
prePlayBtnLvl3.addEventListener('click', () => difficulty = 3);


//updating the style of selected buttons
prePlayLvlBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if(selectedButton) {
      selectedButton.classList.remove('selected');
    }
    e.target.classList.add('selected');
    selectedButton = e.target;
  });
});

/*================================================================
|                 HELPER FUNCTIONS                                |
/================================================================*/
// removing the temporary display message
function removeTempDisplayMsg(){
  document.querySelector('main').removeChild(msg);
}

// adding a temporary display message
function showTempDisplayMsg(string){
  msg.innerHTML = string;
  document.querySelector('main').appendChild(msg);
}

// creating the temporary message after the game has finished
function displayEndGameMessage(x){
  let string = ``;
  if(x== 0){
    // message1.textContent = `Game Over!`;
    string = `Sorry, you have lost! 💔`;
  } else{
    // message1.textContent = `Congratulations!`;
    string = `You won! 🥳🎊🎉 `;
  }
  showTempDisplayMsg(string);
}

// function to call if won or lost
function endGame(x){
  clearInterval(round);
  round = setInterval(() => playRound(currentState), landingTime);
  capsuleContainer.classList.add('at-bottom');
  displayEndGameMessage(x);
  console.log('game was ended');
  capsuleContainer.removeEventListener('animationend', applyPenalty);
}

// clean up
function cleanUp(){
  prePlayOptions.classList.add('hide');
  document.querySelector('.game-container').classList.add('hide');
}
// to check the game status
function checkGameStatus(){
  if(score >= 1000 && popOfHumans > 0){
    gameIsEnded = true;
    stopGame()
    clearInterval(round);
    console.log(`Congratulations! You won!`);
    currentState = 4;
    endGame(1);
  } else if(popOfHumans <= 0){
    gameIsEnded = true;
    stopGame()
    clearInterval(round);
    currentState = 4;
    console.log(`Game Over! You lost.`)
    endGame(0);
  }
}

// stops the animation of falling down
function stopFalling(){
  if(capsuleContainer.classList.contains('moving-down')){
    capsuleContainer.classList.remove('moving-down');
  }
}
// music 
function unmuteBgMusic(){
  bgMusic.muted = false;
  soundBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
}

function muteBgMusic(){
  bgMusic.muted = true;
  soundBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
};

// recreating the page to be displayed after quitting
function createByePage(){
  let oldPage = document.querySelector('.game-container');
  oldPage.classList.add('hide');
  document.querySelector('.pre-play-options').classList.add('hide');
  document.querySelector('.btn--start').classList.add('hide');
  document.querySelector('#title').classList.add('hide');
  let newContent = document.createElement('div');
  newContent.textContent = 'I hope you enjoyed playing the game! :)';
  let newContent2 = document.createElement('div');
  newContent2.textContent = `-- Mon`;
  let containerPage = document.querySelector('.main');
  containerPage.appendChild(newContent);
  containerPage.appendChild(newContent2);
  containerPage.classList.add('endPage');

  startBtn.style.display = 'none';
  document.querySelector('#subtitle').style.display = 'none';
  // containerPage.classList.add('temp-display-msg');
}

// stop falling of capsules
// function stopFalling() {
//   if(capsuleContainer.classlist.contains('moving-down')){
//     capsuleContainer.classList.remove('moving-down');
//   }
// };
// need pa ba or update nalang using object properties?
function getCurrentState(){
  return currentState;
}
// applies penalty if no choice was selected in a round
function applyPenalty(){
  console.log(`--- applying penalty---`);
  // capsuleContainer.classList.remove('moving-down');
  stopFalling();
  void capsuleContainer.offsetWidth;
  capsuleContainer.classList.add('moving-down');
  if(!hasClicked && !gameIsEnded){

    score = score <= 100 ? 0 : score - 100;
    popOfInvaders = popOfHumans <= 3000? popOfInvaders + popOfHumans : popOfInvaders + 3000;
    popOfHumans = popOfHumans <= 3000? 0 : popOfHumans - 3000;

    updatePopulation();
    updateScore();

    clearInterval(round);
    round = setInterval(() => playRound(currentState), landingTime);
    sendAGroup();
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
  checkGameStatus();
}

// updates the score 
function updateScore(){
  console.log(`score: ${score}`);
  document.getElementById('score-value').innerHTML = score;
  checkGameStatus();
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
  hasClicked = false;
  enableChoices();

  let fromDifficulties = Math.ceil(Math.random() * difficulty);
  // console.log(`fromDifficulties: ${fromDifficulties}`);
  currentGroup = getAGroup(fromDifficulties);
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
  console.log(`---status update ---`);
  // gameState 1 - resume, 2 - paused, 3  - stopped
  switch (currentState){
    case 1: {
      console.log(`game state: onResume`);
      break;
    }
    case 2: console.log(`game state: onPause`); break;
    case 3: console.log(`game state: stopped`); break;
    case 4: console.log(`game state: ended`); break;
    default: console.log(`game state: onResume`);
  }
};

function hidePrePlayOptions(){
  //hide the preplay options
  prePlayOptions.classList.add('hide');
}
function playGame() {
  console.log(`difficulty: ${difficulty}`);
  // removeTempDisplayMsg();
  round = setInterval(() => playRound(currentState), landingTime);
};

function renderInitialDisplay(){

  disableChoices();

  document.querySelector('.game-container').classList.remove('hide');
  
  //creates a display indicator
  // msg = document.createElement('div')
  // msg.textContent = 'Loading Game...';
  // loading.style.cssText = 'font-size: 2rem; position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; text-align: center;';
  // document.querySelector('main').appendChild(msg);
  showTempDisplayMsg(`Loading Game...`);
  
  setTimeout(function(){
    console.log(`loading game...`);
    // loading.classList.add('hide');
    document.querySelector('main').removeChild(msg);
    document.querySelector('.pre-play-options').classList.remove('hide');
  },2000);
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
  addToGroups('🍌', '🍇', '🥑', '🥬', '🥬', 1);
  addToGroups('🦢', '🦋', '🐀', '🦜', '🐀', 1);
  addToGroups('🐋', '🦈', '🦑', '🐇', '🐇', 1);
  addToGroups('2️⃣', '6️⃣', '8️⃣', '4️⃣', '2️⃣', 1);

    // moderate groups
  addToGroups('49', '36', '55', '25', '55', 2);
  addToGroups('🌍', '🏀', '🚗', '💍', '🚗', 2);
  addToGroups('🧤', '💼', '🩲', '👖', '💼', 2);
  addToGroups('24', '15', '11', '48', '11', 2);
  addToGroups('gin', 'ego', 'owl', 'boy', 'gin', 2);
  addToGroups('kg', 'lb', 'oz', 'cm', 'cm', 2);
  addToGroups('33', '66', '99', '22', '22', 2);
  addToGroups('5', '11', '7', '14', '14', 2);

    // difficult groups
  addToGroups('10', '45', '21', '32', '32', 3);
  addToGroups('3', '6', '28', '34', '34', 3);
  addToGroups('Si', 'C', 'Ge', 'Au', 'Au', 3);
  addToGroups('Fe', 'Cl', 'Ag', 'Au', 'Cl', 3);
  addToGroups('🐍', '🐠', '🐄', '🐓', '🐄', 3);
};

function hideElement(element) {
  element.style.display = 'none';
}
function startGame(){
  hideElement(container);
  loadGameData();
  renderInitialDisplay();
  
  bgMusic.play();
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


// const startBtn = document.querySelector('.start-btn');
let currentSlide = 0;
// intro
function nextSlide() {
  slides[currentSlide].classList.remove('current-slide');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('current-slide');
  if (currentSlide === 0) {
    startBtn.style.display = 'block';
  } else {
    startBtn.style.display = 'none';
  }
}

container.addEventListener('click', nextSlide);