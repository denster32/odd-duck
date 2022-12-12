'use strict';

// ****** GLOBALS *****
let productArray = [];
let votingRounds = 25;

// ***** DOM WINDOWS *****
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// ***** CONTRUCTOR FUNCTIONS *****
function Product(name, imgExtension = 'jpg'){
  this.name = name;
  this.img = `img/${name}.${imgExtension}`;
  this.votes = 0;
  this.views = 0;
}

// ***** HELPER FUNCTIONS / UTILITIES
function randomIndex(){
  return Math.floor(Math.random() * productArray.length);
}



function renderImg(){
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();

  // ** Validation to make sure numbers are unique **
  while(imgOneIndex === imgTwoIndex || imgTwoIndex === imgThreeIndex || imgOneIndex === imgThreeIndex){
    imgOneIndex = randomIndex();
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }

  imgOne.src = productArray[imgOneIndex].img;
  imgTwo.src = productArray[imgTwoIndex].img;
  imgThree.src = productArray[imgThreeIndex].img;
  imgOne.title = productArray[imgOneIndex].name;
  imgTwo.title = productArray[imgTwoIndex].name;
  imgThree.title = productArray[imgThreeIndex].name;

  imgOne.alt = `This is an image of ${productArray[imgOneIndex]}.img`;
  imgTwo.alt = `This is an image of ${productArray[imgTwoIndex]}.img`;
  imgThree.alt = `This is an image of ${productArray[imgThreeIndex]}.img`;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;
}

// ***** EVENT HANDLERS *****
function handleClick(event){

  let imgClicked = event.target.title;
  console.log(imgClicked);

  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].name){
      productArray[i].votes++;
    }
  }
  votingRounds--;
  renderImg();
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
}

function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < productArray.length; i++){
      let liElem = document.createElement('li');
      let percentChosen = Math.round((productArray[i].votes / productArray[i].views) * 100);
      console.log(percentChosen);
      liElem.textContent = `${productArray[i].name} had ${productArray[i].votes} vote(s) and was seen ${productArray[i].views} times. It was selected ${percentChosen}% of the time when shown.`;
      resultsList.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

// ***** EXECUTABLE CODE *****
let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let petSweep = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn= new Product('unicorn');
let waterCan = new Product('water-can');
let wineGlass = new Product('wine-glass');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);

renderImg();

imgContainer.addEventListener('click', handleClick);
resultsBtn.addEventListener('click', handleShowResults);

console.log(productArray);