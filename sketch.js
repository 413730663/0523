let video;
let facemesh;
let predictions = [];
const indices = [243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112];

function setup() {
  let cnv = createCanvas(640, 480);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  console.log('Facemesh model loaded!');
}

function draw() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;
    stroke(0, 255, 0);
    strokeWeight(10);
    noFill();
    beginShape();
    for (let i = 0; i < indices.length; i++) {
      const idx = indices[i];
      if (keypoints[idx]) {
        const [x, y] = keypoints[idx];
        vertex(x, y);
      }
    }
    endShape();
  }
  pop();
}
