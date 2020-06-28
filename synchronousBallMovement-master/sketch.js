var database;
var form,player,game;
var gamestate = 0;
var playercount;
var allplayers;
var car1,car2,car3,car4;
var cars;
var car1img,car2img,car3img,car4img;
var groundimg;
var trackimg;

function preload() {
  car1img = loadImage("images/car1.png");
  car2img = loadImage("images/car2.png");
  car3img = loadImage("images/car3.png");
  car4img = loadImage("images/car4.png");
  groundimg = loadImage("images/ground.png");
  trackimg = loadImage("images/track.jpg");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  database = firebase.database();
  game = new Game();
  game.getstate();
  game.start(); 
}

function draw() {
  if(playercount===4) {
    game.update(1);
  }

  if(gamestate===1) {
    clear();
    game.play();
  }
  
}