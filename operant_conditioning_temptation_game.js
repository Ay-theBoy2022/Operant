let score = 0;
let trust = 100;
let level = 1;
let levelGoal = 20;
let temptationLevel = 0;
const instructionText = document.getElementById("instruction");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const temptationBtn = document.getElementById("temptationBtn");
const greenBtn = document.getElementById("greenBtn");

const correctSound = new Audio("./positive_beeps-85504.mp3");
const wrongSound = new Audio("./negative-101682.mp3");

// Create trust bar element
const trustBar = document.createElement("div");
trustBar.id = "trustBar";
trustBar.style.marginTop = "15px";
trustBar.style.height = "20px";
trustBar.style.width = "100%";
trustBar.style.background = "#ddd";
trustBar.style.borderRadius = "10px";
trustBar.innerHTML = `<div id="trustFill" style="height: 100%; width: 100%; background: #4caf50; border-radius: 10px;"></div>`;
document.querySelector(".game-container").appendChild(trustBar);

function correctAction() {
  score += 2;
  trust = Math.min(100, trust + 5);
  updateDisplay("✅ You made a trustworthy decision!", correctSound);
}

function wrongAction() {
  score += 4;
  trust = Math.max(0, trust - 20);
  updateDisplay("⚠️ You gained points but lost trust!", wrongSound);
}

function updateDisplay(message, sound) {
  if (trust <= 0) {
    endGame();
    return;
  }

  scoreDisplay.textContent = `Level ${level} | Score: ${score} / ${levelGoal} | Trust: ${trust}%`;
  feedback.textContent = message;
  sound.play();
  updateTemptation();
  updateInstruction();
  updateTrustBar();
  triggerHaptic();
  checkLevelGoal();
}

function updateTemptation() {
  if (temptationLevel > 2) {
    const offers = ["🔥 Risky Offer!", "💰 Easy Points!", "🚨 Big Bonus!"];
    temptationBtn.textContent = offers[Math.floor(Math.random() * offers.length)];
    temptationBtn.style.visibility = "visible";
    temptationBtn.classList.add("blink", "move");
    temptationBtn.style.left = `${Math.random() * 80 + 10}%`;
    temptationBtn.style.position = "relative";
  } else {
    temptationBtn.style.visibility = "hidden";
    temptationBtn.classList.remove("blink", "move");
  }
  temptationLevel++;
}

function updateInstruction() {
  if (score >= levelGoal * 0.5 && trust < 70) {
    instructionText.textContent = "⚠️ Careful! Your trust is dropping.";
  } else if (trust >= 90) {
    instructionText.textContent = "🌟 Excellent trust! Keep it up.";
  } else {
    instructionText.textContent = "Choose wisely between trust and score.";
  }
}

function updateTrustBar() {
  const fill = document.getElementById("trustFill");
  fill.style.width = `${trust}%`;
  fill.style.background = trust > 60 ? "#4caf50" : trust > 30 ? "#ffc107" : "#f44336";
}

function checkLevelGoal() {
  if (score >= levelGoal && trust >= 50) {
    feedback.textContent = `🎉 Level ${level} Complete! Trust and performance balanced.`;
    level++;
    score = 0;
    trust = 100;
    levelGoal += 10;
    temptationLevel = 0;
    setTimeout(() => {
      feedback.textContent = "New level begins!";
      updateDisplay("", correctSound);
    }, 2000);
  } else if (score >= levelGoal && trust < 50) {
    feedback.textContent = "⚠️ Score reached, but trust too low. Try again!";
  }
}

function endGame() {
  feedback.textContent = "💀 Game Over: You lost all trust.";
  temptationBtn.disabled = true;
  greenBtn.disabled = true;
  temptationBtn.style.visibility = "hidden";
  instructionText.textContent = "";
  scoreDisplay.textContent = `Final Score: ${score}`;
}

function triggerHaptic() {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
}

console.log("Temptation Game with Trust-Score mechanic and Game Over condition loaded");