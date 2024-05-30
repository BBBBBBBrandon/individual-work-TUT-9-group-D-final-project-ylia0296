//We need a variable to hold our image
let img; //Variable to store the main image
let palette; //Variable to store the color paltte
let y = 0; //Variable to make the vertical position of the image

// This is global variable to store our image
let logoImage;
// Two variables to hold the width and height of the image
let logoWidth = 500; let logoHeight = 40;

//Let's make an object to hold the draw properties of the image
let imgDrwPrps = {aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0};

//And a variable for the canvas aspect ratio
let canvasAspectRatio = 1200 / 800; //set the variable of the canvas aspect ratio
const originalWidth = 1200; // set the original width
const originalHeight = 800; // set the original height
let aspectRatio = originalWidth / originalHeight; //Aspect ratio of the canvas

//create an array to hold the shapes
let shapes = [];

//Let's make a variate to hold the audio file
let song;

//Let's make a variate to hold the FFT object
let fft;

//Let's make a variate for the number of bins in the FFT object
//This is how many frequency bands we will have
//The number of bins must be a power of 2 between 16 and 1024 -
//Try changing this value
let numBins = 128;

//We will also have a variable for the smoothing of the FFT
//This averages the values of the frequency bands over time so it doesn't jump around too much
//Smoothing can be a value between 0 and 1
//try changing this value
let smoothing = 0.5;

//this time we will make a global variable for the button so we can access it in the windowResized function
let button;



//CLASS
// Brush class to hold the properties of a brush and this technique is from https://chatgpt.com/
class Brush {
  constructor(size, color) {
    this.size = size; // Brush size
    this.color = color; // Brush color
  }
  draw(x, y) {
    noStroke(); // Disable stroke
    fill(this.color); // Set fill color to brush color

  // Calculate random position within the brush size
  let angle = random(TWO_PI); // Random angle for brush stroke
  let length = random(this.size * 1.5, this.size * 1.5); // Random length for brush stroke
  let dx = cos(angle) * length; // X offset for brush stroke
  let dy = sin(angle) * length; // Y offset for brush stroke
  for (let i = 0; i < 5; i++) { // Draw multiple ellipses for blurred effect
    let offsetX = random(-this.size, this.size); // Random X offset for blur
    let offsetY = random(-this.size, this.size); // Random Y offset for blur
    ellipse(x + dx + offsetX, y + dy + offsetY, this.size, this.size); // Draw blurred circle
    }
  }
}

//this class will create and manage a random shape with noise
class randomShape {
  //the constructor will take a type of shape as an argument - circle or square
  constructor(type) {
    this.type = type;
    //randomize the x and y position of the shape, these are limited to 80% of the width and height
    this.x = random(0.5);
    this.y = random(1);

    //randomize the size of the shape between 5% and 20% of the width
    this.size = random(0.05, 0.1);
    //randomize the color of the shape
    this.color = [random(255), random(255), random(0)];
    this.scale = 2;
  }

  display(scale) {
    this.scale = scale;
    //use the instance colour to fill the shape
    fill(this.color);
    noStroke();
    //Get the smaller dimension of the canvas
    let minDimension = min(width, height); 

    //Use the smaller dimension to maintain aspect ratio
    //calculate the size of the shape based on the smaller dimension - 
    //Remember the sizes were made in percentages so this will scale correctly
    let size = this.size * minDimension;

    //We now multiply the size by the scale to make the shapes change size based on the input to the display function
    size = size * this.scale;

    //The x position is the x value of the shape multiplied by the width of the canvas - same idea for the y position
    let x = this.x * width;
    let y = this.y * height;

    //draw the shape based on the type

    switch (this.type) {
      case "circle":
        ellipse(x, y, size, size);
        break;
    
    }
  }
}



//FUNCTIONS
//let's load the image from disk
function preload() {
  img = loadImage('/assets/quay.jpg'); //Load the main image
  logoImage = loadImage('assets/Image annotation.png'); //Load the logo image
  //audio file from freesound https://freesound.org/people/multitonbits/sounds/383935/?
  song = loadSound("sound assets/东东的处女座.mp3");
} 

function setup() {
  // We will make the canvas the same size as the image using its properties
  let canvasSize = calculateCanvasSize();
  createCanvas(canvasSize.canvasWidth, canvasSize.canvasHeight);
  // Let's calculate the aspect ratio of the image - this will never change so we only need to do it once
  img.resize(canvasSize.canvasWidth, canvasSize.canvasHeight);
  imgDrwPrps.aspect = img.width / img.height;
  // Now let's calculate the draw properties of the image using the function we made
  calculateImageDrawProps(canvasSize.canvasWidth, canvasSize.canvasHeight);
  // Fetched colours in photoshop of the image
  palette = [
    '#264653', '#2a9d8f',
    '#e9c46a', '#f4a261',
    '#e76f51', '#ff6f61',
    '#b0824f', '#dd9d51',
    '#58302e', '#ad342e',
    '#f73a28', '#3a669c',
    '#dc7542', '#bd5a42',
    '#d5b171', '#936c4a', 
  ];

  //Let's add a variable of speed and this technique is from https://www.geeksforgeeks.org/p5-js-framerate-function/
  frameRate(25);

  // Create a new instance of p5.FFT() object
  fft = new p5.FFT(smoothing, numBins);

  song.connect(fft);

  //Add a button for play/pause
  //We cannot play sound automatically in p5.js, so we need to add a button to start the sound
  button = createButton("Play/Pause");

  //set the position of the button to the bottom center
  button.position((width - button.width) / 2, height - button.height - 2);

  //We set the action of the button by choosing what action and then a function to run
  //In this case, we want to run the function play_pause when the button is pressed
  button.mousePressed(play_pause);

  //set the colour mode to HSB
  colorMode();

  //lets make a shape for each frequency band
  for (let i = 0; i < numBins; i++) {
    /*
    Randomly choose between 'circle' and 'square'
    This is a ternary operator - it is a shorthand if statement
    It is the same as writing:
    if(Math.random() > 0.5){
     shapeType = "circle";
    } else {
     shapeType = "square";
    }
    */
    let shapeType = Math.random() > 0.1 ? "circle" : "circle";
    shapes.push(new randomShape(shapeType));
  }


}

function draw() {
  // This technique comes from https://happycoding.io/tutorials/p5js/images/image-palette
  if (y < height) { // If y is less than canvas height
    // brush effect
    for (let x = 0; x < width; x++) { // Loop through each pixel in width
      const imgColor = img.get(floor(x * (img.width / width)), floor(y * (img.height / height))); // Get the color from the image

      if (imgColor === undefined) { // If the color is undefined
        console.log(`Undefined color at (${x}, ${y})`); // Log undefined color
        continue; // Skip to the next iteration
      }

      const paletteColor = getPaletteColor(imgColor); // Get the closest color from the palette

      if (paletteColor === undefined) { // If the palette color is undefined
        console.log(`Undefined palette color for image color: ${imgColor}`); // Log undefined palette color
        continue; // Skip to the next iteration
      }
      // Set brush size and this technique is from https://chatgpt.com/
      let brushSize = (x % 1 === 0) ? 2 : 1;
      let brush = new Brush(brushSize, paletteColor); // Create a new brush instance
      brush.draw(x, y); // Draw using the brush
    }

    y++; // Increment y
    if (y >= height) { // If y is greater than or equal to canvas height
      noLoop(); // Stop the draw loop once the palette effect is complete
    }
  }

  // Draw the logo image in the center of the canvas
  let logoAspect = logoWidth / logoHeight; // Calculate logo aspect ratio
  let scaleFactor = 0.6; // Scale factor to resize the logo image and this technique comes from https://www.geeksforgeeks.org/scale-factor/
  // Resize the logo image based on the canvas size
  if (canvasAspectRatio > logoAspect) { // If canvas aspect ratio is greater than logo aspect ratio
    logoHeight = height * scaleFactor;; // Set logo height based on canvas height
    logoWidth = logoHeight * logoAspect; // Calculate logo width based on aspect ratio
  } else { // If canvas aspect ratio is less than or equal to logo aspect ratio
    logoWidth = width * scaleFactor; // Set logo width based on canvas width
    logoHeight = logoWidth / logoAspect; // Calculate logo height based on aspect ratio
  }
  // Draw the image in the centre of the canvas, offsetting the image by half its width and height
  image(logoImage, (width / 2) - (logoWidth / 2), (height / 2) - (logoHeight / 2), logoWidth, logoHeight);

  //The analyze() method returns an array of amplitude values across the frequency spectrum
  //Amplitude values range between 0 and 255, where at 0, the sound at the specific frequency band is silent
  //and at 255, the sound at the specific frequency band is at its loudest
  let spectrum = fft.analyze();

  for (let i = 0; i < numBins; i++) {
    //We divide the spectrum values by 255 so they are in the range 0 - 1
     shapes[i].display(spectrum[i]/255);
  }
}


function play_pause() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    //we can use song.play() here if we want the song to play once
    //In this case, we want the song to loop, so we call song.loop()
    song.loop();
  }
}

// Our function to get the closest color from the palette and this technique comes from https://happycoding.io/tutorials/p5js/images/image-palette
function getPaletteColor(imgColor) {
  // Image processing and pixel manipulation
  // These functions take a color value and return 
  // The intensity of the respective color component as a number between 0 and 255.
  const imgR = red(imgColor);
  const imgG = green(imgColor);
  const imgB = blue(imgColor);

  // When drawing, it will finding the minimum distance on each pixles between the graphical paint been drew.
  // Display Minimum Distance: The minimum distance is displayed on the canvas as infinity.
  let minDistance = Infinity;
  // Variable explaination of the target color
  let targetColor;
  // Loop through the color
  for (const c of palette) {
    const paletteR = red(c);
    const paletteG = green(c);
    const paletteB = blue(c);
    // Exact rgb components
    const colorDistance =
      // Calculate distance between the image color and the palette color
      dist(imgR, imgG, imgB,
           paletteR, paletteG, paletteB);
    // Check and refresh the closest color
    // If the colordistance less than minimumdistance, refresh the target color to the current palette.
    // And refresh the minimumdistance to colordistance.
     if (colorDistance < minDistance) {
      targetColor = c;
      minDistance = colorDistance;
    }
  }

  return targetColor;// Return the closest color
}

function windowResized() {
  //when drag the window to different size, it will automatically calculate the changes and let the image resize and the window change.
  let canvasSize = calculateCanvasSize();
  resizeCanvas(canvasSize.canvasWidth, canvasSize.canvasHeight);
  calculateImageDrawProps(canvasSize.canvasWidth, canvasSize.canvasHeight);
  y = 0; //Restart palette effect
  loop(); // restart the draw loop

  //Reset the position of the button
  button.position((width - button.width) / 2, height - button.height - 2);
}


function calculateCanvasSize() {
   //initiallize canvas dimensions
  let canvasWidth = windowWidth;
  let canvasHeight = windowWidth / aspectRatio; // The desired ratio of the canvas
  if (canvasHeight > windowHeight) { // If the initial"canvasheight is geater than the windowheight
    canvasHeight = windowHeight; // The canvas need to be resized to fit the window
    canvasWidth = windowHeight * aspectRatio; // Calculate canvas width based on aspect ratio
  }

  return { canvasWidth, canvasHeight }; // Return calculated canvas size
}

function calculateImageDrawProps(canvasWidth, canvasHeight) {
  //Calculate the aspect ratio of the canvas
  canvasAspectRatio = canvasWidth / canvasHeight;
  //if the image is wider than the canvas
  if (imgDrwPrps.aspect > canvasAspectRatio) {
    //then we will draw the image to the width of the canvas
    imgDrwPrps.width = canvasWidth;
    //and calculate the height based on the aspect ratio
    imgDrwPrps.height = canvasWidth / imgDrwPrps.aspect;
    imgDrwPrps.yOffset = (canvasHeight - imgDrwPrps.height) / 2;
    imgDrwPrps.xOffset = 0;
  } else if (imgDrwPrps.aspect < canvasAspectRatio) {
    //otherwise we will draw the image to the height of the canvas
    imgDrwPrps.height = canvasHeight;
    //and calculate the width based on the aspect ratio
    imgDrwPrps.width = canvasHeight * imgDrwPrps.aspect;
    imgDrwPrps.xOffset = (canvasWidth - imgDrwPrps.width) / 2;
    imgDrwPrps.yOffset = 0;
  } else {
    imgDrwPrps.width = canvasWidth;
    imgDrwPrps.height = canvasHeight;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = 0;
  }
}