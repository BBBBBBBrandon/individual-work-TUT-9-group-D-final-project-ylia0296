Instructions on how to interact with the work; e.g. move the mouse slowly over the screen, click the play button and wait for the music to start, load the page and the animation will happen over x number of seconds or whatever is needed to make your code come alive.
Details of your individual approach to animating the group code.
  Which did you choose to drive your individual code: audio, interaction, Perlin noise or time.

  Which properties of the image will be animated and how; highlighting how it is unique from other group members (i.e. one changes colours, the other component sizes, another reveals only some components at a time, etc.). You will need to work with your group members to make sure your work is sufficiently different from each other.

 References to inspiration for animating your individual code; these can be images (still or gifs). How did they influence your submission?

 A short technical explanation of how your individual code works to animate the image and any appropriate references.
 
  If you made a lot of changes to the group code, explain it here.
  If you use tools and technique from outside the course, explain why you used them and how they work.
  If you copy a technique from the Internet, explain how it works, why you used it, and where it came from.




  Function prototype (xcai0182_userinput)
Interaction Instructions



##Animation Methods:

Oil painting brush effect: Generates an oil painting effect based on the image's colour. This effect comes from the group
Jump effect: Jumps to the original image when the oil painting image ends

###Differences with team members:
The group members chose Perlin noise and randomness and Audio, which differs from my animation effect.
Perlin noise and randomness change the wave effect and add fish and bird textures. Audio controls the picture with sound.


##Inspiration for animating:



##Major changes - Technical explanation ###Group coding change:

During the iteration, I found a bug. After loading the oil painting image, mousePressed() could not be used. Therefore, I chose to let the oil painting automatically jump to the original image. So I removed noLoop() so that the draw() function can continue to execute when mousePressed() is called. I also added clear() so it can automatically jump to the original image after loading the oil painting image.


###External techniques:

this technique is from programming course. Added clear() so it can automatically jump to the original image after loading the oil painting image. clear(); // Clear the canvas image(img, 0, 0, img.width, img.height); //Draw quay.jpg at original size
###Internet references:

The code of night refers to the image filter example in https://editor.p5js.org/ZL/sketches/9Bm0K5HBh. By combining the applyFilter variable and the mousePressed function, clicking the mouse will display the original image and superimpose the dark blue filter, presenting a sense of visual transition from fantasy to reality, from sunset to night.
The star referred to the Star example of https://editor.p5js.org/p5/sketches/Form:_Star. The painting state is saved and restored through push() and pop(), and the stars are rotated using translate() and rotate().