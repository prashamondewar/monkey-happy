var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey = loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
   var message = "This is a message";
 console.log(message)
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);

  monkey.scale = 0.1;
  
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  
  
  
  //create Obstacle and Cloud Groups
  obstacleGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  score = 0;
}


function draw() {
background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  if(gamestate === PLAY){
  ground.velocityX = -(4 + 3* score/100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
   //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  
  spawnObstacles();
     if(obstacleGroup.isTouching(monkey)){
        //trex.velocityY = -12;
        gameState = END;
      
    }
  }
  else if(gamestate === END){
    monkey.changeAnimation("stopped", monkey)
    
     ground.velocityX = 0;
      monkey.velocityY = 0
      
   obstacleGroup.setLifetimeEach(-1);
   obstacleGroup.setVelocityXEach(0);
  }
  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstaceImage)
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
  

}
  //assign scale and lifetime to the obstacle           
   
}

