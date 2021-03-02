var ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime= 0;
var invisible;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  jungle1 = loadImage("jungle.jpg");
}



function setup() {

   ground = createSprite(400,200,900,10);
   ground.addImage(jungle1);
  ground.scale = 1;
  ground.velocityX = -(9+5*survivalTime/6);
  
  
  monkey = createSprite(20,380,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 invisible = createSprite(20,380,900,10);
  invisible.visible = false;
 

  

  
 
//monkey.setCollider("circle",0,0,50);
  
monkeyGroup = new Group();
  bananaGroup = new Group();
  
 
}


function draw() {
background(220);
  
 
  
  
  
  
  
  if(gameState === PLAY){
    
   
   if(keyDown("space")&& monkey.y >= 314) {
        monkey.velocityY = -12;
      
    }
    
    monkey.velocityY = monkey.velocityY+0.5;
   
   
  
  monkey.collide(invisible);
    
    if(ground.x < 0){
   ground.x = ground.width/2;
 }
      console.log(monkey.scale);
    
obstacle();
    banana();
 switch(survivalTime){
   case 10 : monkey.scale = 0.12;
   break;
   case 20 : monkey.scale = 0.14;
     break;
     case 30 : monkey.scale = 0.16;
     break;
     case 40 : monkey.scale = 0.18;
     break;
     default : break;
   
 }
  
  if(obstacleGroup.isTouching(monkey)){
   monkey.scale = 0.1;
    survivalTime = 0;
   
  }
   if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     survivalTime= survivalTime+2;
   }

  }
   if(gameState === END){
     ground.velocityX = 0;
     monkey.velocityY = 0;
    
     
      obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0) 
     
      
 obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
      
   }
 

  
 
drawSprites();
text("Survival Time: ",180,50);
  text(survivalTime,270,50);
}
   
  

  


function obstacle(){
  if(frameCount%200 === 0){
  var obstacle = createSprite(400,355,10,10);
 obstacle.addImage("obstacle",obstacleImage);
  obstacle.velocityX = -(4+3*survivalTime/6);
    
    
     obstacleGroup.add(obstacle);
  obstacle.scale= 0.1;
    obstacle.lifetime = 100;
  
   
}
}

function banana(){
  if(frameCount%150 === 0){
    var banana= createSprite(400,250,10,10);
    banana.addImage(bananaImage)
    banana.velocityX = -(4+3*survivalTime/6);
    banana.scale = 0.1;
  
    bananaGroup.add(banana);
    banana.y = Math.round(random(250,198));
    banana.lifetime = 100;
    
  }
}




