var PLAY = 1;
var END = 0;
var gameState = PLAY;
var canvas, backgroundImage;
var biker,shop,road
var score = 0,shopsGroup
var gameOver,restart
var gameOverImg,restartImg
var s



function preload() {
road = loadImage("images/track.jpg");
biker = loadImage("images/biker.png");
shop1 = loadImage("images/shop1.png");
shop2 = loadImage("images/shop2.png");
restartImg = loadImage("images/restart.png")
gameOverImg = loadImage("images/gameOver.png");
s = loadSound("sounds/sliding.mp3");
}














function setup() {
  canvas = createCanvas(displayWidth,displayHeight);    
  track1 = createSprite(width/2,height/2)
 //track1.scale = 8
  track1.velocityY = 5
  track1.addImage("road",road)
  bikerracer = createSprite(width/2,height - 200)
  bikerracer.addImage("biker",biker)
  bikerracer.scale = 0.2
  shopsGroup = new Group()
  bikerracer.debug = false
  bikerracer.setCollider("rectangle",0,0,250,500)
  gameOver = createSprite(width/2,height/2-200);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.7;
  restart.scale = 0.1;



  
}





function draw() {
  background("black"); 


 if(bikerracer.x<485){
   bikerracer.x=485
 }
if(bikerracer.x>1050){
  bikerracer.x=1050
}
if(bikerracer.y<500){
  bikerracer.y=500
}


  if(gameState === PLAY){
        gameOver.visible = false;
        restart.visible = false;

        track1.velocityY = 5+score/200;

        if(track1.y>600){
           track1.y = 200 }

           if(keyDown(38)){
            bikerracer.y -= 2;
          
        }

        if(keyDown(37)){
          bikerracer.velocityX -= 0.3
      }
      if(keyDown(39)){
        bikerracer.velocityX += 0.3
        }
        spawnShops()
        score = score + Math.round(getFrameRate()/60);
        if(bikerracer.isTouching(shopsGroup)){
          gameState = END
        s.play()
      
        }
  

  }else if(gameState === END){
    track1.velocityY = 0
   shopsGroup.setVelocityYEach(0)
   bikerracer.velocityX = 0
   gameOver.visible = true;
   restart.visible = true;
   if(mousePressedOver(restart)) {
    reset();
  }
  
}


 drawSprites();

 strokeWeight(2);
 stroke("White");
 textSize(20)
 text("S c o r e : "+ score, 150,400);

}

function reset(){
  gameState = PLAY;
  score = 0;
  shopsGroup.destroyEach();
  bikerracer.x = width/2
  bikerracer.y = height-200
}







function spawnShops(){
if(frameCount % 120  === 0){
  var shop = createSprite(200,0)
  shop.addImage("shop",shop1)
  shop.scale = 0.2
  shop.velocityY = 2
  shop.x = Math.round(random(600,1000))
  shopsGroup.add(shop)
  shop.depth = bikerracer.depth
  bikerracer.depth += 1
}

}