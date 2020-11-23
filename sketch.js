
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;



function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_dead = loadAnimation("sprite_3.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(80, 315, 10, 10);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided", monkey_dead);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.x = ground.width/2;
  console.log(ground.x);

  invisibleGround = createSprite(100,350,800,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  FoodGroup = new Group();
  
  monkey.collide(invisibleGround);
  monkey.setCollider("rectangle",0, 0, 350, monkey.height);
  
  score = 0; 

}


function draw() {
  background(180);
  
  if(gameState === PLAY){

    ground.velocityX = -4;

    if (ground.x>0 ) {
      ground.x = ground.width/2;
    }
    
    monkey.velocityY = monkey.velocityY +0.8;

    if(keyDown("space") && monkey.y >= 100) {
      monkey.velocityY = -12;
    }
    
    if(FoodGroup.isTouching(monkey)) {
      score = score +1;
    }
    console.log(score);
    stroke("white");
    textSize(20);
    fill("white");
    text("Score: "+ score, 50, 50);
    
    spawnBANANAS();
    spawnObstacles();
  }
  
  
  
  if(obstaclesGroup.isTouching(monkey)) {
    gameState = END;
  }
  
  if(gameState === END) {
    monkey.changeAnimation("collided", monkey_dead)
    ground.velocityX = 0;
    
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    stroke("white");
    textSize(50);
    fill("white");
    text("Game Over", 130, 250);
    
  }

  
  monkey.collide(invisibleGround);
  
  

  drawSprites();
}

function spawnBANANAS() {
  if(frameCount%60 === 0) {
    var bananes = createSprite(500, 300, 10, 20);
    bananes.y = Math.round(random(100, 200));
    bananes.addImage(bananaImage);
    bananes.scale = 0.1;
    bananes.velocityX = -3;
    
    
    bananes.lifetime = 150;
    FoodGroup.add(bananes);
  }
}

function spawnObstacles() {
  if(frameCount%38 === 0) {
    var obstacles = createSprite(100, 330, 20, 20);
    obstacles.x = Math.round(random(300, 600));
    obstacles.addImage(obstacleImage);
    obstacles.velocityX = -4;
    obstacles.scale = 0.1;
    
    obstacles.lifetime = 160;
    obstaclesGroup.add(obstacles);
    
  }
}




