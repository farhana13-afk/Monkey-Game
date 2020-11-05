
var monkey , monkey_running
var banana ,bananaImage;
var obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score1, score2;
var ground;

var PLAY=0;
var END=1;
var gameState = 0;

function preload(){
  
  
  monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop = loadAnimation("sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350, 900,10);
  ground.x = ground.width /2; 
  console.log(ground.x);
  
  FoodGroup = new Group();
    obstacleGroup = new Group();

  score1=0;
  score2=0;
  
}


function draw() {
   background("white");
  
  text("Survival Rate= " + score1,280,25);
  text("Banana Score= " + score2, 280,40);
  
  if(gameState===0){
       ground.velocityX = -4;
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space") && monkey.y>=250){
    monkey.velocityY = -12;
      
  }
    
    spawnBananas();
    spawnObstacles();
    
    score1=score1 + Math.round(getFrameRate()/60);
   
     
    if(FoodGroup.isTouching(monkey)){
      banana.destroy();
      score2 = score2 + 1;
    }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState= 1;
    }
    
  } else if(gameState === 1){
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
    
    textSize(30);
    text("Game Over",130,150);
    text("Press 'r' to restart",100,200);
    
    if(keyDown("r")){
      Restart();
    }
  }
  
  monkey.velocityY = monkey.velocityY + 0.37;
  monkey.collide(ground);
   
  drawSprites();

}

function Restart(){
  gameState = 0;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  score1=0;
  score2=0;
  monkey.changeAnimation("moving", monkey_running);
}

function spawnBananas(){
  
  if(frameCount%80 === 0){
  banana= createSprite(400,170,40,10);
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.y= Math.round(random(120,250));
  banana.velocityX= -(4 + score1/100); 
  banana.lifetime= 200;
    
  banana.depth = monkey.depth;
  monkey.depth= monkey.depth +1;
    
  FoodGroup.add(banana);
    
  banana.setCollider("circle",0,0,30);
  }
}

function spawnObstacles(){

  if(frameCount%300===0){
  obstacle = createSprite(400,330,10,40);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-(3 + score1/50);
    
    obstacleGroup.add(obstacle);
    
    
  obstacle.setCollider("circle",0,0,150);
  }
}








