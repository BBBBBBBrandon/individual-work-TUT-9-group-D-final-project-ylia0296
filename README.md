


# Function prototype (ylia0296_Interactive Audio)
## Interactive Instructions
My chosen prototype was focus on the audio interaction. When you enter the live server, you could just simply click anywhere on the screena and the song will play. This song was sang by myself which is a famous Chinese song.The sunshine effect will start to animate. You may especially focus on the red sun. It will viberate with the rythm of the music, and please enjoy the reset sunshine not "sun set".

## Details of animation method
- Oil painting brush effect: Generates an oil painting effect based on the image's colour. This effect comes from the group
- The chosen one that drove on my individual code is audio. This image was drew to a oilic painting effect and with the theme of sunset. I would like to make it opposite to the sunset which is sunshine. So, I added particle elements to represent the sunshine and the sun components. 
- The reason why I do this is because oilic painting was present by loads of particles or points. Thus, I'd like to refer to it. Meanwhile,the sun was made to waveform which it can vibrate with the rythm of the song in real-time. 
- Mine was completely different from the other group members.As the others are perlin noise and user control
- I also change the stroke size of the brush to make the paint looked more
- Waveform (vibration) effect
- Particles animation




## Inspiration for animating:
- The waveform and particles are all inspired during browsing the programming video course[link inspiration](https://www.youtube.com/watch?v=uk96O7N1Yo0). 
- Inspiration also camed from the Live Van Gogh exhibition. [link](https://vangoghexpo.com/). I have experienced myself and it was emersive and fasinating. Although, I have to put more effort to achieve that outcome, it truly gave me hints of moving elements.


## Technical explanation 

During the iteration, I did not chang toomuch of our group code. The frame rate was changed to 100 which was faster then previous. It needs to match with the song I made. Meanwhile, I changed the brush stroke to make the paint more neat. The main adjustments are new added `class particle` and `waveform()` with `beginShape` and `endShape`. 
- sunshine particles
   - Create class, then set up initial position, velocity, acceleration, and width of particles. In addtion, update velocity based on acceleration and update position based on velocity. Finally. showcase the objects.
- waveform 
   - function draw() the wave form. Loop runs twice, with "t" taking the values -1 and 1. It ensures that the waveform is drawn symmetrically on both sides of the origin to a circle. `for (let i = 0; i<= 180; i++)` : This loop iterates from 0 to 180, representing degrees in a half circle. The index i is used to calculate the positions of points in the shape.


### External techniques:
- This "waveform" technique was outside the tutorial class from https://www.youtube.com/watch?v=uk96O7N1Yo0 and chatgpt. `let wave = fft.waveform()` it returns an array of amplitude values (ranging from -1 to 1) representing the audio waveform. This array will be used to draw the visualization.
- In the "class particle", update was new and from [link](https://www.youtube.com/watch?v=uk96O7N1Yo0). ```update() {
    this.vel.add(this.acc)}```: updated velocity based on acceleration.


