var aircraftImage,aircraft;
var jetImage,jet, backgroundImage,Background;
var bulletImage,tempbullet,bullet,jet1Group,jet2Group,jet3Group,bulletGroup;
var score=0;
var heartImage,heart1,heart2,heart3;
var count=4;
var gameoverImage,gameover;
var restartImage,restart;
var gameState="play"
var coinImage,coin,coin1Group,coin2Group,coin3Group;
var coinsound;
var counthen=1;
var countcoin=1;
function preload(){

  aircraftImage = loadImage("aircraft.jpg");
  jetImage = loadImage("jet.jpg");
  backgroundImage  = loadImage("sky.jpg");
  bulletImage = loadImage("bullet-removebg-preview.png");
  heartImage = loadImage("life_heart_symbol-removebg-preview.png")
  restartImage = loadImage("red_reset-removebg-preview.png");
  gameoverImage = loadImage("gameover_mgh-1-removebg-preview.png");
  coinImage = loadImage("gold_coins-removebg-preview.png");
  coinsound = loadSound("341695__projectsu012__coins-1.wav")
 
}

function setup() {
  createCanvas(500,400);

  Background = createSprite(200,200,10,10);
  Background.addImage(backgroundImage);
  Background.scale=3.7;
 
 
  aircraft = createSprite(50,200,20,50);
  aircraft.addImage(aircraftImage);
  aircraft.scale=0.2;
 
  heart1 = createSprite(40,50,20,50);
  heart1.addImage(heartImage);
  heart1.scale=0.1;
  heart1.depth=aircraft.depth-1;
 
  heart2 = createSprite(65,50,20,50);
  heart2.addImage(heartImage);
  heart2.scale=0.1;
  heart2.depth=aircraft.depth-1;
 
  heart3 = createSprite(90,50,20,50);
  heart3.addImage(heartImage);
  heart3.scale=0.1;
  heart3.depth=aircraft.depth-1;
 
  gameover = createSprite(250,200,10,10);
  gameover.addImage(gameoverImage);
  gameover.scale=0.3;
 
  restart = createSprite(250,265,10,10);
  restart.addImage(restartImage);
  restart.scale=0.2;
  
 
  jet1Group=createGroup();
  jet2Group=createGroup();
  jet3Group=createGroup();
 
  bulletGroup=createGroup();
  coin1Group=createGroup();
  coin2Group=createGroup();
  coin3Group=createGroup();
}

function draw() {
  background(180);
  Background.velocityX=-2;
  if(gameState==="play")
  {
    gameover.visible=false;
    restart.visible=false;
    spawnjets();
    spawncoins();
    aircraft.setCollider("rectangle", 0,10,145,130);
    if(keyDown("up")&&aircraft.y>30){
       aircraft.y = aircraft.y - 8;
    }
    if(keyDown("down")&&aircraft.y<370){
       aircraft.y = aircraft.y + 8;
    }
    if(keyWentDown("space")){
       temp=Bullet();
    }
    if(bulletGroup.isTouching(jet1Group)){
      bulletGroup.destroyEach();
      jet1Group.destroyEach();
      score=score+1;  
    }
    if(bulletGroup.isTouching(jet2Group)){
      bulletGroup.destroyEach();
      jet2Group.destroyEach();
      score=score+1;  
    }
    if(bulletGroup.isTouching(jet3Group)){
      bulletGroup.destroyEach();
      jet3Group.destroyEach();
      score=score+1;  
    }
    if(aircraft.isTouching(coin1Group)){
      coinsound.play();
      coin1Group.destroyEach();
      score=score+1;  
    }
    if(aircraft.isTouching(coin2Group)){
      coinsound.play();
      coin2Group.destroyEach();
      score=score+1;  
    }
    if(aircraft.isTouching(coin3Group)){
      coinsound.play();
      coin3Group.destroyEach();
      score=score+1;  
    }
    if(aircraft.isTouching(jet1Group)){
      jet1Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }
    if(aircraft.isTouching(jet2Group)){
      jet2Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }  
    if(aircraft.isTouching(jet3Group)){
      jet3Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }
  }  
  if(Background.x<0){
    Background.x=Background.width/2;
  }
  drawSprites();
  fill("purple");
  textSize(18);
  text("Score: "+score,380,50)
 
  if(gameState==="End"){
    jet.velocityX=0;
    aircraft.visible=false;
    Background.velocityX=0;
    gameover.visible=true;
    restart.visible=true;
    coin1Group.destroyEach();
    coin2Group.destroyEach();
    coin3Group.destroyEach();
    bulletGroup.destroyEach();
    jet1Group.destroyEach();
    jet2Group.destroyEach();
    jet3Group.destroyEach();
  }
  if(mousePressedOver(restart)&&gameState==="End"){
    reset();
  }
}
function Bullet()
{
  bullet=createSprite(90,200,10,10);
  bullet.addImage(bulletImage);
  bullet.scale=0.175;
  bullet.y=aircraft.y+5;
  bullet.velocityX=10;
  bullet.lifetime=50;
 // return bullet;
  bulletGroup.add(bullet);
}

function spawnjets(){
  if(frameCount%60===0){
     jet = createSprite(470,Math.round(random(40,380)))
     jet.addImage(jetImage);
     jet.scale=0.06;
     jet.velocityX=-(3+(score/4))
     jet.lifetime=166.66;
     if(counthen===1)
     {
       counthen=counthen+1;
       jet1Group.add(jet);
     }
     else if(counthen===2)
     {
       counthen=counthen+1;
       jet2Group.add(jet);
     }
     else
     {
        jet3Group.add(jet);
        counthen=1;
     }
 
  }
}
function spawncoins(){
  if(frameCount%60===0){
    coin=createSprite(470,Math.round(random(30,370)))
    coin.addImage(coinImage);
    coin.scale=0.2;
    coin.velocityX=-4;
    coin.lifetime=250;
   
    if(countcoin===1)
     {
       countcoin=countcoin+1;
       coin1Group.add(coin);
     }
     else if(countcoin===2)
     {
       countcoin=countcoin+1;
       coin2Group.add(coin);
     }
     else
     {
        coin3Group.add(coin);
        countcoin=1;
     }
  }
}

function reset(){
   gameState="play"
   score=0;
   gameover.visible=false;
   restart.visible=false;
   aircraft.visible=true;
   aircraft.y=200;
   heart1.visible=true;
   heart2.visible=true;
   heart3.visible=true;
   count=4;
}