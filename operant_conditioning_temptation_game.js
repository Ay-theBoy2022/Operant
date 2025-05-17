let score = 0;
let temptationLevel = 0;
const instructionText = document.getElementById("instruction");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const temptationBtn = document.getElementById("temptationBtn");

const correctSound = new Audio("./positive_beeps-85504.mp3");
const wrongSound = new Audio("./negative-101682.mp3");

function correctAction() {
  score++;
  scoreDisplay.textContent = `Score: ${score}`;
  feedback.textContent = "✅ Good job! You followed the instruction.";
  correctSound.play();
  temptationLevel++;
  updateTemptation();
  updateInstruction();
  triggerHaptic();
}

function wrongAction() {
  score = Math.max(0, score - 2);
  scoreDisplay.textContent = `Score: ${score}`;
  feedback.textContent = "❌ Oops! You fell for the temptation.";
  wrongSound.play();
  document.body.classList.add("shake");
  setTimeout(() => document.body.classList.remove("shake"), 500);
  triggerHaptic();
}

function updateTemptation() {
  if (temptationLevel > 3) {
    temptationBtn.textContent = "💰 Click me for 1000 points!";
    temptationBtn.style.backgroundColor = "red";
    temptationBtn.style.visibility = "visible";
    temptationBtn.classList.add("blink", "move", "wiggle");
  } else {
    temptationBtn.style.visibility = "hidden";
    temptationBtn.classList.remove("blink", "move", "wiggle");
  }
}

function updateInstruction() {
  if (score >= 10 && score < 20) {
    instructionText.textContent = "Click only the GREEN button, avoid red!";
  } else if (score >= 20) {
    instructionText.textContent = "Stay focused: Green is still the right choice.";
  } else {
    instructionText.textContent = "Click the GREEN button only.";
  }
}

function triggerHaptic() {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
}

console.log("Operant Conditioning Temptation Game with dynamic instruction and animation loaded");
