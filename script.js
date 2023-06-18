
const movingDiv = document.getElementById('moving-div');
const parentDiv = document.getElementById("wrapper");
const clapAudio = document.createElement("audio");
clapAudio.src = "./sounds/clap.mp3";
const screamAudio = document.createElement("audio");
screamAudio.src = "./sounds/cartoon.mp3";
const flySound = document.createElement("audio");
flySound.src = "./sounds/fly-vocal.mp3";
const laughter = document.createElement("audio");
laughter.src = "./sounds/laughter.mp3";
const gunShot = document.createElement("audio");
gunShot.src = "./sounds/gunshot.mp3";
const flyImg = document.getElementById("fly-img")


let intervalId;

function moveDivRandomly() {
  flySound.play();
  const parentWidth = parentDiv.offsetWidth;
  const parentHeight = parentDiv.offsetHeight;
  const maxX = parentWidth - movingDiv.offsetWidth;
  const maxY = parentHeight - movingDiv.offsetHeight;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  movingDiv.style.transform = `translate(${randomX}px, ${randomY}px)`
}
moveDivRandomly();


function hitFly () {
  movingDiv.style.display = "none";
  laughterSound();
}



function laughterSound () {
    setTimeout(function () {
      flySound.pause()
      flySound.currentTime = 0;
      laughter.play();
      laughter.currentTime = 0;
      laughter.play();
    }, 5000)
}



function updateKilledFlyPosition (event) {
  const clickedX = event.clientX - parentDiv.offsetLeft;
  const clickedY = event.clientY - parentDiv.offsetTop;
  const killedFlyElement = document.createElement("img");
  killedFlyElement.src = "./img/paint-img.png";
  killedFlyElement.className = "killed-fly";
  killedFlyElement.style.width = movingDiv.offsetWidth + "px";
  killedFlyElement.style.height = movingDiv.offsetHeight + "px";
  killedFlyElement.style.top = clickedY + "px";
  killedFlyElement.style.left = clickedX + "px";
  movingDiv.style.zIndex = 999
  parentDiv.appendChild(killedFlyElement);
}


movingDiv.addEventListener("click", function(event) {
  clearInterval(intervalId)
  clapAudio.play();
  clapAudio.currentTime = 0;
  screamAudio.play()
  flySound.pause();
  flySound.currentTime = 0;
  updateKilledFlyPosition(event)
  hitFly();
  setTimeout(function () {
    movingDiv.style.display = "block";
    moveDivRandomly();
    if (flyImg) {
      flyImg.src = "./img/fly3-img.gif";
    }
    intervalId = setInterval(moveDivRandomly, 500);
  }, 2000)
})

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    clapAudio.pause();
    clapAudio.currentTime = 0;
    movingDiv.click()
    movingDiv.style.display = "flex"
    flyImg.src = "./img/explosion.png";
    gunShot.play();
  }
})