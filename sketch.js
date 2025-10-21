let myBubbles, points, timer, isGame, popped, spd; //variable initiation

function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER);
  rectMode(CENTER);

  stroke(255);
  textSize(20);
  timer = -1;
  isGame = false;
} 

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Bubble(x,y,r,c) { //craete a bubble object
  this.x = x;
  this.y = y;
  this.r = r;
  this.c = c;

  if (this.r < 15) {  //the points the bubble is worth depends on the size
    this.p = 3;
  } else  if (this.r < 10) {
    this.p = 5;
  } else  if (this.r < 6) {
    this.p = 8;
  } else {
    this.p = 1;
  }

  this.make = function make() { //the bubble consists of a main balloon portion and a small triangle beneath
    fill(this.c);
    ellipse(this.x, this.y, this.r * 2, this.r * 3);
    triangle(this.x, this.y +this.r*1.5,this.x - 5,  this.y +this.r *2, this.x + 5,this.y +this.r *2,);
  }
  this.move = function move() {  //smaller bubbles fall slower and vice versa
    this.y -= spd + (this.r / 50);
  }
}

function newBubble() {  //calls the new bubble constructor with these parameters
  return new Bubble(random(50,windowWidth-50), random(windowHeight), random(5,25),  color(random(1,255), random(1,255), random(1,255), 50));
}


function draw() {
  background(220);
  stroke(0);
  strokeWeight(50);
  fill(0, 0);
  rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight); //create a border

  strokeWeight(1);
  if (isGame) {
    playBall();  //main game
  } else {
    startMenu();  // start menu
  }
}

function startMenu() {  //introduces player to the game and allows them to select one of three difficulties via rect buttons
  //info text
  stroke(0);
  fill(0); 
  text("Welcome to Balloon Popper", windowWidth/2, windowHeight/2 - 60);
  text("Select your difficulty", windowWidth/2, windowHeight/2 - 30);
  text("Click balloons to pop them. Smaller balloons are worth more points.", windowWidth/2, windowHeight-100);
  text("Easy", windowWidth/3, windowHeight/2 + 120);
  text("Medium", windowWidth/2, windowHeight/2 + 120);
  text("Hard", windowWidth/3 * 2, windowHeight/2 + 120);

  //the buttons
  strokeWeight(3);
  fill(70, 235, 52);
  rect(windowWidth/3, windowHeight/2 + 60, 80, 40);
  fill(230, 125, 34);
  rect(windowWidth/2, windowHeight/2 + 60, 80, 40);
  fill(230, 34, 34);
  rect(windowWidth/3 * 2, windowHeight/2 + 60, 80, 40);
}

function playBall() {  // main portion of the game
  stroke(255);
    for (let j=0; j<myBubbles.length -1; j++) {
      myBubbles[j].make();  //for the current bubble, call the make func to draw it
      if (timer > 0) {  //if the timer is no yet zero, move the current bubble
        myBubbles[j].move();
      }
      if (myBubbles[j].y < 50) { //if the current bubble is above the top border... 
        myBubbles[j] = newBubble(); //...replace it
      }
      if ((timer > 0) && 
      (mouseIsPressed) && 
      ((mouseX < myBubbles[j].x + myBubbles[j].r) && 
      (mouseX > myBubbles[j].x - myBubbles[j].r)) && 
      ((mouseY < myBubbles[j].y + myBubbles[j].r) && 
      (mouseY > myBubbles[j].y - myBubbles[j].r))) { //if the timer is above zero and the mouse is clicked over a bubble...

        myBubbles[j] = newBubble(); //...replace it
        points += myBubbles[j].p; //...increase the players score by the appropriate amount according to the bubble
        popped += 1; //...increase the number of bubbles popped by 1
      }
    }

    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      timer --;
    }

    stroke(0);
    fill(0);
    if (timer > 0) {
    text("Balloon Popper", windowWidth/2, 50);
    text("Balloons Popped: " + popped + "      Points: " + points + "      Time: " + timer, windowWidth/2, 80); //display players stats and time remaining during the game at the top of the screen
    } else {
      text("Game Over!", windowWidth/2, windowHeight/2 - 60);  //display players stats after the timer has reached zero in the middle of the screen
      text("Final Score\nBalloons Popped: " + popped + "\nPoints: " + points, windowWidth/2, windowHeight/2 - 10);
      text("Press Enter to play again", windowWidth/2, windowHeight/2 + 90);
      
      if (keyIsPressed && keyCode === ENTER) {  //restart the game to the start menu
          isGame = false;
      }
  }
}

function mousePressed() { //depending on where the user clicks, a different difficulty will be selected
  if (!(isGame)) { 
    if (((mouseX > windowWidth/3 - 40) && (mouseX < windowWidth/3 + 40)) && ((mouseY > windowHeight/2 + 40) && (mouseY < windowHeight/2 + 80))) {
      spd = 1;
      startup();
    } else if (((mouseX > windowWidth/2 - 40) && (mouseX < windowWidth/2 + 40)) && ((mouseY > windowHeight/2 + 40) && (mouseY < windowHeight/2 + 80))) {
      spd = 3;
      startup();
    } else if (((mouseX > windowWidth/3 * 2 - 40) && (mouseX < windowWidth/3 * 2 + 40)) && ((mouseY > windowHeight/2 + 40) && (mouseY < windowHeight/2 + 80))) {
      spd = 7;
      startup();
    } 
    
  }
}

function startup() {
  isGame = true;
  points = 0;
      popped = 0;
      timer = 10;
      background(220);
      myBubbles = [];
      for (let i=0; i<30; i++) { //create thirty origonal bubbles
        myBubbles.push(newBubble());
      }
}

      