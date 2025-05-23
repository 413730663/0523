let video;
let facemesh;
let predictions = [];
const redIndices = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];
const greenIndices = [243,190,56,28,27,29,30,247,130,25,110,24,23,22,26,112];
const blueIndices = [359,467,260,259,257,258,286,414,463,341,256,252,253,254,339,255];

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

    // 畫紅色線
    stroke(255, 0, 0);
    strokeWeight(15);
    noFill();
    beginShape();
    for (let i = 0; i < redIndices.length; i++) {
      const idx = redIndices[i];
      if (keypoints[idx]) {
        const [x, y] = keypoints[idx];
        vertex(x, y);
      }
    }
    endShape();

    // 畫綠色線
    stroke(0, 255, 0);
    strokeWeight(10);
    noFill();
    beginShape();
    for (let i = 0; i < greenIndices.length; i++) {
      const idx = greenIndices[i];
      if (keypoints[idx]) {
        const [x, y] = keypoints[idx];
        vertex(x, y);
      }
    }
    endShape();

    // 畫藍色線
    stroke(0, 0, 255);
    strokeWeight(10);
    noFill();
    beginShape();
    for (let i = 0; i < blueIndices.length; i++) {
      const idx = blueIndices[i];
      if (keypoints[idx]) {
        const [x, y] = keypoints[idx];
        vertex(x, y);
      }
    }
    endShape();
  }
  pop();
}
