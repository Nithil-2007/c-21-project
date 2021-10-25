//creating variables
var forestImg, forest
var playeImg, player
var invisibleLineImg, invisibleLine
var bulletImg, bullet
var stone1Img,stone1
var animal1Img, animal1 , animal2Img, animal2
var gameOverImg, gameOver
var restartImg, restart

//score
var KILLS = 0
var SCORE =0
//gameStates
var PLAY = 1
var END =0
var gameState = 1

function preload()
{
 //adding images to variable
playerImg = loadImage("player.png")
forestImg = loadImage("background1.jpg")
bulletImg = loadImage("bullet 2.png")
stone1Img = loadImage("stone1.png")
animal1Img = loadImage("animal1.png")
gameOverImg = loadImage("gameOver1.png")
restartImg = loadImage("restart1.png")
animal2Img = loadImage("animal2.png")

}
function setup()
{
createCanvas(400,400)

//creating forest
forest = createSprite(40,100,40,40)
forest.addImage("back", forestImg)
forest.scale = 1
forest.velocityX= -3
forest.x = width/2

//creating player
player = createSprite(50,260,20,20)
player.addImage("hunter", playerImg)
player.scale = 0.25

//creating invisible line
invisibleLine = createSprite(40,310,400,10)
invisibleLine.visible = false

//creating group
bulletGroup = new Group()
stone1Group = new Group()
animal1Group = new Group()
animal2Group = new Group()

//creating gameover sprite
gameOver = createSprite(200,190,20,20)
gameOver.addImage("over", gameOverImg)

//creating restart sprite
restart = createSprite(200,270,20,20)
restart.addImage("reset", restartImg)
restart.scale = 0.15

player.debug = true 
player.setCollider("rectangle", 0,0,20,300)
stone1Group.debugEach = true

}

function draw(){
//adding gameState
if(gameState===PLAY) 
{
//infinite background
if(forest.x<400)
{
  forest.x = forest.width/2
}

//creating bullet
if(keyDown("space"))
{
createBullet()
}

//making player jump
if(keyDown("up")&& player.y >= 200) {
  player.velocityY = -10;
}

player.velocityY = player.velocityY + 0.8

//making obstacle spawning in different positions
if(frameCount % 100 ==0)
{
  var choose_obstacle = Math.round(random(1,3))

  switch(choose_obstacle)
  {
    case 1:obstacle1()
    break;
    case 2:obstacle2()
    break;
    case 3:obstacle3()
    break;
    default:break;

  }
}
//adding when game state should be end
if(player.isTouching(stone1Group))
{
  gameState = END
  
}

if(animal1Group.isTouching(bulletGroup))
{
KILLS = KILLS+1
SCORE = SCORE+2
animal1Group.destroyEach()
bulletGroup.destroyEach()
}

if(player.isTouching(animal1Group))
{
  gameState = END
 
}

if(animal2Group.isTouching(bulletGroup))
{
KILLS = KILLS+1
SCORE = SCORE+5
animal2Group.destroyEach()
bulletGroup.destroyEach()
}

if(animal2Group.isTouching(player))
{
  gameState = END
 
}

//making gameOver and restart invisible
gameOver.visible = false
restart.visible = false



}

//adding gamestate end
if(gameState === END)
{
  forest.velocityX = 0
  stone1Group.destroyEach()
  animal1Group.destroyEach()
  player.visible = false
  bulletGroup.destroyEach()
  gameOver.visible = true
  restart.visible = true

  //adding function to reset the game
  if(mousePressedOver(restart))
  {
    reset()
  }

}

//making player collide with invisible line
player.collide(invisibleLine)

background(0);
drawSprites();
stroke("blue")
fill("red")
text("SCORE: "+SCORE,320,30)
text("KILLS: "+KILLS, 320,50)

}

function createBullet()
{
  //creating bullet
bullet = createSprite(70,player.y,20,20)
bullet.addImage("dhoot", bulletImg)
bullet.scale = 0.05
bullet.velocityX = 3
bulletGroup.add(bullet)
}

function obstacle1()
{
  //creating obstacle 1
  stone1 = createSprite(Math.round(random(350,400)),280,20,20)
  stone1.addImage("out", stone1Img)
  stone1.scale = 0.15
  stone1.velocityX = -3
  stone1Group.add(stone1)
  stone1Group.debug = true
}

function obstacle2()
{
  //creating obstacle 2
  animal1 = createSprite(Math.round(random(350,400)),280,20,20)
  animal1.addImage("obstacle2", animal1Img)
  animal1.scale = 0.5
  animal1.velocityX = -4
  animal1Group.add(animal1)
  
}

//function for reset
function reset()
{
  gameState = PLAY
  KILLS = 0
  player.visible = true
  forest.velocityX = -3
  player.x = 50
  player.y = 260
}

function obstacle3()
{
  animal2 = createSprite(Math.round(random(350,400)), 280,20,20)
  animal2.addImage("obstacle2", animal2Img)
  animal2.scale = 0.15
  animal2.velocityX = -4
  animal2Group.add(animal2)
}