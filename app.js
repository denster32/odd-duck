'use strict';

// ****** GLOBALS *****
let productArray = [];
let votingRounds = 25;
let imgOneTest;
let imgTwoTest;
let imgThreeTest;

// ***** DOM WINDOWS *****
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
// let resultsList = document.getElementById('results-container');

// ***** CANVAS ELEMENTS *****
const canvasElemBar = document.getElementById('barChart');
const canvasElemRadar = document.getElementById('radarChart');
const canvasElemPie = document.getElementById('pieChart');


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

  do{
    imgOneIndex = randomIndex();
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
    console.log(`imgOneIndex is ${imgOneIndex}. imgTwoIndex is ${imgTwoIndex}. imgThreeIndex is ${imgThreeIndex}.`);
  }
  while((imgOneIndex === imgTwoIndex || imgTwoIndex === imgThreeIndex || imgOneIndex === imgThreeIndex) || imgOneIndex === imgOneTest || imgOneIndex === imgTwoTest || imgOneIndex === imgThreeTest || imgTwoIndex === imgOneTest || imgTwoIndex === imgTwoTest || imgTwoIndex === imgThreeTest || imgThreeIndex === imgOneTest || imgThreeIndex === imgTwoTest || imgThreeIndex === imgThreeTest);

  console.log(`imgOneTest is ${imgOneTest}. imgTwoTest is ${imgTwoTest}. imgThreeTest is ${imgThreeTest}.`);
  console.log('*****break*****');

  imgOneTest = imgOneIndex;
  imgTwoTest = imgTwoIndex;
  imgThreeTest = imgThreeIndex;


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

function renderChart(){
  let productNames = [];
  let productVotes = [];
  let productViews = [];
  let productPercent = [];
  for(let i = 0; i < productArray.length; i++ ){
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].votes);
    productViews.push(productArray[i].views);
    productPercent.push(Math.round((productArray[i].votes / productArray[i].views) * 100));
  }
  Chart.defaults.font.size = 30;

  let chartObjBar = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  let chartObjRadar = {
    type: 'radar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Custom Chart Title',
          padding: {
            top: 10,
            bottom: 30
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  let chartObjPie = {
    type: 'pie',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Percent Product Chosen',
        data: productPercent,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(canvasElemBar, chartObjBar);
  new Chart(canvasElemRadar, chartObjRadar);
  new Chart(canvasElemPie, chartObjPie);
}

// ***** EVENT HANDLERS *****
function handleClick(event){

  let imgClicked = event.target.title;

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
    renderChart();

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
