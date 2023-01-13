// GLOBAL VARIABLES

let difficulty = 3;
let correctAnswer;
let score = 0;
let cycleTime = 7000;
let hasClicked = false;
// GLOBAL ELEMENTS

// population
let popOfHumansElement = document.querySelector('#pop-of-humans');
let popOfHumans = Number(popOfHumansElement.innerText);
console.log(`popOfHumans: ${popOfHumans}`);
let popOfInvadersElement = document.querySelector('#pop-of-invaders');
let popOfInvaders = Number(popOfInvadersElement.innerText);
console.log(`popOfInvaders: ${popOfInvaders}`);



// choices
let choices = document.querySelectorAll('.choice');

// console.log(`choices: ${choices[0]}, ${choices[1]}, ${choices[2]}, ${choices[3]}`);
let choicesDisplayedA = document.querySelector('#choice1');
let choicesDisplayedB = document.querySelector('#choice2');
let choicesDisplayedC = document.querySelector('#choice3');
let choicesDisplayedD = document.querySelector('#choice4');

// arrays containing the group for choices
const easyGroups = [];
const moderateGroups = [];
const difficultGroups = [];
const difficulties = [1,2,3];
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

//populating the easyGroups array using the addToGroup and createGroup functions
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
// addToGroups('Japan', 'China', 'France', 'Korea', 'Korea', 2);
// addToGroups('Caracas', 'Madrid', 'Sydney', 'Manila', 'Sydney', 2);

// difficult groups
addToGroups('10', '45', '21', '32', '32', 3);
addToGroups('3', '6', '28', '34', '34', 3);
addToGroups('Si', 'C', 'Ge', 'Au', 'Au', 3);
addToGroups('Fe', 'Cl', 'Ag', 'Au', 'Cl', 3);
addToGroups('🐍', '🐠', '🐄', '🐓', '🐄', 3);
// addToGroups('Java', 'React', 'Python', 'Ruby', 'React', 3);
// addToGroups('proton', 'cation', 'electron', 'neutron', 'neutron', 3);
// addToGroups('Italy', 'Poland', 'Japan', 'Canada', 'Italy', 3);

console.log(easyGroups.length);
console.log(moderateGroups.length);
console.log(difficultGroups.length);


let cycle = setInterval(sendGroup, cycleTime);

// evenlisteners

function disableButtons() {
  choices.forEach( e => e.disabled = true );
}

function enableButtons() {
  choices.forEach( e => e.disabled = false );
}

let getSelected = (e) => {

  e.stopPropagation();

  console.log(`${e.target.innerText}`);
  if(e.target.innerText != correctAnswer){
    score = score <= 10? 0 : score - 100;
    popOfHumans = popOfHumans <= 3000? 0 : popOfHumans - 3000;
    popOfInvaders = popOfInvaders + 3000;
  } else {
    score += 100;
  }

  disableButtons();
  updatePopulation();
  updateScore();
  let element = document.querySelector('.capsule-container');
  element.classList.remove('moving-down');
  element.classList.add('at-bottom');
  void element.offsetWidth;
  setTimeout(function(){
    element.classList.remove('at-bottom');
    element.classList.add('moving-down');
    clearInterval(cycle);
    cycle = setInterval(sendGroup, cycleTime);
    sendGroup();
  }, 1000);
  // console.log(element.classList);
};


choices.forEach((e) => e.addEventListener('click', getSelected));

function applyPenalty(){
  let element = document.querySelector('.capsule-container');
  console.log(`applyPenalty is called`);
  element.classList.remove('moving-down');
  void element.offsetWidth;
  element.classList.add('moving-down');
  if(!hasClicked){
    score = score <= 10? 0 : score - 100;
    popOfHumans = popOfHumans <= 3000? 0 : popOfHumans - 3000;
    popOfInvaders = popOfInvaders + 3000;
    updatePopulation();
    updateScore();
  };
}

/* DOM MANIPULATIONS */
let element = document.querySelector('.moving-down');
element.addEventListener('animationend', applyPenalty);


function updateScore(){
  console.log(`score: ${score}`);
  document.getElementById('score-value').textContent = score;
}

function updatePopulation() {
  if(popOfHumans <= 0){
    popOfInvaders += popOfHumans; 
    popOfHumans = 0;
    displayGameOver();
  } else{
    // popOfHumans = popOfHumans;
    // popOfInvaders = popOfInvaders;
    popOfHumansElement.textContent = popOfHumans;
    popOfInvadersElement.textContent = popOfInvaders;
  }
  console.log(`popOfHumans/popOfInvaders ${popOfHumans} / ${popOfInvaders}`);
}
function displayGameOver(){
  alert('Game Over');
}

//starting a new cycle with a new group
function sendGroup(){
  console.log(`l##### STARTING A NEW CYCLE ###########`);
  enableButtons();
  let fromDifficulties = Math.ceil(Math.random() * difficulty);
  console.log(`fromDifficulties: ${fromDifficulties}`);

  const getAGroup = function(fromDifficulties){
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

