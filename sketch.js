let img
let song
let fft
let waves
let rOff;
let gOff;
let bOff;
let brightness = 600

function preload(){
  img = loadImage("picture.jpeg")
  song = loadSound("abstract-future-bass-162604.mp3")
}

function setup() {
  createCanvas(1024, 1024);
  noStroke()
  rOff=20
  gOff=4
  bOff=78
  fft = new p5.FFT()
  fft.setInput(song)
}

function draw() {
  //Setting up Sound
  waves = fft.analyze()
  let bass = fft.getEnergy("bass");
  let lowMid = fft.getEnergy("lowMid");
  let mid = fft.getEnergy("mid");
  let highMid = fft.getEnergy("highMid");
  let treble = fft.getEnergy("treble");
  
  //Perlin Noise
  let r = noise(rOff)
  rOff+=bass/6100
  let g = noise(gOff)
  gOff+=bass/5000
  let b = noise(bOff)
  bOff+=bass/4000
  
  //Image
  image(img,0,0)
  loadPixels()
  for(let i = 0; i<pixels.length;i+=4){
    // pixels[i] = bass
    if(pixels[i+2]>255*b+50 && pixels[i]>255*r+50 && pixels[i+1]>255*g+50){
    pixels[i+2] = pixels[i+2]*(bass/255)
    pixels[i+1] = pixels[i+1]*(bass/255)
    pixels[i]= pixels[i]*(bass/255)
    }
    else{
      pixels[i]=255-pixels[i]
      pixels[i+1]=255-pixels[i+1]
      pixels[i+2]=255-pixels[i+2]
    }
  }
   updatePixels()
}

//Resizing Window Code
function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
  if(song.isPlaying()){
    song.pause();
} else{
    song.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
