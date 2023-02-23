function rectangularCollision({ rectangule1, rectangule2 }) {
  return (
    (rectangule1.attackBox.position.x + rectangule1.attackBox.width >=
      rectangule2.position.x) &
    (rectangule1.attackBox.position.x <=
      rectangule2.position.x + rectangule2.width) &
    (rectangule1.attackBox.position.y + rectangule1.attackBox.height >=
      rectangule2.position.y) &
    (rectangule1.attackBox.position.y <=
      rectangule2.position.y + rectangule2.height)
  );
}

let timer = 60;
let timerId;
let control = 0;
var btn = document.querySelector("#btn");

function determineWinner({ player, enemy, timerId }) {
  control = 1;
  clearTimeout(timerId);
  document.querySelector("#displayResult").style.display = "flex";
  document.querySelector("#btn").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#displayResult").innerHTML = "TIE";
  } else if (player.health > enemy.health) {
    document.querySelector("#displayResult").innerHTML = "PLAYER 1 WINS!";
  } else if (player.health < enemy.health) {
    document.querySelector("#displayResult").innerHTML = "PLAYER 2 WINS!";
  }
}

function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }

  if (timer === 0) {
    determineWinner({ player, enemy });
  }
}

btn.addEventListener("click", function () {
  timer = 60;
  timerId = setTimeout(decreaseTimer, 1000);
  document.querySelector("#timer").innerHTML = timer;
  document.querySelector("#player-health").style.width = "100%";
  document.querySelector("#enemy-health").style.width = "100%";
  document.querySelector("#player-health").innerHTML.width = "100%";
  document.querySelector("#enemy-health").innerHTML.width = "100%";
  document.querySelector("#displayResult").style.display = "none";
  player.revive();
  enemy.revive();
  enemy.position.x = 800;
  enemy.scale = 3.1;
  control = 0;
});
