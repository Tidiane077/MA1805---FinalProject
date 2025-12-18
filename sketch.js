let myFont

let bubbleCount = 4;

let xs = [];
let ys = [];
let dxs = [];
let dys = [];
let words = ["Happy", "Sad", "anxious", "Bored"]
let selectedMood = "";
let flashTimer = 0;
let sizes = [];
let colors = [];
let happySound, sadSound, anxiousSound, boredSound;

function preload() {
myFont = loadFont ('Fonts/myfont.ttf');

}

function setup() {
  createCanvas(windowWidth,windowHeight); 
  //size of webart
  textFont(myFont);

//Creates bubbles in bottom half//
for (let i = 0; i < bubbleCount; i++) {
  xs[i] = random(width);
  ys[i] = random(height / 2, height);
  dxs[i] = random(-2, 2);
  dys[i] = random(-2, 2)
  sizes[i] = random(100,180);
  colors[i] = color(168, 72, 50);
}

}

function draw() {
  background(0);

  drawTitle();
  drawQuestion();
  drawBubbles();
  handleFlash();
}

  //Title//
  function drawTitle() {
  let flicker = random(0.2, 1); 
  //Makes text flicker//
  fill (168, 72, 50, flicker * 240);
  textSize (40);
  text("LAZURUS CAFE", 720, 100); 
  }
  //trial and error to find the exact 
  // middle of the screen//


  function drawQuestion() {
  fill(168,72,50,250); //No flicker
  textFont('sans-serif');
  textSize (24);
  text("How'd ya Feel?", 720, 400 + 10);
  }
  
  function drawBubbles() {
  for (let i = 0; i< bubbleCount; i++) {

    //bubbles//

    let d = dist(mouseX, mouseY, xs[i], ys[i]); 
    //Youtube videos from Benjamin Siegel//

    drawGlow(i);

    if (d < 75) {

      fill(168, 72, 50, 120); //hover colour//
    } else {
      noFill();
    }

    //ellipse (x, y, 150, 150) 

    //fill(256);
    //textSize(20);
    //textAlign(CENTER);
    //text("Happy", x, y);
    
    //x = x + dx;
    //y = y + dy;
    //if(x > width || x < 0) {
    //dx = dx * -1;
    //}
    //Used this to originally make 1 bubble bounce 
    // when it hits the border.
    //Changed it after to make loops and arrays as 
    // this was more efficient.

  stroke(168,72,50);
  strokeWeight(2);
  ellipse(xs[i], ys[i], sizes[i], sizes[i]);
  
  noStroke();
  fill(255);
  textSize(18);
  textAlign(CENTER);
  text(words[i], xs[i], ys[i]);

  if (d >= 75) {
    moveBubble(i);
  }
  } 
}

function moveBubble(i) {
  xs[i] += dxs[i];
  ys[i] += dys[i];

  if (xs[i] < 75 || xs[i] > width - 75) {
    dxs[i] *= -1;
  }

  let topLimit = height / 2;
  if (ys[i] < topLimit + 75 || ys[i] > height - 75) {
    dys[i] *= -1;
  }
}

function handleFlash() {
  if (flashTimer > 0) {
    flashTimer--;

    if (selectedMood === "Happy") 
      background(0, 255, 0);
    else if (selectedMood === "Sad") 
      background(0, 0, 255);
    else if (selectedMood === "anxious") 
      background(128, 128, 128);
    else if (selectedMood === "Bored") 
      background(255, 255, 0);
  }
}


function mousePressed() {
  for (let i = 0; i < bubbleCount; i++) {
    let d = dist(mouseX, mouseY, xs[i], ys[i]);
    if (d < 75) {
      selectedMood = words[i];
      flashTimer = 15;
      console.log("Clicked mood:", selectedMood);
      
      
    }
  }
}
//For the mousepressed funcntion watched different videos from youtubers 
// such as The Coding Train & Peter Groth and applied this with past lessons//
//dist = distance

function drawGlow (i) {
  let pulse = sin(frameCount * 0.2) * 10;
  if (dist(mouseX, mouseY, xs[i], ys[i]) < sizes[i] / 2) {
    noFill();
    stroke(colors[i]); 
    //same as bubble colours
    strokeWeight(4);
    
    for (let s = 0; s < 3; s++) {
      stroke(
        red(colors[i]),
        green(colors[i]),
        blue(colors[i]),
        50 - s * 10 
      
      ); 
      ellipse(xs[i], ys[i], sizes[i] + s * 10 + pulse);
    }
  }
}